import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import * as kanbanService from '../../services/kanbanService';
import './Kanban.css';
import KanbanColumn from './KanbanColumn';
import { Column, Task } from './types';


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

if (!BACKEND_URL) {
  throw new Error('VITE_BACKEND_URL is not defined');
}

const initialColumns: Column[] = [
  { id: 0, title: 'To Do' },
  { id: 1, title: 'In Progress' },
  { id: 2, title: 'Done' },
];

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hasConnection, setHasConnection] = useState<boolean>(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragEnd = (
    event: React.DragEvent<HTMLDivElement>,
    taskId: string,
    sourceColumnId: number,
    targetColumnId: number
  ) => {
    event.preventDefault();

    if (sourceColumnId === targetColumnId) {
      return;
    }

    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task._id === taskId) {
          const updatedTask = { ...task, status: targetColumnId };

          kanbanService.updateTask(taskId, updatedTask)
            .catch(error => console.error('Error adding check:', error));

          return updatedTask;
        }
        return task;
      });
    });
  };

  const fetchTasks = () => {
    kanbanService.fetchTasks().then(response => {
      setTasks(response);
      setHasConnection(true)
    }).catch(error => console.error('Error fetching tasks:', error));
    setHasConnection(false)
  };

  const addTask = () => {
    const taskTitle = prompt('Enter the title of the new task:');
    if (!taskTitle || taskTitle.trim() === '') {
      return;
    }

    kanbanService.addTask(taskTitle)
      .then(response => {
        setTasks(prevTasks => [...prevTasks, response]);
      })
      .catch(error => console.error('Error adding task:', error));
  };

  const addCheck = (taskId: string, checkText: string) => {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task._id === taskId) {
          const updatedChecks = [...task.checks, { label: checkText, done: false }];

          const updatedTask = { ...task, checks: updatedChecks };

          kanbanService.updateTask(taskId, updatedTask)
            .catch(error => console.error('Error adding check:', error));

          return updatedTask;
        }
        return task;
      });
    });
  };

  const removeTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));

    kanbanService.deleteTask(taskId)
      .catch(error => console.error('Error adding check:', error));
  };

  const toggleCheck = (taskId: string, checkId: string) => {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task._id === taskId) {
          const updatedChecks = task.checks.map(check => {
            if (check._id === checkId) {
              return { ...check, done: !check.done };
            }
            return check;
          });

          const updatedTask = { ...task, checks: updatedChecks };

          kanbanService.updateTask(taskId, updatedTask)
            .catch(error => console.error('Error adding check:', error));


          return updatedTask;
        }
        return task;
      });
    });
  };

  const removeCheck = (taskId: string, checkId: string) => {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task._id === taskId) {
          const updatedChecks = task.checks.filter(check => check._id !== checkId);
          const updatedTask = { ...task, checks: updatedChecks };

          kanbanService.updateTask(taskId, updatedTask)
            .catch(error => console.error('Error adding check:', error));

          return updatedTask;
        }
        return task;
      });
    });
  };

  return (
    <main className="flex flex-col">
      <div className="controls">
        {hasConnection ? <FaCheckCircle /> : <FaTimesCircle />}
        <button onClick={addTask}>Añadir tarea</button>
      </div>
      <div className="kanban-board">
        {initialColumns.map(column => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasks.filter(task => task.status === column.id)}
            handleDragEnd={handleDragEnd}
            removeTask={removeTask}
            addCheck={addCheck}
            toggleCheck={toggleCheck}
            removeCheck={removeCheck}
          />
        ))}
      </div>
    </main>
  );
};

export default KanbanBoard;
