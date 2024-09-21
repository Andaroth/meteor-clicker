import React, { useState } from 'react';
import { Count } from './Count.jsx';
import { List } from './List.jsx';
import { AndaCursor } from './AndaCursor.jsx';

export const App = () => {
  const [showList, setShowList] = useState(false)
  const handleShowList = (e) => {
    e?.preventDefault()
    setShowList(true)
  }

  return <div
    className="text-center flex flex-col justify-center h-[100dvh]"
  >
    <div className="flex justify-center">
      <dif className="flex flex-col p-8 bg-[#00000088] rounded-lg">
        <h1 className="text-lg md:text-4xl text-nowrap">&lt;AndaClicker&nbsp;/&gt;</h1>
        <Count/>
        { showList 
          ? <List />
          : <a className="mb-4 md:mb-0" href="#" onClick={(e) => handleShowList(e)}>View more details</a>
        }
        <div className="flex justify-center">
          <p className="flex flex-col md:flex-row gap-2 mt-4">
            <a href="https://github.com/Andaroth/meteor-clicker" target="_blank">Open on github</a>
            <span className="text-gray-600">or</span>
            <a href="https://andapirate.com" target="_blank">Visit my website</a>
          </p>
        </div>
      </dif>
    </div>
    <AndaCursor />
  </div>
};
