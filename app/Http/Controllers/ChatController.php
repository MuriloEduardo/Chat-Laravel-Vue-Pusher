<?php

namespace App\Http\Controllers;

use App\Events\ChatEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function chat()
    {
        return view('chat');
    }

    public function send(request $request)
    {
        $this->save($request);
        event(new ChatEvent($request->message, Auth::user()));
    }

    public function save(request $request)
    {
        session()->put('chat', $request->chat);
    }

    public function old()
    {
        return session('chat');
    }
}
