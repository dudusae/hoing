import React, { useState, useEffect } from 'react';
import './../style.css';
import useInterval from './useInterval';
import { save, load } from './localStorage';
import { timeToMmSs } from './timeExp';
const doneLS = 'DONE';



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
      {timeToMmSs(count, ':')}
      {/* {timeIn ? 
            <button onClick={handleIsRunningChange}>
                {isRunning === true ? '일시정지' : '재개'}
             </button> : ''} */}

      {timeIn ? (
        ''
      ) : (
        <div className="doing__timeout">
          + {timeToMmSs(timeOutCount, ':')}
          <br />
          <button onClick={onClick} className="doing__btn" name="timerOff">정지</button>
        </div>
      )}
    </div>
  );
};

const TimerOff = ({ onClick }) => {
  return (
    <div className="doing__timer">
      25:00
      <button className="doing__btn" onClick={onClick} name="timerOn">
        시작
      </button>
    </div>
  );
};

const Timer = ({ doing, onTimer }) => {
  const [timerOn, setTimerOn] = useState(false);
  const [ing, setIng] = useState({});
  const [loaded, setLoaded] = useState(load(doneLS))
  const init = () => { setIng({...doing});}
  
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
          start: Date.now(),
      });
    }
    else {
        setIng({...ing, end: Date.now()});
        save(doneLS,[...loaded, {...ing, end: Date.now()}]);
        setLoaded(load(doneLS));
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