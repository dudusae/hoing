import { save } from './LocalStorage';

const todoLS = 'TODO';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    save(todoLS, result);
    return result;
  };
  
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

  const getListClass = (name, isDraggingOver, listLength) => {
    const classList = [
      `${name}-list`,
      isDraggingOver ? `${name}-list--isDraggingOver` : '',
      listLength > 0 ? `${name}-list--isContain` : '',
    ];
  
    return classList.join(' ');
  };
  
  const getItemClass = (name, isDragging) => {
    const classList = [
      `${name}-item`,
      isDragging ? `${name}-item--isDragging` : '',
    ];
  
    return classList.join(' ');
  };


  export { reorder, move, getListClass, getItemClass };