'use client'
import 'regenerator-runtime';
import SpinCortana from "@/components/voice/spin-state";
import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default async function VoiceCommand() {
  const [mode, setMode] = useState('Idle');
  const [renderText, setRenderText] = useState('...')

  const {
    transcript,
    listening,
    isMicrophoneAvailable
  } = useSpeechRecognition()

  useEffect(() => {
    if (isMicrophoneAvailable) {
      console.log("Microphone is available")
    }
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      console.log("Browser does not support speech recognition")
    } else {
      startListening()
      console.log("Browser supports speech recognition")
    }
  }, [])

  useEffect(() => {
    setRenderText(transcript)
    console.log("Transcript::", transcript)
  }, [transcript])

  function startListening() {
    SpeechRecognition.startListening({ continuous: true, language: 'en-US' })
    console.log("Listening for speech", transcript)
    setMode('thinking')
  }

  function stopListening() {
    SpeechRecognition.stopListening()
    setMode('idle')
  }
  return (
    <div className='w-full'>
      <div className='flex flex-col'>
        <SpinCortana listeningMode={mode} />
        <div className='mt-64 ml-40 text-gray-100 font-bold'>
          <p>Say "Hey Cortana" to get started</p>
        </div>
      </div>
      <div>
        <div className={"px-5 pt-8 text-md max-w-24 text-white"}>
          {transcript}
        </div>
        {listening && <button onClick={stopListening}>Stop</button>}
      </div>
    </div>
  )
}
