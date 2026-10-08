import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export function Checkbox({
  className,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-sm border border-[#c8c8c8] bg-white outline-none transition focus-visible:ring-2 focus-visible:ring-kia-navy/30 data-[state=checked]:border-kia-navy data-[state=checked]:bg-kia-navy',
        className
      )}
      {...props}>
      <CheckboxPrimitive.Indicator>
        <Check className='size-3.5 text-white' strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
