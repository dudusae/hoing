import React, { useState, useEffect } from 'react';
import './../style.css';
import useInterval from './../lib/UseInterval';
import { save, load } from './../lib/LocalStorage';
import { timeToMmSs } from './../lib/TimeExp';

const doneLS = 'DONE';

const TimerOn = ({ onClick }) => {
  //   const [count, setCount] = useState(1500000);
  const [count, setCount] = useState(2000);
  const [timeIn, setTimeIn] = useState(true);
  const [timeOutCount, setTimeOutCount] = useState(1000);

  useInterval(
    () => {
      setCount(count - 1000);
      if (count < 1999) {
        setTimeIn(false);
      }
    },
    timeIn ? 1000 : null,
  );

  useInterval(
    () => {
      setTimeOutCount(timeOutCount + 1000);
    },
    !timeIn ? 1000 : null,
  );

  return (
    <div className="doing__timer">
      {timeToMmSs(count, ':')}
      {timeIn ? ('') : (<div className="doing__timeout">
                        + {timeToMmSs(timeOutCount, ':')}
                        </div>
      )}
      {timeIn ? (<button onClick={onClick} className="doing__btn doing__stopbtn--timein" name="timerOff">정지</button>) 
      : (<button onClick={onClick} className="doing__btn doing__stopbtn--timeout" name="timerOff">정지</button>
      )}
    </div>
  );
};

const TimerOff = ({ onClick }) => {
  return (
    <div className="doing__timer">
      25:00
      <button className="doing__btn doing__startbtn" onClick={onClick} name="timerOn">
        시작
      </button>
    </div>
  );
};

const Timer = ({ doing, onTimer }) => {
  const [timerOn, setTimerOn] = useState(false);
  const [ing, setIng] = useState({});
  const [loaded, setLoaded] = useState(load(doneLS))
  const init = () => { setIng(...doing);}
  
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