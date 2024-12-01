import { useEffect, useState } from 'react';

const App = () => {
    const [tasks, setTasks] = useState(getTasksFromLocalStorage);
    const [taskInput, setTaskInput] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [editTaskInput, setEditTaskInput] = useState('');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    function getTasksFromLocalStorage() {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    }

    const handleAddTask = (e) => {
        e.preventDefault();
        if (taskInput.trim() !== '') {
            setTasks([...tasks, { id: Math.random(), text: taskInput, complete: false }]);
        }
        setTaskInput('');
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const handleToggleTaskCompletion = (id) => {
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
        if (editTaskInput.trim() !== '') {
            setTasks(
                tasks.map((task) =>
                    task.id === editingTask.id ? { ...task, text: editTaskInput } : task
                )
            );
            setEditingTask(null);
        }
    };

    return (
        <div style={{ fontSize: '2rem' }}>
            <header>
                <h1>Todo app</h1>
                <p>
                    {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} to do
                </p>
            </header>
            <main>
                <form onSubmit={handleAddTask}>
                    <input
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        type='text'
                        placeholder='new task'
                    />
                    <button type='submit'>Add task</button>
                </form>
                <ol>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            {editingTask && editingTask.id === task.id ? (
                                <form onSubmit={handleSaveEditedTask}>
                                    <input
                                        value={editTaskInput}
                                        onChange={(e) => setEditTaskInput(e.target.value)}
                                        type='text'
                                        placeholder='edit task'
                                    />
                                    <button type='submit'>Save</button>
                                    <button type='button' onClick={() => setEditingTask(null)}>
                                        Cancel
                                    </button>
                                </form>
                            ) : (
                                <>
                                    <span className={task.complete ? 'isComplete' : ''}>
                                        {task.text}
                                    </span>
                                    <button onClick={() => handleToggleTaskCompletion(task.id)}>
                                        {task.complete ? 'undo' : 'done'}
                                    </button>
                                    {!task.complete && (
                                        <button onClick={() => handleStartEditing(task)}>
                                            edit
                                        </button>
                                    )}
                                    <button onClick={() => handleDeleteTask(task.id)}>
                                        delete
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ol>
            </main>
        </div>
    );
};

export default App;
