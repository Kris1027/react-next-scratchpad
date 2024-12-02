import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

let tasks = [];

app.post('/api/tasks/create', (req, res) => {
    try {
        const { text } = req.body;
        if (!text || text.trim() === '') {
            return res.status(200).json({ message: 'Task input cannot be empty' });
        }

        const newTask = {
            id: Math.round(Math.random() * 100000),
            text: text,
            complete: false,
        };

        tasks.push(newTask);

        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        console.error('Error in createTask controller', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.get('/api/tasks/all', (req, res) => {
    try {
        res.status(200).json({
            message: tasks.length > 0 ? 'Tasks fetched successfully' : 'No tasks found',
            tasks,
        });
    } catch (error) {
        console.error('Error in getAllTasks controller', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.delete('/api/tasks/:id/delete', (req, res) => {
    try {
        const id = Number(req.params.id);

        const taskExist = tasks.some((task) => task.id === id);
        if (!taskExist) return res.status(404).json({ message: 'Task not found' });

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
        const { textInput } = req.body;

        if (!textInput || textInput.trim() === '') {
            return res.status(400).json({ message: 'Task cannot be empty' });
        }

        const task = tasks.find((task) => task.id === id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        tasks = tasks.map((task) => (task.id === id ? { ...task, text: textInput } : task));

        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        console.error('Error in updateTask controller', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.patch('/api/tasks/:id/complete', (req, res) => {
    try {
        const id = Number(req.params.id);

        const task = tasks.find((task) => task.id === id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        tasks = tasks.map((task) =>
            task.id === id ? { ...task, complete: !task.complete } : task
        );

        const updatedTask = tasks.find((task) => task.id === id);

        return res.status(200).json({
            message: updatedTask.complete ? 'Task marked as complete' : 'Task marked as uncomplete',
            task: updatedTask,
        });
    } catch (error) {
        console.error('Error in toggleComplete controller', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.listen(PORT, (req, res) => {
    console.log(`Server starts at http://localhost:${PORT}`);
});
