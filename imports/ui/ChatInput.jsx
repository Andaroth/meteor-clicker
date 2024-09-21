import React, { useState, useRef } from 'react';

import { useSubscribe } from 'meteor/react-meteor-data';

export const ChatInput = () => {
  const inputElement = useRef()
  const [cooldown, setCooldown] = useState(false)
  const [prompt, setPrompt] = useState("")

  const isStarting = useSubscribe('chat');

  const isDisabled = () => !(isStarting
    || prompt.length <= 3
    || prompt.length > 140
    || cooldown
  )

  const handleInputChanged = () => {
    requestAnimationFrame(() => {
      setPrompt(inputElement.current.value)
      requestAnimationFrame(() => console.log("prompt", prompt))
    })
  }

  const handleSubmit = (e) => {
    if (isDisabled()) return
    setCooldown(true)
    Meteor.call('sendMessage', prompt, (res) => {
      setPrompt("")
      inputElement.current.value = ""
      setTimeout(() => setCooldown(false), 5000)
    })
  }

  return <>
    <div className="flex w-full border-2 p-0 bg-black rounded-lg">
      <div className="flex w-full gap-2 p-2">
        <input
          ref={inputElement}
          type="text"
          placeholder="Type a message here..."
          onChange={handleInputChanged}
          maxLength={140}
          className="bg-black text-white outline-none grow rounded-lg h-full max-w-[calc(100vw-192px)]"
          onKeyDown={(e) => e.key === "Enter" ? handleSubmit(e) : null}
        />
        <button
          className="border-2 border-[#0F0] bg-[#0F0] text-black px-4 py-2 rounded-lg cursor-pointer hover:text-white hover:bg-black"
          onClick={handleSubmit}
        >POST</button>
      </div>
    </div>
  </>
}