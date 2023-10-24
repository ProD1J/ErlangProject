#! /usr/bin/env escript

main(_Args) ->
   application:start(chumak),
   {ok, Socket} = chumak:socket(req, "my-req"),
   {ok, _Pid} = chumak:connect(Socket, tcp, "localhost", 5555),
   loop(Socket).


loop(Socket) ->
   {ok, RecvMessage} = chumak:recv(Socket),
   io:format("Received request : ~p\n", [RecvMessage]),
   timer:sleep(1000),
   chumak:send(Socket, "Message recived"),
   loop(Socket).
