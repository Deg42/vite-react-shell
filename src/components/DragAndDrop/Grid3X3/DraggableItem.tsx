interface DraggableItemProps {
    id: string;
    isDroppedInContainer: boolean;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, isDroppedInContainer }) => {

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('id', (event.target as HTMLDivElement).id);
    }

    return (<div
        className={`bg-purple-500 w-12 h-12 m-1 cursor-pointer ${isDroppedInContainer ? 'absolute top-0 bottom-0 left-0 right-0 m-auto' : ''}`}
        id={id}
        draggable
        onDragStart={handleDragStart}
    />)
}

export default DraggableItem;