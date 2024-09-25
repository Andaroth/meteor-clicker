import React from 'react';

import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ChatCollection } from '../api/chat';

export const ChatBox = () => {
  const isSubscribing = useSubscribe('chat');
  const messages = useFind(() => ChatCollection.find());

  const formatDate = (date) => {
    const twoNums = (num) => String(num).padStart(2, '0')
    const dt = new Date(date)
    const dd = twoNums(dt.getDate())
    const mm = twoNums(dt.getUTCMonth())

    const hh = twoNums(dt.getHours())
    const mn = twoNums(dt.getMinutes())
    const ss = twoNums(dt.getSeconds())

    return <p className="flex gap-2">
      <span>{`${dd}/${mm}`}</span>
      <span>{`${hh}h${mn}:${ss}`}</span>
    </p>
  }

  return <div className="flex flex-col border-2 rounded-lg border-[#CCC] bg-black mx-auto w-[400px] max-w-[calc(100vw-104px)] max-h-[calc(100%-72px)]">
    <div className="flex justify-center gap-2 p-2 border-b border-[#CCC]">
      <span className="text-lg">Chat</span>
      <small className="hidden sm:block leading-8">(50 last messages)</small>
    </div>
    <div className="flex flex-col-reverse justify-start h-64 md:h-full overflow-auto">
      { isSubscribing ? messages.sort((a, b) => b.date - a.date).map(msg => <div key={messages.indexOf(msg)} className="flex flex-col justify-center min-w-[360px]">
          <div className="flex px-2 py-2 w-full border-t-2 border-[#333]">
            <p className="w-full">
              <span className="font-extrabold text-purple-600">{msg.username || "Anonymous"}</span>
              <span className="text-blue-500">&nbsp;&gt; </span>
              <span>{msg.message}</span>
            </p>
            <div className="ml-2 text-right text-gray-400">{formatDate(msg.date)}</div>
          </div>
        </div>
      ) : <div className="flex flex-col p-2 justify-center">Loading...</div>}
    </div>
  </div>
}