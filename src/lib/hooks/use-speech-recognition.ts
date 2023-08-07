'use strict';
import { useEffect, useState } from 'react';

let recognition: SpeechRecognition;

const useSpeechRecognitionHook = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);

  async function speechRecognitionInit() {
    console.log('Speech Recognition Init');
    if ('webkitSpeechRecognition' in window) {
      recognition = new webkitSpeechRecognition();
    }
    return recognition;
  }

  useEffect(() => {
    (async () => {
      let recog = await speechRecognitionInit();
      recognition = recog;
      if (!!recognition) {
        recognition.onstart = () => {
          console.log('Recognition started');
        };
        recognition.onresult = (event: SpeechRecognitionEvent) => {
          console.log('Event::', event);
          setText(event.results[0][0].transcript);
          // recognition.stop();
          // setIsListening(false);
        };
      }
    })().catch((err) => {
      console.log('Error::', err);
    });
  }, []);

  const startListening = () => {
    try {
      setText('');
      setIsListening(true);
      recognition.start();
      recognition.continuous = true;
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.onend = () => {
        recognition.start();
      };

      console.log('Start Listening 👂', recognition);
    } catch (error) {
      console.log('Error::', error);
    }
  };

  const stopListening = () => {
    console.log('Stop Listening ⏱ ');
    setIsListening(false);
    recognition.stop();
  };

  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognition: !!recognition,
  };
};

export default useSpeechRecognitionHook;
