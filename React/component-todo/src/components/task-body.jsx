import styles from './task-body.module.css';

const TaskBody = ({ task, handleToggleCompletion, handleStartEditing, handleDeleteTask }) => {
    return (
        <>
            <span className={task.complete ? styles.isComplete : ''}>{task.text}</span>
            <button onClick={() => handleToggleCompletion(task.id)}>
                {task.complete ? 'undo' : 'done'}
            </button>
            <button onClick={() => handleStartEditing(task)}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>delete</button>
        </>
    );
};

export default TaskBody;
