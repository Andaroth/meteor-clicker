import React, { useState } from 'react';
import { Count } from './Count.jsx';
import { List } from './List.jsx';

export const CountComponent = () => {
  const [showList, setShowList] = useState(false)
  const handleShowList = (e) => {
    e?.preventDefault()
    setShowList(true)
  }

  return <div className="flex justify-center">
    <div className="flex flex-col p-8 border-2 max-w-full mx-2 md:mx-0 h-full bg-[#00000088] rounded-lg">
      <h1 className="text-lg text-center md:text-4xl text-nowrap">&lt;AndaClick&nbsp;/&gt;</h1>
      <Count/>
      { showList 
        ? <List />
        : <div className="flex justify-center">
          <a className="mb-4 md:mb-0" href="#" onClick={(e) => handleShowList(e)}>View more details</a>
        </div>
      }
    </div>
  </div>
};
