import React, { useState } from 'react';
import { getTime, timeGap, timeToMmSs } from './../lib/TimeExp';
import { groupBy } from './../lib/GroupBy';
import './../style.css';
import InlineForm from './InlineForm';


const DoneGroup = props => {
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState('');

  const handleToggleEdit = e => {
    setEditing(true);
    setEditingId(parseInt(e.target.id));
  };

  const handleUpdate = (data, from) => {
    props.onUpdate(data, from);
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


const groupedArray = data => {
  const sortedDones = data.sort(function(a, b) {
    return b['start'] - a['start'];});
  return groupBy('date')(sortedDones);
}

export {DoneGroup, groupedArray};
