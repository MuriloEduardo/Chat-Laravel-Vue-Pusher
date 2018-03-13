<template>
    <p :class="className">
        <span class="text-primary font-weight-bold">{{ user }}</span>
        <slot></slot>
        <br>
        <small>{{ time }}</small>
    </p>
</template>

<script>
    export default {
        props: [
            'align',
            'user',
            'time'
        ],
        computed: {
            className() {
                return 'text-' + this.align
            }
        },
        mounted() {
            //
        }
    }
</script>
