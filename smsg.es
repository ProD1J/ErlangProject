#! /usr/bin/env escript

-export([send_msg/0]).

main(_Args) ->
   application:start(chumak),
   {ok, Socket} = chumak:socket(rep, "my-rep"),
   {ok, _Pid} = chumak:bind(Socket, tcp, "localhost", 5555),
   loop(Socket).

loop(Socket) ->
   {ok, RecvMessage} = chumak:recv(Socket),
   io:format("Recv Reply: ~p\n", [RecvMessage]),
   loop(Socket).

send_msg() ->
   chumak:send(Socket, "Hello").
