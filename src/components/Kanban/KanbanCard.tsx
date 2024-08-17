import { Button, Card, Checkbox, Dropdown, Label } from 'flowbite-react';
import React from 'react';
import { HiOutlineX } from "react-icons/hi";
import { Task } from './types';


interface KanbanCardProps {
  task: Task;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  removeTask: (taskId: string) => void;
  toggleCheck: (taskId: string, checkId: string) => void;
  addCheck: (taskId: string, checkText: string) => void;
  removeCheck: (taskId: string, checkId: string) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ task, handleDragStart, removeTask, toggleCheck, addCheck, removeCheck }) => {
  const handleAddCheck = () => {
    const checkText = prompt('Enter the check label:');
    if (checkText) {
      addCheck(task._id!, checkText);
    }
  };

  const cardColor = (taskId: string) => {
    let hash = 0;
    for (let i = 0; i < taskId.length; i++) {
      hash = taskId.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convertir el número a un valor hexadecimal
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).slice(-2);
    }

    return color;
  }

  return (
    <Card
      theme={{ root: { base: "rounded-lg shadow-xl", children: "pt-2" } }}
      style={{ backgroundColor: cardColor(task._id!) }}
      className="cursor-grab active:cursor-grabbing mb-2"
      draggable
      onDragStart={handleDragStart}
      id={task._id}
    >
      <div className="p-6 mt-0 rounded-b-md bg-gray-950">
        <div className="flex justify-between mb-5">
          <h2 className="text-xl font-bold">{task.title}</h2>
          <Dropdown theme={{ arrowIcon: "h-5 w-5" }} inline label="">
            <Dropdown.Item className='text-base' onClick={handleAddCheck}>
              Añadir check
            </Dropdown.Item>
            <Dropdown.Item className='text-base text-rose-600' onClick={() => removeTask(task._id!)}>
              Eliminar
            </Dropdown.Item>
          </Dropdown>
        </div>
        {
          task.checks.map((check, index) => (
            <div key={`${task._id}-${index}`} className="flex justify-between mb-1" id={check._id}>
              <span className="flex items-center">
                <Checkbox
                  color="gray"
                  className='mr-2'
                  checked={check.done}
                  onChange={() => toggleCheck(task._id!, check._id!)}
                  id={`check-${check._id}`}
                />
                <Label htmlFor={`check-${check._id}`} className={check.done ? 'line-through text-gray-400	' : 'text-white'}>{check.label}</Label>
              </span>
              <Button color="light" pill size="xs" onClick={() => removeCheck(task._id!, check._id!)}><HiOutlineX className="h-5 w-5 stroke-rose-600" /></Button>
            </div>
          ))
        }
      </div>
    </Card >
  );
};

export default KanbanCard;
