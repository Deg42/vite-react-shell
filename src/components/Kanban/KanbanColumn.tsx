import React from 'react';
import KanbanCard from './KanbanCard';
import { Column, Task } from './types';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  handleDragEnd: (
    event: React.DragEvent<HTMLDivElement>,
    taskId: string,
    sourceColumnId: number,
    targetColumnId: number
  ) => void;
  removeTask: (taskId: string) => void;
  addCheck: (taskId: string, checkText: string) => void;
  toggleCheck: (taskId: string, checkId: string) => void;
  removeCheck: (taskId: string, checkId: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, tasks, handleDragEnd, removeTask, addCheck, toggleCheck, removeCheck }) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumnId: number) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumnId = parseInt(e.dataTransfer.getData('sourceColumnId'), 10);
    if (taskId && sourceColumnId !== targetColumnId) {
      handleDragEnd(e, taskId, sourceColumnId, targetColumnId);
    }
  };

  return (
    <div className="min-w-96 min-h-96 m-2.5 p-2.5 rounded-lg" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, column.id)}>
      <h1 className="text-2xl font-bold mb-5">{column.title}</h1>
      <div className="tasks">
        {tasks.map(task => (
          <KanbanCard
            key={task._id}
            task={task}
            handleDragStart={(e) => {
              e.dataTransfer.setData('taskId', task._id!);
              e.dataTransfer.setData('sourceColumnId', column.id.toString());
            }}
            removeTask={removeTask}
            toggleCheck={toggleCheck}
            addCheck={addCheck}
            removeCheck={removeCheck}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;