'use client';
import { useSpeechRecognition } from "react-speech-recognition"
import Button from '@/components/buttons/Button'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useUserStore from '@/core/store/UserStore';
import Login from './auth/login';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/core/types/database.types';
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';
import {ask} from '@tauri-apps/api/dialog'

export default async function Home() {
  const [ifStarted, setIfStarted] = useState<boolean>(false)


  async function checkPermission() {
    let permissionGranted = await isPermissionGranted()
    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === 'granted';
    } else {
      sendNotification({
        title: 'Welcome to Cortana',
        body: 'This is a notification from Cortana',
      })
    }
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      checkPermission()
    }
  }, [])

  async function startConversation() {
    if (!ifStarted) {
      setIfStarted(true)
    }
  }

  async function sendConversationToGPT() { }

  // shitty workaround for redirects for now (don't judge me)
  const supabase = createClientComponentClient<Database>({})
  const { data, error } = await supabase.auth.getSession()
  console.log(data?.session)

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
            {/* <Link className='pt-12' href='/auth'>
              <Button title='Lets Go!' callback={startConversation} />
            </Link> */}
          </div>
        </>
      ) :
        <Login />
      }
      <p>{error?.message}</p>
    </div>
  )
}
