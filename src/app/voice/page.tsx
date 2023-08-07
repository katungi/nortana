'use client'
import 'regenerator-runtime';
import SpinCortana from "@/components/voice/spin-state";
import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { sendNotification } from '@tauri-apps/api/notification';
import useSpeechRecognitionHook from '@/lib/hooks/use-speech-recognition'

export default async function VoiceCommand() {
  const [mode, setMode] = useState('Idle');
  const [renderText, setRenderText] = useState('...')
  const [currentMic, setCurrentMicrophone] = useState('')
  // const { text, startListening, stopListening, isListening } = useSpeechRecognitionHook()

  const { transcript, listening, isMicrophoneAvailable } = useSpeechRecognition()

  async function getMicrophones() {
    let perms = await navigator.mediaDevices.getUserMedia({ audio: true })
    let devices = await navigator.mediaDevices.enumerateDevices()
    sendNotification({
      title: 'Microphone',
      body: `Microphone is availabl ${devices[0].label}`
    })
  }
  useEffect(() => {
    if (window !== undefined) {
      // getMicrophones()
      startListening()
      // startListening()
    }
  }, [])

  // useEffect(() => {
  //   if (text !== '') {
  //     setRenderText(text)
  //     console.log("Transcript::", text)
  //     sendNotification(text)
  //   }
  // }, [text])

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
      <div className=''>
        <p className={"text-md text-white"}>
          {transcript}
        </p>
        {listening && <button onClick={stopListening}>Stop</button>}
      </div>
    </div>
  )
}
