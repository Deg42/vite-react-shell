import { useState } from 'react';
import DraggableItem from "./DraggableItem";
import GridContainer from "./GridContainer";
import { Button } from 'flowbite-react';
import { HiRefresh } from 'react-icons/hi';

const Grid3X3 = () => {
    const itemContainers = ['container1', 'container2', 'container3', 'container4', 'container5', 'container6', 'container7', 'container8', 'container9'];
    const draggableItems = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9'];

    const [droppedItem, setDroppedItem] = useState<{ [key: string]: boolean }>({});
    const [resetKey, setResetKey] = useState(0);

    const handleItemDrop = (itemId: string) => {
        setDroppedItem(prevState => ({
            ...prevState,
            [itemId]: true,
        }));
    }

    const resetState = () => {
        setDroppedItem({});
        setResetKey(prevKey => prevKey + 1);
    };

    return (
        <main className="flex flex-col items-center mt-40" key={resetKey}>
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
            <Button gradientMonochrome="cyan" className="mt-3" onClick={resetState}>Reset <HiRefresh className="ml-2 h-5 w-5" /></Button>
        </main>
    );
}

export default Grid3X3;