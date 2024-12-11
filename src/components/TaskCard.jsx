import React from 'react';
import { Clock, MoreVertical, Edit2, Trash2 } from 'lucide-react';

export function TaskCard({ task, onDragStart, onEdit, onDelete }) {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow relative"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{task.title}</h3>
        <div className="relative">
          <button 
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreVertical size={16} />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button
                onClick={() => {
                  onEdit(task);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <Edit2 size={14} className="mr-2" />
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete(task.id);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center"
              >
                <Trash2 size={14} className="mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      <div className="flex items-center text-gray-400 text-xs">
        <Clock size={14} className="mr-1" />
        <span>{new Date(task.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}