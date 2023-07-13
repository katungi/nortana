'use client';
import 'regenerator-runtime/runtime'
import { useSpeechRecognition } from "react-speech-recognition"
import Button from '@/components/buttons/Button'
import { useState } from 'react';
import Link from 'next/link';
import useUserStore from '@/core/store/UserStore';
import Login from './auth/login';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/core/types/database.types';

export default async function Home() {
  const [ifStarted, setIfStarted] = useState<boolean>(false)

  async function startConversation() {
    if (!ifStarted) {
      setIfStarted(true)
    }
  }

  async function sendConversationToGPT() { }

  // shitty workaround for redirects for now (don't judge me)

  const supabase = createClientComponentClient<Database>({})
  const {data, error} = await (await supabase.auth.getSession())
  console.log(data.session)

  return (
    <div className='w-full'>
      {!data.session === null ? (
        <>
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
            <Link className='pt-12' href='/auth'>
              <Button title='Lets Go!' callback={startConversation} />
            </Link>
          </div>
        </>
      ) :
        <Login />
      }
      <p>{error?.message}</p>
    </div>
  )
}
