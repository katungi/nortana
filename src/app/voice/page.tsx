'use client'
import 'regenerator-runtime';
import { useSpeechSynthesis } from 'react-speech-kit';
import SpinCortana from "@/components/voice/spin-state";
import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function VoiceCommand() {
  const [mode, setMode] = useState(null);
  const { speak, voices } = useSpeechSynthesis();

  const { transcript, listening, resetTranscript } = useSpeechRecognition()

  function startListening() {
    SpeechRecognition.startListening({ continuous: false })
  }

  function stopListening() {
    SpeechRecognition.stopListening()
  }
  return (
    <div className='w-full'>
      <div className='flex flex-col'>
        <SpinCortana listeningMode="Idle" />
        <div className='mt-64 ml-40 text-gray-100 font-bold'>
          <p>Say "Hey Cortana" to get started</p>
        </div>
      </div>
      <div>
        {listening && <div>{transcript}</div>}
      </div>
    </div>
  )
}