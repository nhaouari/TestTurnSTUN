
async function test(ICEs) {    
    let workingICEs = 0

    for (let server of ICEs) {
      console.log(server)
          await this.checkServer(server).then((result) => {
              if (result) {
                  console.log(`OK: ${server.url} is WORKING.`);            
                  workingICEs++
              } else {
                 console.log(`!OK: ${server.url} is not WORKING.`);  
              }
          })
    }
    console.log(` ${workingICEs} of ${ICEs.length} server works `)

}


async function checkServer  (server, timeout=5000){

  return new Promise(function(resolve, reject) {

      setTimeout(function() {
          if (promiseResolved) return;
          resolve(false);
          promiseResolved = true;
      }, timeout);

      var promiseResolved = false,
          myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection //compatibility for firefox and chrome
          ,
          pc = new myPeerConnection({
              iceServers: [server]
          }),
          noop = function() {};
      pc.createDataChannel(""); //create a bogus data channel
      pc.createOffer(function(sdp) {
          if (sdp.sdp.indexOf('typ relay') > -1) { // sometimes sdp contains the ice candidates...
              promiseResolved = true;
              resolve(true);
          }
          pc.setLocalDescription(sdp, noop, noop);
      }, noop); // create offer and set local description
      pc.onicecandidate = function(ice) { //listen for candidate events
          if (promiseResolved || !ice || !ice.candidate || !ice.candidate.candidate || !(ice.candidate.candidate.indexOf('typ relay') > -1)) return;
          promiseResolved = true;
          resolve(true);
      };
  });
}

async function getICS (url) {
    const response = await fetch(url)
    if (response.status !== 200) {
        console.log('Error Code: ' +
          response.status);
          return   []
      } else {
        const jsonICEs=await response.json()
        window.jsonICEs=  jsonICEs
        const ICEs = jsonICEs.ice
        return ICEs
}
}
