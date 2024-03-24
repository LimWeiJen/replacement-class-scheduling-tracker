'use client'

import { Message } from '@/interface';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [messages, setmessages] = useState<Array<Message>>([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const messages = await fetch('/api/message', {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    })
    const newMessages: Array<Message> = [];
    const data = (await messages.json())['messages'];
    data.forEach((res: any) => newMessages.push(res));
    setmessages(newMessages);
  }

  const sendMessage = async (message: Message) => {
    window.open(`https://wa.me/${message.parentNumber}?text=${message.message}`)
    await fetch('/api/message', {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messageID: message.messageID })
    })
    window.location.reload();
  }

  return (
    <div>
      {messages.map(message => (
        <div key={message.messageID} className='flex gap-2'>
          <div>{message.parentName} - {message.parentNumber} - {message.message}</div>
          <button onClick={() => sendMessage(message)}>Send</button>
        </div>
      ))}
    </div>
  )
}

export default Page
