import * as LabelPrimitive from '@radix-ui/react-label';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export function Label({
  className,
  children,
  required,
  ...props
}: ComponentProps<typeof LabelPrimitive.Root> & { required?: boolean }) {
  return (
    <LabelPrimitive.Root
      className={cn(
        'text-[13px] font-semibold leading-5 text-kia-black',
        className
      )}
      {...props}>
      {children}
      {required ? (
        <span className='text-kia-error' aria-hidden='true'>
          {' '}
          *
        </span>
      ) : null}
    </LabelPrimitive.Root>
  );
}
