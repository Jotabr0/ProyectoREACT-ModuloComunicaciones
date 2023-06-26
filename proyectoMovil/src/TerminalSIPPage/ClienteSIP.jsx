import React, {useEffect, useState} from 'react';
// import JsSIP from 'jssip';


const ClienteSIP = ({sip , session , setSession , ua})=> {
    // const socketIO = require('socket.io');
    console.log("sip --->", sip)

 var options = {
    'mediaConstraints' : { 'audio': true, 'video': false }
 };     

 const handleCall = (sip)=> {
 
    const session = ua.call(`sip:${sip}@10.1.1.25`, options);
    // console.log("session --->", session)
    // const audios = [];
    
     
      if (session.connection) {
        console.log('Connection is valid');
        
        session.connection.addEventListener('addstream', e => {
          console.log('Add stream');
          const audio = new window.Audio();
          audio.srcObject = e.stream;
          audio.volume = 1;
          audio.play();
        //   audios.push(audio);
        });
        setSession(session);

      } else {
        console.log('Connection is null');
      }

    };

    const handleStop = () => {
      session.terminate();
          setSession(null);
        };

    // console.log("UA en cliente -->", ua)
    // console.log("sip en cliente -->", sip)

      return (
        <div>
            {session ? (
              <div>
                <p>Llamando...</p>
                <button onClick={handleStop}>Colgar</button>
              </div>
            ) : (
              <button onClick={() => handleCall(sip)}>Llamar</button>
            )}
        </div>
      );

}
export default ClienteSIP;
