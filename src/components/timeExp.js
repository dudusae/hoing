const setTwoDigit = num => {
    if (num < 10) {
      return '0' + num;
    } else return num;
  };
  
  const timeToMmSs = (time, seperate) => {
    const hour = setTwoDigit(Math.floor(time / 3600000));
    const min = setTwoDigit(Math.floor((time % 3600000) / 60000));
    const sec = setTwoDigit(Math.floor((time % 60000) / 1000));
    if (seperate === 'text') {
        return `${hour > 0 ? `${hour}시간 ` :''}${min}분 ${sec}초`;
    } 
    else if (seperate === ':') {
        return `${hour > 0 ? `${hour}:` :''}${min}:${sec}`
    ;}
  };

  const getTime = (time, seperate) =>{
    const date = new Date(time),
          hour = date.getHours(),
          amPm = hour < 12 ? '오전' : '오후',
          hour12 = setTwoDigit(amPm === '오전' ? hour : hour-12),
          min = setTwoDigit(date.getMinutes()),
          sec = setTwoDigit(date.getSeconds());

      if (seperate === 'text') {
        return `${amPm} ${hour > 0 ? `${hour12}시 ` :''}${min}분 ${sec}초`;
    } 
    else if (seperate === ':') {
        return `${amPm} ${hour > 0 ? `${hour12}:` :''}${min}:${sec}`
    ;}
  }

  const timeGap = (startTime, endTime) => {
      const start = parseInt(startTime);
      const end = parseInt(endTime);
      const gap = end - start;
      return gap
  }


  export { getTime, timeToMmSs, timeGap } ;