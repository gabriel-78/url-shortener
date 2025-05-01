import { Warning } from '@phosphor-icons/react';
import clsx from 'clsx';
import { ComponentProps, useState } from 'react';

type Props = ComponentProps<'input'> & { label: string; error?: string };

type ExtractedClasses = {
  widthClasses: string;
  rest: string;
};

function extractWidthClasses(className: string = ''): ExtractedClasses {
  // Regex para pegar qualquer classe w-* incluindo valores entre colchetes
  const widthRegex = /\bw-([^\s]+)/g;

  const widthMatches = [...className.matchAll(widthRegex)].map((m) => m[0]);

  let widthClasses = widthMatches.join(' ');

  if (widthClasses.length > 0) {
    const x = ['min-', widthClasses].join('');

    widthClasses = [widthClasses, x].join(' ');
  }

  const rest = className
    .split(' ')
    .filter((cls) => !widthMatches.includes(cls))
    .join(' ');

  return { widthClasses, rest };
}

function Input({ label, error, className, ...props }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const { widthClasses, rest } = extractWidthClasses(className);

  return (
    <div className={clsx('flex flex-col gap-2', widthClasses)}>
      <label
        data-focus={isFocused}
        className={clsx(
          'flex w-fit text-xs transition-all',
          error
            ? 'text-danger font-bold'
            : 'text-gray-500 data-[focus=true]:text-blue-base data-[focus=true]:font-bold',
        )}
      >
        {label}
      </label>

      <input
        onFocus={(e) => {
          setIsFocused(true);
          if (props.onFocus) props.onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          if (props.onBlur) props.onBlur(e);
        }}
        className={clsx(
          'w-full min-w-0',
          ' outline-none transition-all text-gray-600 rounded-lg px-4 py-[15px] h-fit flex',
          'border border-solid ',
          'disabled:opacity-50',
          'placeholder:text-gray-400',
          error
            ? 'border-danger border-2'
            : 'border-gray-300 focus:border-blue-base focus:border-2',
          rest,
        )}
        {...props}
      />

      {error && (
        <div className="flex w-full gap-2 [&>svg]:size-4">
          <Warning className="text-danger" />

          <span className="text-gray-500 text-sm">{error}</span>
        </div>
      )}
    </div>
  );
}

export default Input;
