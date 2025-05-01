import { Copy, DownloadSimple, Link, Trash } from '@phosphor-icons/react';
import Button from '../../../../components/Button';
import { useState } from 'react';
import { mockLinks } from './mock';
import IconButton from '../../../../components/IconButton';

type Props = {};

export type ShortenerLink = {
  id: string;
  url: string;
  originalLink: string;
  accessQuantity: number;
};

function LinkList({}: Props) {
  const [isVisibleLinks, setIsVisibleLinks] = useState<boolean>(false);

  return (
    <section className="flex p-8 rounded-lg flex-col bg-gray-100 h-fit max-w-[36.25rem] w-full items-start gap-5 overflow-hidden sm:max-h-[24.75rem]">
      <header className="flex gap-3 justify-between items-center w-full">
        <h1 className="text-lg text-gray-600">Meus links</h1>

        <Button onClick={() => setIsVisibleLinks((prev) => !prev)} variant="secondary">
          <DownloadSimple />

          <span>Baixar CSV</span>
        </Button>
      </header>

      {!isVisibleLinks ? (
        <main className="flex [&>svg]:size-8 [&>svg]:text-gray-400 w-full border-y border-solid border-t-gray-200 border-b-transparent gap-4 p-4 pt-9 flex-col items-center justify-center">
          <Link />

          <span className="text-xs text-gray-500 whitespace-nowrap w-full text-center">
            ainda não existem links cadastrados
          </span>
        </main>
      ) : (
        <main className="flex [&>svg]:size-8 overflow-hidden [&>svg]:text-gray-400 w-full border-y border-solid border-t-gray-200 border-b-transparent gap-4 flex-col items-center justify-center">
          <ul className="flex flex-col w-full overflow-auto">
            {mockLinks.map((link) => (
              <li
                key={link.id}
                className="grid w-full grid-cols-[1fr_5.5rem_auto] gap-5 py-4 border-y border-solid border-b-gray-200 last-of-type:border-b-transparent border-t-transparent"
              >
                <div className="flex flex-col w-full overflow-hidden gap-1">
                  <strong className="text-md truncate text-blue-base">{link.url}</strong>

                  <small className="text-sm text-gray-500 truncate">{link.originalLink}</small>
                </div>

                <span className="whitespace-nowrap text-end self-center text-sm text-gray-500 truncate">{`${link.accessQuantity.toLocaleString(navigator.language, { style: 'decimal' })} acessos`}</span>

                <div className="flex items-center gap-1">
                  <IconButton>
                    <Copy />
                  </IconButton>

                  <IconButton>
                    <Trash />
                  </IconButton>
                </div>
              </li>
            ))}
          </ul>
        </main>
      )}
    </section>
  );
}

export default LinkList;
