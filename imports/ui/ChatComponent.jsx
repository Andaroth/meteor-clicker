import React from 'react';
import { ChatBox } from './ChatBox.jsx';
import { ChatInput } from './ChatInput.jsx';

export const ChatComponent = () => {
  return <div className="flex justify-center">
    <div className="flex flex-col p-8 max-h-[calc(100dvh-32px)] max-w-full mx-2 md:mx-0 border-2 bg-[#00000088] rounded-lg">
      <div className="flex flex-col gap-4 max-h-full grow">
        <ChatBox />
        <ChatInput />
      </div>
    </div>
  </div>
};
