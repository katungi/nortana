'use server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '@/core/types/database.types';

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  console.log('REQUEST URL::', requestUrl)
  const code = requestUrl.searchParams.get('code');
  if (code) {
    console.log('AUTH CODE::', code);
    const supabase = createRouteHandlerClient<Database>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
