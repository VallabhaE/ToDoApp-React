import React from 'react';
import { TaskCard } from './TaskCard';

export function Column({ 
  title, 
  tasks, 
  onDragStart, 
  onDragOver, 
  onDrop,
  onEditTask,
  onDeleteTask
}) {
  return (
    <div 
      className="bg-gray-50 p-4 rounded-lg min-w-[300px] h-full"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <h2 className="font-semibold text-lg mb-4 text-gray-700">{title}</h2>
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onDragStart={onDragStart}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}