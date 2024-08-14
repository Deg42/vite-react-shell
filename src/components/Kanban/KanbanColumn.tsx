import React from 'react';
import { Task, Column } from './types';
import KanbanCard from './KanbanCard';

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
    <div className="kanban-column" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, column.id)}>
      <h2>{column.title}</h2>
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