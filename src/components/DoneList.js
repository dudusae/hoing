import React, { useState } from 'react';
import { getTime, timeGap, timeToMmSs } from './../lib/TimeExp';
import { groupBy } from './../lib/GroupBy';
import './../style.css';
import { save, load } from './../lib/LocalStorage';
import InlineForm from './InlineForm';

const doneLS = 'DONE';

const DoneGroup = props => {
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState('');

  const handleToggleEdit = e => {
    setEditing(true);
    setEditingId(parseInt(e.target.id));
  };

  const handleUpdate = (data) => {
    props.onUpdate(data);
    setEditingId(false);
  }

  return props.data.map((item, index) => (
    <div className="done-item" key={item.id} index={index} >
      <div className="done-item__content">
        <div className="done-item__header">
          <div className="done-item__title" id={item.id} onDoubleClick={handleToggleEdit}>
          {editing &&
          editingId === item.id ? (
            <InlineForm
              item={item}
              from="done"
              onUpdate={handleUpdate}
            />
          ) : (
            item.content
          )}</div>
          <div className="done-item__totaltime">
            {timeToMmSs(timeGap(item.start, item.end), 'text')}
          </div>
        </div>
        <div className="done__timestamp">
          {getTime(item.start, ':')}-{getTime(item.end, ':')}
        </div>
      </div>
    </div>
  ));
};

const DoneList = () => {
  const [dones, setDones] = useState(load(doneLS));
  const sortedDones = dones.sort(function(a, b) {
    return b['start'] - a['start'];});

  const groupByDate = groupBy('date')(sortedDones);

  const handleUpdate = (data) => {
      setDones(dones.map(info =>
          data.id === info.id ? { ...info, ...data } : info,
        ));
      save(
        doneLS,
        dones.map(info => (data.id === info.id ? { ...info, ...data } : info)),
      );
  };

  return (
    <div className="done__container">
      <div className="todo-list">
        {Object.keys(groupByDate).map((key, index) => (
          <div key={index}>
            <div className="done__date">{key}</div>
            <DoneGroup data={groupByDate[key]} onUpdate={handleUpdate}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoneList;
