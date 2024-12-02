import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];

app.get('/api/tasks/all', (req, res) => {
    try {
        if (!tasks || tasks.length === 0) {
            return res.status(200).json({ message: 'No tasks found' });
        }

        res.status(200).json({
            message: 'Tasks fetched successfully',
            tasks,
        });
    } catch (error) {
        console.error('Error in getAllTasks controller', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.post('/api/tasks/create', (req, res) => {
    try {
        const { id, text, complete } = req.body;

        if (!text || text.trim() === '') {
            return res.status(400).json({ message: 'task text cannot be empty' });
        }

        const newTask = {
            id,
            text,
            complete: Boolean(complete),
        };

        tasks = [...tasks, newTask];

        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        console.error('Error in createTask controller', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.delete('/api/tasks/:id/delete', (req, res) => {
    try {
        const id = Number(req.params.id);

        const taskExists = tasks.some((task) => task.id === id);
        if (!taskExists) return res.status(404).json({ message: 'Task not found' });

        tasks = tasks.filter((task) => task.id !== id);

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error in deleteTask controller', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.put('/api/tasks/:id/update', (req, res) => {
    try {
        const id = Number(req.params.id);
        const { updatedText } = req.body;

        const taskExists = tasks.some((task) => task.id === id);
        if (!taskExists) return res.status(404).json({ message: 'Task not found' });

        if (!updatedText || updatedText.trim() === '') {
            return res.status(400).json({ message: 'Updated text cannot be empty' });
        }

        tasks = tasks.map((task) => (task.id === id ? { ...task, text: updatedText } : task));

        const updatedTask = tasks.find((task) => task.id === id);

        return res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        console.error('Error in updateTask controller', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.put('/api/tasks/:id/complete', (req, res) => {
    try {
        const id = Number(req.params.id);

        const taskExists = tasks.some((task) => task.id === id);
        if (!taskExists) {
            return res.status(404).json({ message: 'Task not found' });
        }

        tasks = tasks.map((task) =>
            task.id === id ? { ...task, complete: !task.complete } : task
        );

        const updatedTask = tasks.find((task) => task.id === id);

        res.status(200).json({
            message: updatedTask.complete ? 'Task marked as complete' : 'Task marked as incomplete',
            task: updatedTask,
        });
    } catch (error) {
        console.error('Error in toggleCompletion controller:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.listen(PORT, (req, res) => {
    console.log(`Server started at port http://localhost:${PORT}`);
});
