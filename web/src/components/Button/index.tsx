import clsx from 'clsx';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<'button'> {
  variant: 'primary' | 'secondary';
}

function Button({ variant, children, ...props }: Props) {
  return (
    <button
      {...props}
      className={clsx(
        'flex w-fit h-fit gap-2 items-center transition-colors enabled:cursor-pointer ',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'p-4 [&>svg]:size-5 enabled:hover:bg-blue-dark rounded-lg bg-blue-base text-white text-md':
            variant === 'primary',
          'p-2 [&>svg]:size-4 rounded border border-solid border-transparent enabled:hover:border-blue-dark bg-gray-200 text-gray-500 text-sm-semibold':
            variant === 'secondary',
        },
        props.className,
      )}
    >
      {children}
    </button>
  );
}

export default Button;
