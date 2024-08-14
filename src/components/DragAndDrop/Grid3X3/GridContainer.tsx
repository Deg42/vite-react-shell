interface GridContainerProps {
    id: string;
    className?: string,
    onItemDrop: (id: string, targetId: string) => void;
}

const GridContainer: React.FC<GridContainerProps> = ({ id, className, onItemDrop }) => {

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const draggedElementId = event.dataTransfer.getData('id');
        (event.target as HTMLDivElement).appendChild(document.getElementById(draggedElementId)!);
        onItemDrop(draggedElementId, id);
    };

    return (
        <div
            id={id}
            className={className + " relative"}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        />)
}

export default GridContainer;