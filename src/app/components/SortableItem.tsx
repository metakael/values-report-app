'use client';
// src/app/components/SortableItem.tsx
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ValueItem } from '../lib/values';

interface SortableItemProps {
  id: string;
  rank: number;
  value: ValueItem;
  onRemove: () => void;
}

export function SortableItem({ id, rank, value, onRemove }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center p-3 bg-white border rounded-md ${
        isDragging ? 'shadow-lg border-indigo-300' : 'shadow-sm'
      }`}
    >
      <div
        className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded-full mr-3 cursor-grab"
        {...attributes}
        {...listeners}
      >
        {rank}
      </div>
      <div className="flex-1">
        <div className="font-medium">{value.text}</div>
        <div className="text-sm text-gray-500">{value.description}</div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="text-red-600 hover:text-red-800 ml-2 p-1"
        aria-label="Remove value"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}