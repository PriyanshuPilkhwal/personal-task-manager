import { ListTodo, Clock, CheckCircle2 } from 'lucide-react';

const FILTERS = [
  { value: 'all',       label: 'All Tasks',  icon: ListTodo     },
  { value: 'active',    label: 'Active',     icon: Clock        },
  { value: 'completed', label: 'Completed',  icon: CheckCircle2 },
];

export default function FilterBar({ filter, onFilterChange }) {
  return (
    <div className="flex gap-2 mb-6">
      {FILTERS.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                      transition-colors
                      ${filter === value
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
        >
          <Icon size={15} />
          {label}
        </button>
      ))}
    </div>
  );
}