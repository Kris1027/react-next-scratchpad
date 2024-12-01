import SaveTaskForm from './save-task-form';
import TaskBody from './task-body';

const TaskListItem = ({
    task,
    editingTask,
    handleSaveEditedTask,
    editTaskInput,
    setEditTaskInput,
    setEditingTask,
    handleToggleCompletion,
    handleStartEditing,
    handleDeleteTask,
}) => {
    return (
        <li>
            {editingTask && editingTask.id === task.id ? (
                <SaveTaskForm
                    handleSaveEditedTask={handleSaveEditedTask}
                    editTaskInput={editTaskInput}
                    setEditTaskInput={setEditTaskInput}
                    setEditingTask={setEditingTask}
                />
            ) : (
                <TaskBody
                    task={task}
                    handleToggleCompletion={handleToggleCompletion}
                    handleStartEditing={handleStartEditing}
                    handleDeleteTask={handleDeleteTask}
                />
            )}
        </li>
    );
};

export default TaskListItem;
