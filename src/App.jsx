import React, { useState, useCallback } from 'react';
import { Column } from './components/Column';
import { SearchBar } from './components/SearchBar';
import { TaskModal } from './components/TaskModal';
import { initialTasks } from './utils/initialData';
import { Plus } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'peer-review', title: 'Peer Review' },
    { id: 'done', title: 'Done' }
  ];

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = useCallback((columnId) => {
    if (!draggedTaskId) return;

    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === draggedTaskId 
          ? { ...task, status: columnId }
          : task
      )
    );
    setDraggedTaskId(null);
  }, [draggedTaskId]);

  const handleCreateTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      createdAt: new Date()
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleUpdateTask = (taskData) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === editingTask.id
          ? { ...task, ...taskData }
          : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      handleUpdateTask(taskData);
    } else {
      handleCreateTask(taskData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getColumnTasks = (columnId) =>
    filteredTasks.filter(task => task.status === columnId);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Kanban Board</h1>
          <div className="flex gap-4 items-center">
            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map(column => (
            <Column
              key={column.id}
              title={column.title}
              tasks={getColumnTasks(column.id)}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>

        <TaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
          task={editingTask}
        />
      </div>
    </div>
  );
}

export default App;