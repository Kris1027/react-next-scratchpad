const AddTaskForm = ({ handleAddTasks, taskInput, setTaskInput }) => {
    return (
        <form onSubmit={handleAddTasks}>
            <input
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                type='text'
                placeholder='new task'
            />
            <button type='submit'>Add task</button>
        </form>
    );
};

export default AddTaskForm;
