import { useEffect, useState } from 'react';

const Todo = () => {
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [tasks, setTasks] = useState([]);
    const [textInput, setTextInput] = useState('');
    const [editingTask, setIsEditingTask] = useState(null);
    const [editTextInput, setEditTextInput] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('http://localhost:3000/api/tasks/all');
                const data = await res.json();

                if (!res.ok) throw new Error(data.error || 'Failed while fetching tasks');

                setTasks(data);
                setIsError(null);
            } catch (error) {
                setIsError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (textInput.trim() === '') return;
        const res = await fetch('http://localhost:3000/api/tasks/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textInput }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed while adding new task');

        setTasks((prevTasks) => ({
            ...prevTasks,
            tasks: [...prevTasks.tasks, data.task],
        }));
        setTextInput('');
    };

    const handleToggleComplete = async (id) => {
        const res = await fetch(`http://localhost:3000/api/tasks/${id}/complete`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to toggle task status');

        setTasks((prevTasks) => ({
            ...prevTasks,
            tasks: prevTasks.tasks.map((task) =>
                task.id === id ? { ...task, complete: !task.complete } : task
            ),
        }));
    };

    const handleDeleteTask = async (id) => {
        const res = await fetch(`http://localhost:3000/api/tasks/${id}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Deleting task failed');

        setTasks((prevTasks) => ({
            ...prevTasks,
            tasks: prevTasks.tasks.filter((task) => task.id !== id),
        }));
    };

    const handleStartEditing = (task) => {
        setIsEditingTask(task);
        setEditTextInput(task.text);
    };

    const handleSaveEditedTask = async (e) => {
        e.preventDefault();
        if (!editingTask || editTextInput === '') return;
        const res = await fetch(`http://localhost:3000/api/tasks/${editingTask.id}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ textInput: editTextInput }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update task');

        setTasks((prevTasks) => ({
            ...prevTasks,
            tasks: prevTasks.tasks.map((task) =>
                task.id === editingTask.id ? { ...task, text: editTextInput } : task
            ),
        }));
        setIsEditingTask(null);
        setEditTextInput('');
    };

    return (
        <div>
            <header>
                <h1>fullstack todo</h1>
                <form onSubmit={handleAddTask}>
                    <input
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        type='text'
                        placeholder='new task'
                    />
                    <button type='submit'>add task</button>
                </form>
            </header>
            <main>
                {isLoading ? (
                    <p>Loading...</p>
                ) : isError ? (
                    <p>Error: {isError}</p>
                ) : (
                    <ol>
                        {tasks && tasks.tasks.length > 0 ? (
                            tasks.tasks.map((task) => (
                                <li key={task.id}>
                                    {editingTask && editingTask.id === task.id ? (
                                        <form>
                                            <input
                                                value={editTextInput}
                                                onChange={(e) => setEditTextInput(e.target.value)}
                                                type='text'
                                                placeholder='edit task'
                                            />
                                            <button onClick={handleSaveEditedTask}>save</button>
                                            <button onClick={() => setIsEditingTask(null)}>
                                                cancel
                                            </button>
                                        </form>
                                    ) : (
                                        <>
                                            <span className={task.complete ? 'isComplete' : ''}>
                                                {task.text}
                                            </span>
                                            <button onClick={() => handleToggleComplete(task.id)}>
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
                            ))
                        ) : (
                            <p>{tasks.message}</p>
                        )}
                    </ol>
                )}
            </main>
        </div>
    );
};

export default Todo;
