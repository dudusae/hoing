import React, { useState, useEffect, useRef } from 'react';
import './../style.css';

const setTwoDigit = num => {
  if (num < 10) {
    return '0' + num;
  } else return num;
};

const timeToMmSs = time => {
    const min = setTwoDigit(Math.floor(time / 60000));
    const sec = setTwoDigit(Math.floor((time % 60000) / 1000));
    return `${min}:${sec}`;
  };

const TimerOn = () => {
  //   const [count, setCount] = useState(1500000);
  const [count, setCount] = useState(2000);
  const [isRunning, setIsRunning] = useState(true);
  const [timeIn, setTimeIn] = useState(true);
  const [timeOutCount, setTimeOutCount] = useState(1000);

  useInterval(
    () => {
      setCount(count - 1000);
      if (count < 1999) {
        setTimeIn(false);
      }
    },
    isRunning && timeIn ? 1000 : null,
  );

  useInterval(
    () => {
      setTimeOutCount(timeOutCount + 1000);
    },
    !timeIn ? 1000 : null,
  );

  

  const handleIsRunningChange = e => {
    setIsRunning(!isRunning);
  };

  return (
    <>
      <div className="doing__timer">
        {timeToMmSs(count)}
        {timeIn ? 
            <button onClick={handleIsRunningChange}>
                {isRunning === true ? '일시정지' : '재개'}
             </button> : ''}
      </div>
      <div>
          {timeIn ? '' : timeToMmSs(timeOutCount)}
      </div>
    </>
  );
};

const DoingTimer = () => {
  const [timerOn, setTimerOn] = useState(false);

  const handleTimer = () => {
    setTimerOn(true);
  };

  if (timerOn) {
    return <TimerOn />;
  } else {
    return (
      <div className="doing__timer">
        25:00
        <button onClick={handleTimer} name="true">
          시작
        </button>
      </div>
    );
  }
};

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default DoingTimer;
