const DragAndDrop = () => {
  let draggedElement = null;

  const handleDragStart = (event) => {
    draggedElement = event.target;
    event.target.classList.add('bg-indigo-300');
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    const hoveredElement = event.target;

    if (draggedElement.contains(hoveredElement)) {
      return;
    }

    if (hoveredElement === draggedElement) {
      return;
    }

    const hoveredRect = hoveredElement.getBoundingClientRect();
    const draggedRect = draggedElement.getBoundingClientRect();

    const distance = hoveredRect.top - draggedRect.top;

    if (distance > 0) {
      hoveredElement.parentNode.insertBefore(draggedElement, hoveredElement.nextSibling);
    } else {
      hoveredElement.parentNode.insertBefore(draggedElement, hoveredElement);
    }

    const draggedElementRect = draggedElement.getBoundingClientRect();
    const topOffset = draggedElementRect.top;
    const bottomOffset = window.innerHeight - draggedElementRect.bottom;
    const scrollThreshold = 150;

    if (topOffset < scrollThreshold) {
      window.scrollTo({
        top: window.scrollY - (scrollThreshold - topOffset),
        behavior: 'smooth',
      });
    }

    if (bottomOffset < scrollThreshold) {
      window.scrollTo({
        top: window.scrollY + (scrollThreshold - bottomOffset),
        behavior: 'smooth',
      });
    }
  };

  const handleDragEnd = (event) => {
    event.target.classList.remove('bg-indigo-300');
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
};

export default DragAndDrop;
