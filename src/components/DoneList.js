import React from 'react';
import { getTime, timeGap, timeToMmSs } from './timeExp';
import './../style.css';
import { load } from './localStorage';

const doneLS = 'DONE';

const DoneList = () => {
  const dones = load(doneLS);
  return (
    <div className="done__container">
      <div className="todo-list">
        {dones.map((item, index) => (
          <div className="done-item" key={item.id} index={index}>
            <div className="done-item__content">
              <div className="done-item__header">
                <div className="done-item__title">{item[0].content}</div>
                <div className="done-item__totaltime">
                  {timeToMmSs(timeGap(item.start, item.end), 'text')}
                </div>
              </div>
              <div className="done__timestamp">
                {getTime(item.start, ':')}-{getTime(item.end, ':')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoneList;
