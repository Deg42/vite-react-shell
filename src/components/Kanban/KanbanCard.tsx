import React from 'react';
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

  return (
    <div
      className="task"
      draggable
      onDragStart={handleDragStart}
    >
      <h3>{task.title}</h3>
      <button onClick={() => removeTask(task._id!)}>Eliminar Tarea</button>
      {task.checks.map((check, index) => (
        <span key={`${task._id}-${index}`} className="check">
          <input
            type="checkbox"
            checked={check.done}
            onChange={() => toggleCheck(task._id!, check._id!)}
          />
          {check.label}
          <button onClick={() => removeCheck(task._id!, check._id!)}>Remove Check</button>
        </span>
      ))}
      <button onClick={handleAddCheck}>Add Check</button>
    </div>
  );
};

export default KanbanCard;
