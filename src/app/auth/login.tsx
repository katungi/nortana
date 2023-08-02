import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useState } from 'react'
import { revalidatePath } from "next/cache"
import Image from 'next/image'
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

import type { Database } from "@/core/types/database.types"
import CortanaIcon from "../../../public/Icons/cortanaIcon"
import { MicrosoftIcon } from "../../../public/Icons"
import Button from "@/components/buttons/Button"
// import Button from '@/components/ui/button'
import { cn } from "@/lib/utils"
// import { cookies } from "next/headers"

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false)

  const handleSignIn = async () => {
    setLoading(true)
    const supabase = createClientComponentClient<Database>({})
    const res = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        scopes: 'email',
        redirectTo: `${location.origin}/auth/callback`
      },
    })
    console.log('res::', res)
  }

  const handleSignOut = async () => {
    const supabase = createClientComponentClient<Database>({})
    await supabase.auth.signOut()
  }

  return (
    <div className="w-full flex flex-col justify-center align-center ml-12">
      <div className="w-full">
        <CortanaIcon className='w-20 ml-52 mt-12' />
        <p className='mt-16 ml-40 text-gray-300 text-xl font-bold'>Sign in to Cortana</p>
        <Image src='/working-image.png' alt='Working People' className='ml-16' width={400} height={400} />
        <div className='pl-12 ml-16'>
          <Button title="Sign in with Microsoft" callback={handleSignIn} loading={loading}  />
          <p className='mt-4 ml-8 text-gray-300'>For the best experience, use your</p>
          <p className='ml-16 text-gray-300'> work or school account</p>
        </div>
      </div>
    </div>
  )
}