@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="offset-md-4 col-md-4 offset-sm-1 col-sm-10">
            <div class="row align-items-center">
                <div class="col-3">
                    <h1>Chat</h1>
                </div>
                <div class="col-9">
                    <span class="badge badge-pill badge-primary">@{{ numberOfUsers }}</span>
                </div>
            </div>
            <article id="chat-scroll" v-chat-scroll>
                <message
                v-for="value, index in chat.message"
                :key="value.index"
                :align= chat.align[index]
                :user= chat.user[index]
                :time= chat.time[index]
                >
                    @{{ value }}
                </message>
            </article>
            <div class="badge badge-primary mb-2">@{{ typing }}</div>
            <input type="text" class="form-control" placeholder="Escreva sua mensagem aqui..." v-model="message" @keyup.enter="send" required autofocus>
        </div>
    </div>
</div>
@endsection
