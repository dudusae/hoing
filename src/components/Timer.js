import React, { useState, useEffect } from 'react';
import './../style.css';
import useInterval from './useInterval';
import { save, load } from './localStorage';

const doneLS = 'DONE';

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

const TimerOn = ({ onClick }) => {
  //   const [count, setCount] = useState(1500000);
  const [count, setCount] = useState(2000);
  // const [isRunning, setIsRunning] = useState(true);
  const [timeIn, setTimeIn] = useState(true);
  const [timeOutCount, setTimeOutCount] = useState(1000);

  useInterval(
    () => {
      setCount(count - 1000);
      if (count < 1999) {
        setTimeIn(false);
      }
    },
    // isRunning && timeIn ? 1000 : null,
    timeIn ? 1000 : null,
  );

  useInterval(
    () => {
      setTimeOutCount(timeOutCount + 1000);
    },
    !timeIn ? 1000 : null,
  );

  // const handleIsRunningChange = e => {
  //   setIsRunning(!isRunning);
  // };

  return (
    <div className="doing__timer">
      {timeToMmSs(count)}
      {/* {timeIn ? 
            <button onClick={handleIsRunningChange}>
                {isRunning === true ? '일시정지' : '재개'}
             </button> : ''} */}

      {timeIn ? (
        ''
      ) : (
        <div>
          {timeToMmSs(timeOutCount)}
          <br />
          <button onClick={onClick} name="timerOff">정지</button>
        </div>
      )}
    </div>
  );
};

const TimerOff = ({ onClick }) => {
  return (
    <div className="doing__timer">
      25:00
      <button onClick={onClick} name="timerOn">
        시작
      </button>
    </div>
  );
};

const Timer = ({ doing, onTimer }) => {
  const [timerOn, setTimerOn] = useState(false);
  const [ing, setIng] = useState({});
  const init = () => { setIng({...doing[0], timeStamp:[]});}
  
  useEffect(init, [doing]);

  const handleTimer = e => {
    setTimerOn(!timerOn);
    getTimeStamp(!timerOn);
    onTimer(!timerOn)
  };
  
  const getTimeStamp = timerOn => {
    if (timerOn) {
      setIng({...ing,
          id: Date.now(),
          timeStamp: [...ing.timeStamp,{start: Date.now() },],
      });
    }
    else {
        setIng({...ing, timeStamp: [...ing.timeStamp,{end: Date.now() },],});
        save(doneLS, {...ing, timeStamp: [...ing.timeStamp,{end: Date.now() },],});
        init();
    }
};

  if (timerOn) {
    return <TimerOn onClick={handleTimer} />;
  } else {
    return <TimerOff onClick={handleTimer} />;
  }
};

export default Timer;
