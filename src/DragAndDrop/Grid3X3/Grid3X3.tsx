import { useState } from 'react';
import DraggableItem from "./DraggableItem";
import GridContainer from "./GridContainer";

const Grid3X3 = () => {
    const itemContainers = ['container1', 'container2', 'container3', 'container4', 'container5', 'container6', 'container7', 'container8', 'container9'];
    const draggableItems = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9'];

    const [droppedItem, setDroppedItem] = useState<{ [key: string]: boolean }>({});

    const handleItemDrop = (itemId: string) => {
        setDroppedItem(prevState => ({
            ...prevState,
            [itemId]: true,
        }));
    }

    return (
        <main className="flex flex-col items-center mt-40">
            <section className="grid grid-cols-3 w-60 h-60 gap-2.5">
                {itemContainers.map((container, index) => (
                    <GridContainer id={container} key={index}
                        onItemDrop={handleItemDrop}
                    />
                ))}
            </section>

            <section className="grid grid-cols-5 p-1.5">
                {draggableItems.map((item, index) => (
                    <DraggableItem id={item} key={index} isDroppedInContainer={droppedItem[item] || false} />
                ))}
            </section>
        </main>
    );
}

export default Grid3X3;