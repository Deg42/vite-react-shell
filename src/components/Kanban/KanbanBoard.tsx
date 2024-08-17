import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { HiPlusCircle } from "react-icons/hi";
import * as kanbanService from '../../services/kanbanService';
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

  const addCheck = async (taskId: string, checkText: string) => {
    try {
      const newCheck = await kanbanService.createCheck(taskId, { label: checkText, done: false });

      setTasks(prevTasks => {
        return prevTasks.map(task => {
          if (task._id === taskId) {
            const updatedChecks = [...task.checks, newCheck];
            const updatedTask = { ...task, checks: updatedChecks };
            return updatedTask;
          }
          return task;
        });
      });
    } catch (error) {
      console.error('Error adding check:', error);
    }
  };

  const removeTask = (taskId: string) => {
    const confirmed = window.confirm('¿Eliminar tarea?');

    if (!confirmed) {
      return;
    }

    setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));

    kanbanService.deleteTask(taskId)
      .catch(error => console.error('Error adding check:', error));
  };

  const toggleCheck = (taskId: string, checkId: string) => {
    let updatedTask;

    setTasks(prevTasks => {
      const newTasks = prevTasks.map(task => {
        if (task._id === taskId) {

          const updatedChecks = task.checks.map(check => {
            if (check._id === checkId) {
              return { ...check, done: !check.done };
            }
            return check;
          });

          updatedTask = { ...task, checks: updatedChecks };

          kanbanService.updateTask(taskId, updatedTask)
            .catch(error => console.error('Error toggling check:', error));

          return updatedTask;
        }
        return task;
      });

      return newTasks;
    });

    return updatedTask;
  };


  const removeCheck = (taskId: string, checkId: string) => {
    const confirmed = window.confirm('¿Eliminar check?');

    if (!confirmed) {
      return;
    }

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
      <div className="controls flex justify-normal items-center">
        {hasConnection ? <FaCheckCircle className="mr-2" size={24} color={'green'} /> : <FaTimesCircle className="mr-2" size={24} color={'red'} />}
        <Button onClick={addTask}><HiPlusCircle className="mr-2 h-5 w-5" />Añadir tarea</Button>
      </div>
      <div className="flex justify-between p-5 overflow-x-auto">
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
