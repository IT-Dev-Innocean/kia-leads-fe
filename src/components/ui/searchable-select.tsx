import { useEffect, useId, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

type Option = {
  id: string;
  name: string;
};

type SearchableSelectProps = {
  id: string;
  value?: string;
  options: Option[];
  placeholder: string;
  searchPlaceholder: string;
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

export function SearchableSelect({
  id,
  value,
  options,
  placeholder,
  searchPlaceholder,
  disabled = false,
  invalid = false,
  describedBy,
  onChange,
  onBlur,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const listId = useId();
  const selected = options.find((option) => option.id === value);
  const normalizedQuery = query.trim().toLocaleLowerCase('id');
  const filtered = normalizedQuery
    ? options.filter((option) =>
        option.name.toLocaleLowerCase('id').includes(normalizedQuery)
      )
    : options;

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  function choose(optionId: string) {
    onChange(optionId);
    setOpen(false);
  }

  return (
    <div
      className='relative'
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
          onBlur?.();
        }
      }}>
      <button
        id={id}
        type='button'
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup='listbox'
        onClick={() => setOpen((current) => !current)}
        className={cn(
          'flex h-11 w-full items-center justify-between gap-2 rounded-md border border-kia-line bg-white px-3 text-left text-sm text-kia-black outline-none transition focus:border-kia-navy focus:ring-2 focus:ring-kia-navy/15 disabled:cursor-not-allowed disabled:bg-[#f7f7f7] disabled:text-kia-placeholder',
          invalid && 'border-kia-error'
        )}>
        <span className={cn('truncate', !selected && 'text-kia-placeholder')}>
          {selected?.name || placeholder}
        </span>
        <ChevronDown className='size-4 shrink-0 text-kia-muted' />
      </button>

      {open ? (
        <div className='absolute z-50 mt-1 w-full overflow-hidden rounded-md border border-kia-line bg-white shadow-lg'>
          <div className='border-b border-kia-line p-2'>
            <div className='flex h-9 items-center gap-2 rounded-md border border-kia-line px-2.5'>
              <Search className='size-4 shrink-0 text-kia-placeholder' />
              <input
                autoFocus
                value={query}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                aria-controls={listId}
                className='h-full w-full bg-transparent text-sm text-kia-black outline-none placeholder:text-kia-placeholder'
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    if (filtered[0]) choose(filtered[0].id);
                  }
                  if (event.key === 'Escape') setOpen(false);
                }}
              />
            </div>
          </div>
          <ul id={listId} role='listbox' className='max-h-60 overflow-y-auto p-1'>
            {filtered.length === 0 ? (
              <li className='px-3 py-2 text-sm text-kia-muted'>Tidak ada hasil</li>
            ) : (
              filtered.map((option) => {
                const isSelected = option.id === value;
                return (
                  <li key={option.id}>
                    <button
                      type='button'
                      role='option'
                      aria-selected={isSelected}
                      onClick={() => choose(option.id)}
                      className='flex w-full items-center justify-between gap-2 rounded-sm px-3 py-2 text-left text-sm text-kia-black hover:bg-[#f6f6f6]'>
                      <span className='truncate'>{option.name}</span>
                      {isSelected ? (
                        <Check className='size-4 shrink-0 text-kia-navy' />
                      ) : null}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
