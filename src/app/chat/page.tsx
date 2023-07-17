'use client'

import useSharedStore from "@/core/store/SharedStore"
import useUserStore from "@/core/store/UserStore"
import { Database } from "@/core/types/database.types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default async function ChatPage() {
  const supabase = createClientComponentClient<Database>({})

  const { data, error } = await supabase.auth.getSession()
  console.log("DATATA::", data?.session?.user)

  const user = useUserStore().name
  console.log("USER::", user)
  return (

    <>
      <div className='w-full'>
        <p>Chat Page</p>
      </div>
    </>
  )
}