import * as React from 'react'
import Link from 'next/link'
import Textarea from 'react-textarea-autosize'
import { UseChatHelpers } from 'ai/react'

import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { IconArrowElbow, IconMicrophone, IconPlus } from '../ui/iconts'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '../ui/button'

export interface PromptProps extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => Promise<void>
  isLoading: boolean
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form onSubmit={async e => {
      e.preventDefault()
      if (!input?.trim()) return
      setInput('')
      await onSubmit(input)
    }}
      ref={formRef}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/"
              className={cn(
                buttonVariants({ size: 'sm', variant: 'outline' }),
                'absolute left-0 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4'
              )}
            >
              <IconMicrophone />
              <span className="sr-only">Talk to Cortana</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Talk to Cortana</TooltipContent>
        </Tooltip>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown as any} // TODO: fix this
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Cortana"
          spellCheck={false}
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
        />
        <div className='absolute right-0 top-4 sm:right-4'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='submit'
                size='icon'
                disabled={isLoading || input === ''}>
                <IconArrowElbow />
                <span className="sr-only">Send</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send (Enter) </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}