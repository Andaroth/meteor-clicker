import React from 'react';

import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import { ClicksCollection } from '../api/clicks';

export const List = () => {
  const isStarting = useSubscribe('allClicks');
  const clicks = useFind(() => ClicksCollection.find());

  const formatDate = (dt) => {
    const twoNums = (str) => ("0" + str).slice(-2)
    const dd = twoNums(dt.getUTCDay())
    const mm = twoNums(dt.getUTCMonth())
    const yyyy = dt.getFullYear()

    const hh = twoNums(dt.getHours())
    const mn = twoNums(dt.getMinutes())
    const ss = twoNums(dt.getSeconds())
    const ms = twoNums(dt.getMilliseconds())

    return <p className="gap-2">
      <span>{`${dd}/${mm}/${yyyy}`}</span>
      <span className="mx-2 text-[#888]">at</span>
      <span>{`${hh}h${mn}:${ss}'${ms}`}</span>
    </p>
  }

  return <div className="border-2 rounded-lg border-[#CCC] mx-auto w-[320px] max-w-[calc(100vh-32px)]">
    <div className="flex justify-center gap-2 p-2 border-b border-[#CCC]">
      <span className="text-lg">Details</span>
      <small className="leading-8">(20 last clicks)</small>
    </div>
    <div className="flex flex-col h-[200px] overflow-y-auto">
      { isStarting ? clicks.sort((a, b) => b.index - a.index)
        .map(cl => <div key={clicks.indexOf(cl)} className="flex flex-col justify-center">
          <div className="flex px-2 py-2 w-full border-b-2 border-[#333]">
            <p>{cl.index}</p>
            <p className="ml-2 w-full text-left md:text-right">{formatDate(cl.date)}</p>
          </div>
        </div>
      ) : <div className="flex p-2 justify-center">Loading...</div>}
    </div>
  </div>
}