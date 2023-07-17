import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '@/core/types/database.types';
import { toast } from 'react-hot-toast';
import useUserStore from '@/core/store/UserStore';

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const error = requestUrl.searchParams.get('error');
  const code = requestUrl.searchParams.get('code');

  if (error) {
    return NextResponse.redirect('/login');
  }
  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const sess = await supabase.auth.exchangeCodeForSession(code);
    if (sess.data) {
      useUserStore.setState({
        token: sess.data.session?.access_token,
        email: sess.data.user?.email,
        name: sess.data.user?.user_metadata?.full_name,
      });
    } 
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin + '/chat');
}

export const dynamic = 'force-static';
