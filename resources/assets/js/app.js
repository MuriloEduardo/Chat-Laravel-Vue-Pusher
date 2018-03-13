
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue';
import VueChatScroll from 'vue-chat-scroll';

Vue.use(VueChatScroll);

import Toaster from 'v-toaster';
import 'v-toaster/dist/v-toaster.css';
Vue.use(Toaster, { timeout: 5000 });

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('message', require('./components/message.vue'));

const app = new Vue({
    el: '#app',
    data: {
        message: '',
        chat: {
            message: [],
            user: [],
            align: [],
            time: []
        },
        typing: '',
        numberOfUsers: 0
    },
    watch: {
        message() {

            Echo.private('chat')
                .whisper('typing', {
                    name: this.message
                });
        }
    },
    methods: {

        send() {

            if (this.message.length != 0) {

                this.chat.message.push(this.message);
                this.chat.align.push('right');
                this.chat.time.push(this.getTime());
                this.chat.user.push('Eu');

                let sendMessage = this.message;

                this.message = '';

                axios.post('/send', { message: sendMessage })
                    .catch(error => console.log(error));
            }
        },
        getTime() {

            let time = new Date();
            return time.getHours() + ':' + time.getMinutes();
        },
        getOldMessages() {

            axios.get('/old')
                .then(response => {

                    if (response.data.length != 0) {
                        this.chat = response.data;
                    }
                })
                .catch(error => console.log(error));
        }
    },
    mounted() {

        this.getOldMessages();
        
        Echo.private('chat')
            .listen('ChatEvent', (e) => {

                this.chat.message.push(e.message);
                this.chat.align.push('left');
                this.chat.time.push(this.getTime());
                this.chat.user.push(e.user);

                axios.post('/save', { chat: this.chat })
                    .catch(error => console.log(error));
            })
            .listenForWhisper('typing', (e) => {
                if (e.name.length != 0) {
                    this.typing = 'Escrevendo...';
                } else {
                    this.typing = '';
                }
            });
        
        Echo.join('chat')
            .here(users => {

                this.numberOfUsers = users.length;
            })
            .joining(user => {

                this.numberOfUsers += 1;
                this.$toaster.success(user.name + ' entrou!');
            })
            .leaving(user => {

                this.numberOfUsers -= 1;
                this.$toaster.error(user.name + ' saiu!');
            });
    }
});
