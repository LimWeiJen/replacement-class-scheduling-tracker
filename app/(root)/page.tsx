'use client'

import { Message } from '@/interface';
import React, { useEffect, useState, useRef } from 'react'
import { v4 } from 'uuid';

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

  const parentName = useRef<any>(null);
  const parentNumber = useRef<any>(null);
  const message = useRef<any>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newMessage: Message = {
      messageID: v4(),
      parentName: parentName.current.value,
      parentNumber: parentNumber.current.value,
      message: message.current.value,
    }

    const res = await fetch('/api/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: newMessage
      })
    })

    if (res.ok) window.location.reload();
  }

  return (
    <div>
      <input type="text" ref={parentName} className="border-2" placeholder="parent name" />
      <input type="text" ref={parentNumber} className="border-2" placeholder="parent number" />
      <textarea ref={message} className="border-2" placeholder="message" />
      <button onClick={(e) => handleSubmit(e)}>Submit</button>

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
