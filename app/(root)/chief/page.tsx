'use client'

import { Message } from '@/interface';
import React, { useRef } from 'react'
import { v4 } from 'uuid';

const Page = () => {
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
    </div>
  )
}

export default Page
