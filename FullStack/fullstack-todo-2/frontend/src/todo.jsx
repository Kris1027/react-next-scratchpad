import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Modal } from './components/modal';

const Todo = () => {
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [editingTask, setIsEditingTask] = useState(null);
    const [editTextInput, setEditTextInput] = useState('');

    const [isAddFormShown, setIsAddFormShown] = useState(false);
    const [isEditFormShown, setIsEditFormShown] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('http://localhost:3000/api/tasks/all');
                const data = await res.json();

                if (!res.ok) throw new Error(data.error || 'Failed while fetching tasks');

                console.log(data);

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
        if (taskInput.trim() === '') return;
        const res = await fetch('http://localhost:3000/api/tasks/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: taskInput }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed while adding new task');

        setTasks((prevTasks) => ({
            ...prevTasks,
            tasks: [...prevTasks.tasks, data.task],
        }));
        toast.success(data.message);
        setTaskInput('');
        setIsAddFormShown(false);
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
        toast.success(data.message);
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
        toast.success(data.message);
    };

    const handleStartEditing = (task) => {
        setIsEditingTask(task);
        setEditTextInput(task.text);
        setIsEditFormShown(true);
    };

    const handleSaveEditedTask = async (e) => {
        e.preventDefault();
        if (!editingTask || editTextInput === '' || editTextInput === editingTask.text) return;
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
        toast.success(data.message);
    };

    return (
        <div>
            <header>
                <h1>fullstack todo</h1>
                {!isAddFormShown ? (
                    <button onClick={() => setIsAddFormShown(true)}>+</button>
                ) : (
                    <Modal setIsFormShown={setIsAddFormShown}>
                        <form className='modalContent' onSubmit={handleAddTask}>
                            <input
                                value={taskInput}
                                onChange={(e) => setTaskInput(e.target.value)}
                                type='text'
                                placeholder='new task'
                            />
                            <button type='submit' disabled={taskInput.trim() === ''}>
                                add task
                            </button>
                        </form>
                    </Modal>
                )}
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
                                    {editingTask &&
                                        editingTask.id === task.id &&
                                        isEditFormShown && (
                                            <Modal setIsFormShown={setIsEditFormShown}>
                                                <form>
                                                    <input
                                                        value={editTextInput}
                                                        onChange={(e) =>
                                                            setEditTextInput(e.target.value)
                                                        }
                                                        type='text'
                                                        placeholder='edit task'
                                                    />
                                                    <button
                                                        onClick={handleSaveEditedTask}
                                                        disabled={
                                                            editTextInput.trim() === '' ||
                                                            editTextInput === editingTask.text
                                                        }
                                                    >
                                                        save
                                                    </button>
                                                    <button onClick={() => setIsEditingTask(null)}>
                                                        cancel
                                                    </button>
                                                </form>
                                            </Modal>
                                        )}
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
                                </li>
                            ))
                        ) : (
                            <p>No tasks found</p>
                        )}
                    </ol>
                )}
            </main>
        </div>
    );
};

export default Todo;
