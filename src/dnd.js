import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './style.css';
import TodoForm from './components/TodoForm';
import DeleteBtn from './components/DeleteBtn';
import InlineForm from './components/InlineForm';
import Timer from './components/Timer';
import { save, load } from './lib/LocalStorage';
import DoneList from './components/DoneList';
import { reorder, move, getListClass, getItemClass } from './lib/DndLib';

const todoLS = 'TODO';
const doneLS = 'DONE';

class Dnd extends Component {
  id = 0;
  state = {
    todos: load(todoLS),
    doings: [],
    dones: load(doneLS),
    editing: false,
    editingId: '',
    timerOn: false,
  };

  handleCreate = (data, from) => {
    if (from === 'todo') {
    const { todos } = this.state;
    this.setState({
      todos: todos.concat({ id: this.id++, ...data }),
    });
    save(todoLS, todos.concat({ id: this.id++, ...data }));
  } else if (from === 'doing') {
    
    const { dones } = this.state;
    this.setState({
      dones: dones.concat({ id: this.id++, ...data }),
    });

    // save(todoLS, dones.concat({ id: this.id++, ...data }));
  }
  };

  handleRemove = (from, id) => {
    if (from === 'todo') {
      const { todos } = this.state;
      this.setState({
        todos: todos.filter(item => item.id !== id),
      });
      save(
        todoLS,
        todos.filter(item => item.id !== id),
      );
    } else if (from === 'doing') {
      const { doings } = this.state;
      this.setState({
        doings: doings.filter(item => item.id !== id),
      });
    }
  };

  handleUpdate = (data, from) => {
    if (from === 'todo') {
      const { todos } = this.state;
      this.setState({
        todos: todos.map(info =>
          data.id === info.id ? { ...info, ...data } : info,
        ),
        editing: false,
      });
      save(
        todoLS,
        todos.map(info => (data.id === info.id ? { ...info, ...data } : info)),
      );
    } else if (from === 'doing') {
      const { doings } = this.state;
      this.setState({
        doings: doings.map(info =>
          data.id === info.id ? { ...info, ...data } : info,
        ),
        editing: false,
      });
    } else if (from === 'done'){
      const { dones } = this.state;
      this.setState({
        dones: dones.map(info =>
          data.id === info.id ? { ...info, ...data } : info,
        ),
        editing: false,
      });
      save(
        doneLS,
        dones.map(info => (data.id === info.id ? { ...info, ...data } : info)),
      );
    }
  };

  handleToggleEdit = e => {
    const { editing } = this.state;
    const id = e.target.dataset.rbdDraggableId;
    this.setState({ editing: !editing });
    this.setState({ editingId: id });
  };

  handleToggleTimeon = boolean => {
    this.setState({ timerOn: boolean });
  };

  id2List = {
    todo: 'todos',
    doing: 'doings',
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const todos = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index,
      );

      let state = { todos };

      if (source.droppableId === 'doing') {
        state = { doings: todos };
      }
      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination,
      );

      this.setState({
        todos: result.todo,
        doings: result.doing,
      });

      save(todoLS, result.todo);
    }
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="todo__container">
          <TodoForm from="todo" onCreate={this.handleCreate} />

          <Droppable droppableId="todo">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={getListClass('todo', snapshot.isDraggingOver)}
              >
                {this.state.todos.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ ...provided.draggableProps.style }}
                        className={getItemClass('todo', snapshot.isDragging)}
                        onDoubleClick={this.handleToggleEdit}
                      >
                        {this.state.editing &&
                        this.state.editingId === item.id ? (
                          <InlineForm
                            item={item}
                            from="todo"
                            onUpdate={this.handleUpdate}
                          />
                        ) : (
                          item.content
                        )}
                        <DeleteBtn
                          id={item.id}
                          from="todo"
                          onRemove={this.handleRemove}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className="doing__container">
          {this.state.doings.length > 0 ? 
            <div className="doing-guide--onStage">
              지금 집중해서 할 일</div> : ''}
          <Droppable droppableId="doing">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={getListClass(
                  'doing',
                  snapshot.isDraggingOver,
                  this.state.doings.length,
                )}
              >
                {this.state.doings.length > 0 ? '' : <div className="doing-guide"> 할 일을 <br /> 여기에 끌어다 놓으세요</div>}
                {this.state.doings.map((item, index) =>
                  this.state.timerOn ? (
                    <div key={index} className="doing-item--timeOn">{item.content}</div>
                  ) : (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{ ...provided.draggableProps.style }}
                          className={getItemClass('doing', snapshot.isDragging)}
                          onDoubleClick={this.handleToggleEdit}
                        >
                          {this.state.editing &&
                          this.state.editingId === item.id ? (
                            <InlineForm
                              item={item}
                              from="doing"
                              onUpdate={this.handleUpdate}
                            />
                          ) : (
                            item.content
                          )}
                          <DeleteBtn
                            id={item.id}
                            from="doing"
                            onRemove={this.handleRemove}
                          />
                        </div>
                      )}
                    </Draggable>
                  ),
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {this.state.doings.length > 0 ? (
            <Timer
              onTimer={this.handleToggleTimeon}
              doing={this.state.doings}
              onCreate={this.handleCreate} 
              from="doing"
            />
          ) : ''}
        </div>
        <DoneList />
          {/* <div className="done__container">
            <div className="done-list__title">완료한 목록<span className={this.state.dones.length > 0 ? 'blind' : ''}>이 여기 쌓여요</span></div>
            <div className="todo-list">
              {Object.keys(this.groupByDate).map((key, index) => (
                <div key={index}>
                  <div className="done__date">{key}</div>
                  <DoneGroup data={this.groupByDate[key]} onUpdate={this.handleUpdate}/>
                </div>
              ))}
            </div>
          </div> */}



      </DragDropContext>
    );
  }
}

export default Dnd;
