import { toast } from 'react-toastify';
import { Howl } from 'howler';
import messageSound from '../assets/sound/sound2.mp3'


export const playNotificationSound = () => {
    const sound = new Howl({
        src: [messageSound], 
      });      

    navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      window.localStream = stream;
      window.localAudio.srcObject = stream;
      window.localAudio.autoplay = true;
      sound.play();
    })
    .catch((err) => {
      console.error(`you got an error: ${err}`);
    });
    
  };
  