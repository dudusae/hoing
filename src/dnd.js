import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './style.css';
import TodoForm from './TodoForm';

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`,
  }));

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

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  borderRadius: `${isDragging ? '30px' : '0'}`,
  border: `dotted 2px ${isDragging ? 'var(--oc-red-4)' : 'transparent'}`,
  borderBottom: `${isDragging ? 'dotted 2px var(--oc-red-4)' : 'solid 1px var(--oc-gray-2)'}`,
  // margin: `0 0 ${grid}px 0`,
  margin:0,
  position: 'relative',

  color: isDragging ? 'var(--oc-red-6)' : 'var(--oc-gray-7)',
  background: isDragging ? 'var(--oc-red-1)' : 'transparent',

  ...draggableStyle,
});

const getItemStyle2 = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  borderRadius: '30px',
  margin: `0 0 ${grid}px 0`,
  color: isDragging ? 'var(--oc-red-6)' : 'var(--oc-gray-7)',
  fontWeight: 500,
  background: isDragging ? 'var(--oc-red-1)' : 'var(--oc-gray-0)',
  border: `${isDragging ? 'dotted 2px var(--oc-red-4)' : 'solid 2px var(--oc-red-4)'}`,

  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'white' : 'white',
  padding: grid,
  width: '90%',
  margin: `0 auto`,
});
const getListStyle2 = isDraggingOver => ({
  background: isDraggingOver ? 'var(--oc-red-1)' : 'var(--oc-gray-0)',
  padding: grid,
  width: '90%',
  borderRadius: 20,
});

class Dnd extends Component {

  id = 0;
  state = {
    items: [],
    selected: getItems(5, 10),
  };

  handleCreate = data => {
    const { items } = this.state;
    this.setState({
      items: items.concat({ id: this.id++, ...data }),
    });
  };

  // state = {
  //   items: getItems(10),
  //   selected: getItems(5, 10),
  // };
  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable: 'items',
    droppable2: 'selected',
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

      if (source.droppableId === 'droppable2') {
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
        items: result.droppable,
        selected: result.droppable2,
      });
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      
      <DragDropContext onDragEnd={this.onDragEnd}>
       <div className="box_todo">
       
       <TodoForm onCreate={this.handleCreate} />

          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
                      >
                        {item.content}
                        <button class="btn__del">삭제</button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          </div>
        <div className="box_ing">
          <Droppable droppableId="droppable2">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle2(snapshot.isDraggingOver)}
              >
                {this.state.selected.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle2(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
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
