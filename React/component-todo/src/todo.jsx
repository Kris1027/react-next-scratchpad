import { useEffect, useState } from 'react';

import { getTasksFromLocalStorage } from './utils/get-tasks-from-local-storage';

import Container from './components/container';
import AddTaskForm from './components/add-task-form';
import TasksList from './components/tasks-list';
import TaskListItem from './components/task-list-item';
import Heading from './components/heading';

const Todo = () => {
    const [tasks, setTasks] = useState(getTasksFromLocalStorage);
    const [taskInput, setTaskInput] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [editTaskInput, setEditTaskInput] = useState('');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTasks = (e) => {
        e.preventDefault();
        if (taskInput.trim() !== '') {
            const task = {
                id: Math.random(),
                text: taskInput,
                complete: false,
            };
            setTasks([...tasks, task]);
            setTaskInput('');
        }
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const handleToggleCompletion = (id) => {
        setTasks(
            tasks.map((task) => (task.id === id ? { ...task, complete: !task.complete } : task))
        );
    };

    const handleStartEditing = (task) => {
        setEditingTask(task);
        setEditTaskInput(task.text);
    };

    const handleSaveEditedTask = (e) => {
        e.preventDefault();
        setTasks(
            tasks.map((task) =>
                task.id === editingTask.id ? { ...task, text: editTaskInput } : task
            )
        );
        setEditingTask(null);
    };

    return (
        <Container>
            <header>
                <Heading />
                <AddTaskForm
                    handleAddTasks={handleAddTasks}
                    taskInput={taskInput}
                    setTaskInput={setTaskInput}
                />
            </header>
            <main>
                <TasksList>
                    {tasks && tasks.length > 0
                        ? tasks.map((task) => (
                              <TaskListItem
                                  key={task.id}
                                  task={task}
                                  editingTask={editingTask}
                                  handleSaveEditedTask={handleSaveEditedTask}
                                  editTaskInput={editTaskInput}
                                  setEditTaskInput={setEditTaskInput}
                                  setEditingTask={setEditingTask}
                                  handleToggleCompletion={handleToggleCompletion}
                                  handleStartEditing={handleStartEditing}
                                  handleDeleteTask={handleDeleteTask}
                              />
                          ))
                        : 'No tasks, you need to add new task'}
                </TasksList>
            </main>
        </Container>
    );
};

export default Todo;
