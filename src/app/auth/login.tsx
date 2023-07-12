'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useState } from 'react'
import { revalidatePath } from "next/cache"
import Image from 'next/image'
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

import type { Database } from "@/core/types/database.types"
import { cookies } from "next/headers"
import Button from "@/components/buttons/Button"
import CortanaIcon from "../../../public/Icons/cortanaIcon"
import { MicrosoftIcon } from "../../../public/Icons"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignIn = async () => {
    const supabase = createClientComponentClient<Database>()
    await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        scopes: 'email',
        // scopes: 'offline_access',
      },
    })
    router.refresh()
  }

  const handleSignOut = async () => {
    const supabase = createClientComponentClient<Database>()
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div className="w-1/2 flex flex-col justify-center align-center ml-64">
      <div className="ml-72">
        <CortanaIcon className='w-24 ml-72 mt-24 ' />
        <Image
          src='/working-image.png'
          alt='Working People'
          className='ml-16'
          width={500}
          height={500}
        />
        <div className='pl-44'>
          <Button title="Sign in with Microsoft" callback={handleSignIn} icon={MicrosoftIcon} />
          {/* We will show this only when auth works */}
          {/* <Button title="Sign Out" callback={handleSignOut} /> */}

          <p className='mt-4 ml-8'>For the best experience, use your</p>
          <p className='ml-16'> work or school account</p>
        </div>
      </div>
    </div>
  )
}