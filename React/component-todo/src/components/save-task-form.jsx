const SaveTaskForm = ({ handleSavEditedTask, editTaskInput, setEditTaskInput, setEditingTask }) => {
    return (
        <form onSubmit={handleSavEditedTask}>
            <input
                value={editTaskInput}
                onChange={(e) => setEditTaskInput(e.target.value)}
                type='text'
            />
            <button type='submit'>save</button>
            <button type='button' onClick={() => setEditingTask(null)}>
                cancel
            </button>
        </form>
    );
};

export default SaveTaskForm;
