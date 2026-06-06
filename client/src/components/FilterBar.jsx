import { ListTodo, Clock, CheckCircle2 } from 'lucide-react';

const FILTERS = [
  { value: 'all',       label: 'All Tasks',  icon: ListTodo     },
  { value: 'active',    label: 'Active',     icon: Clock        },
  { value: 'completed', label: 'Completed',  icon: CheckCircle2 },
];

export default function FilterBar({ filter, onFilterChange }) {
 return (
    <div className="flex gap-2 p-1.5 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 mb-6 shadow-lg">
      {FILTERS.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${filter === value ? 'bg-white/20 text-white shadow-md border border-white/10' : 'text-neutral-400 hover:text-white hover:bg-white/10 border border-transparent'}`}
        >
          <Icon size={15} />
          {label}
        </button>
      ))}
    </div>
  );
}