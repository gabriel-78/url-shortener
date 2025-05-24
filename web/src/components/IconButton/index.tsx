import clsx from 'clsx';
import { ComponentProps } from 'react';

function IconButton({ ...props }: ComponentProps<'button'>) {
  return (
    <button
      {...props}
      className={clsx(
        'flex w-fit disabled:cursor-not-allowed enabled:cursor-pointer h-fit gap-2 items-center transition-colors disabled:opacity-50 p-2 [&>svg]:size-4 rounded border border-solid border-transparent hover:border-blue-dark bg-gray-200 text-gray-500 text-sm-semibold',
        props.className,
      )}
    >
      {props.children}
    </button>
  );
}

export default IconButton;
