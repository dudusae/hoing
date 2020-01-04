import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './style.css';
import TodoForm from './components/TodoForm';
import DeleteBtn from './components/DeleteBtn'
import InlineForm from './components/InlineForm';
import DoingTimer from './components/DoingTimer';


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getListClass = (name, isDraggingOver) => {
  const classList = [
    `${name}-list`,
    isDraggingOver ? `${name}-list--isDraggingOver` : '',
  ]

  return classList.join(' ');
}

const getItemClass = (name, isDragging) => {
  const classList = [
    `${name}-item`,
    isDragging ? `${name}-item--isDragging` : '',
  ]

  return classList.join(' ');
}


class Dnd extends Component {

  id = 0;
  state = {
    items: [],
    selected: [],
    editing: false,
    editingId: '',
  };

  handleCreate = data => {
    const { items } = this.state;
    this.setState({
      items: items.concat({ id: this.id++, ...data }),
    });
  };

  handleRemove = (id) => {
    const { items } = this.state;
    this.setState({
      items: items.filter(item => item.id !== id)
    })
  }

  handleUpdate = (data) => {
    const { items } = this.state;
    this.setState({
      items: items.map(
        info => data.id === info.id
          ? { ...info, ...data } 
          : info 
      )
    , editing: false})
  }


  handleToggleEdit = (e) => {
    const { editing } = this.state;
    const id = e.target.dataset.rbdDraggableId;
    this.setState({ editing: !editing });
    this.setState({editingId: id})
  }

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    todo: 'items',
    doing: 'selected',
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index,
      );

      let state = { items };

      if (source.droppableId === 'doing') {
        state = { selected: items };
        
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
        items: result.todo,
        selected: result.doing,
      });
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      
      <DragDropContext onDragEnd={this.onDragEnd}>
       <div className="todo__container">
       
       <TodoForm onCreate={this.handleCreate} />

          <Droppable droppableId="todo">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={getListClass("todo", snapshot.isDraggingOver)}
                
              >
                {this.state.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{...provided.draggableProps.style}}
                        className={getItemClass("todo", snapshot.isDragging)}
                        onDoubleClick={this.handleToggleEdit}
                      >
                        {(this.state.editing && this.state.editingId === item.id) ? 
                       <InlineForm item={item} onUpdate={this.handleUpdate}/>
                          : item.content
                        }
                        <DeleteBtn id={item.id} onRemove={this.handleRemove} />
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
        {this.state.selected.length > 0 ? <DoingTimer/> : <div className="doing__guide">지금 할 일을 <br/>여기에 끌어다 놓으세요</div> }
          <Droppable droppableId="doing">
            
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={getListClass("doing", snapshot.isDraggingOver)}
              >
                {this.state.selected.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{...provided.draggableProps.style}}
                        className={getItemClass("doing", snapshot.isDragging)}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    );
  }
}

export default Dnd;
