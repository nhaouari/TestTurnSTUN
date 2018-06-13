# TestTurnSTUN
this test for TURN and STUN  works on browsers, it is inspered from https://github.com/otalk/stunturncheck. 
You have just to copy the functions on your code or console and follow the following options.

#  checkServer
the main function is checkServer(server) to check a given server if it works

server is object for example
```
const server={
"url": "turn:global.turn.twilio.com:3478?transport=udp",
"username": "ec826faa494f0fe3ced9e342c6f2d91d5014b5bb55f2b85fc9ad4817eb5228be",
"credential": "75nGVO6Nsc3KfSza1qcEYWheaFjxdD381YlTiR+nc/4="
}

checkServer(server)
```

# checkServers 
for example here we check the servers that comes from twilio
```

// This example works just on browsers 
const ICEsURL = "https://carteserver.herokuapp.com/ice"
let ICEs = await getICS(ICEsURL)
test(ICEs)
```
