import React from 'react';
import { getTime, timeGap, timeToMmSs } from './timeExp';
import './../style.css';
import { load } from './localStorage';

const doneLS = 'DONE';

const DoneList = () => {
    const dones = load(doneLS);
    return(
        <div className="done__container">
        {dones.map((item, index) => (
                  <div key={item.id} index={index}>
                    {/* {item[0].date} */}
                    {item[0].content} {timeToMmSs(timeGap(item.start, item.end), 'text')}
                    {getTime(item.start, ':')}-{getTime(item.end, ':')}
                    </div>))}
          </div>
    )
}

export default DoneList;