'use client';
import 'regenerator-runtime/runtime'
import { useSpeechRecognition } from "react-speech-recognition"
import Button from '@/components/buttons/Button'
import { useState } from 'react';

export default function Home() {
  const [ifStarted, setIfStarted] = useState<boolean>(false)

  async function startConversation() {
    if (!ifStarted) {
      setIfStarted(true)
    }
  }

  async function sendConversationToGPT() {}

  return (
    <div className='w-full'>
      <div className='w-3/4 max-w-screen-md pt-4 m-auto'>
        <div className='pt-12 font-extrabold text-8xl pb-8'>
          <h2>Not Cortana</h2>
        </div>
      </div>

      <div className='text-lg pl-16 px-10'>
        <div>
          Use Your voice to control your PC - Microsoft style!
          Simply tap on the button below to start the conversation
        </div>
        <div className='pt-12'>
          <Button title='Lets Go!' callback={startConversation} />
        </div>
      </div>
    </div>
  )
}
