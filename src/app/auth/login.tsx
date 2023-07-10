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
    <div className="w-full">
      <CortanaIcon className='w-24 ml-72 mt-24 ' />
      <Button title="Sign in with Microsoft" callback={handleSignIn} icon={MicrosoftIcon} />
      <Button title="Sign Out" callback={handleSignOut} />
    </div>
  )
}