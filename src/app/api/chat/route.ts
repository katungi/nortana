import { type NextRequest } from 'next/server';
import { Message } from '@/core/types/types';

export async function POST(request: NextRequest) {
  // first we get the details from the FE
  const body = await request.text();
  const bodyJSON = JSON.parse(body);

  // Create an array of messages
  const messages: Message[] = [];

  // first we pre-set the GPT model as an organiser
  const newMessage: Message = {
    role: 'system',
    content:
      'You are an excellent event planner who can suggest places for people to check out. Ask people for 3 pieces of information: 1) the name of the place 2) if they like lively places 3) the date period or rather when they will be going',
  };

  messages.push(newMessage);

  // the rest of the conversation is done in the frontend.
  const conversation: Message[] = bodyJSON.conversation;
  conversation.forEach((converse: Message) => {
    messages.push(converse);
  });

  const bodyToSend = {
    model: 'gpt-4',
    temperature: 0.7,
    messages: messages,
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.OPEN_API_KEY,
    },
    body: JSON.stringify(bodyToSend),
  });

  // getting the json after the promise is fulfilled
  const json = await response.json();
  let returnMsg: string = '';

  if (json.choices != null) {
    const responseMessage = json.choices[0].messages;
    returnMsg = responseMessage;
  }

  return new Response(returnMsg);
}
