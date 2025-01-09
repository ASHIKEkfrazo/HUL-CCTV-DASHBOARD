import React, { useState, useEffect } from 'react';

const CurrentTime = ({collapsed}) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
      <div className='w-full text-white bg-[#06175d] text-center flex gap-2 justify-center font-bold items-center py-4'>
        {
            !collapsed ?
            <>
            
            <span className='text-md'>{currentDateTime.toLocaleDateString()}</span>
            <span className='text-md' >{currentDateTime.toLocaleTimeString()}</span>
            </>
            :null
        }
      </div>
  );
};

export default CurrentTime;