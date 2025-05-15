import { Copy, DownloadSimple, Link as LinkIcon, Spinner, Trash } from '@phosphor-icons/react';
import Button from '../../../../components/Button';
import { MouseEvent } from 'react';
import IconButton from '../../../../components/IconButton';
import { useManageLinksContext } from '../../context/ManageLinksContext/ManageLinksContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { deleteLink } from '../../../../services/links/deleteLink';
import { getCSVLinks } from '../../../../services/links/getCSVLinks';
import downloadFiles from '../../../../shared/utils/downloadFiles';

type Props = {};

export type ShortenerLink = {
  id: string;
  url: string;
  originalLink: string;
  accessQuantity: number;
};

function LinkList({}: Props) {
  const { links, isLoading, removeLink } = useManageLinksContext();
  const navigate = useNavigate();

  async function onDeleteLink(event: MouseEvent<HTMLButtonElement>) {
    const { value, name } = event.currentTarget;

    const deleteConfirmed = window.confirm(`Tem certeza que deseja excluir: ${name}?`);

    if (deleteConfirmed) {
      const result = await deleteLink(value);

      if (result.isSuccess) {
        removeLink(value);

        toast.success('Link apagado com sucesso', {
          description: `O link ${name} foi apagado.`,
        });
      } else {
        toast.error(result.error);
      }
    }
  }

  async function onDownloadCSV() {
    const result = await getCSVLinks();

    if (result.isSuccess) {
      const value = result.getValue();

      downloadFiles([{ name: 'Lista_de_links', url: value.fileUrl }]);
    } else {
      toast.error(result.error);
    }
  }

  async function copyToClipboard(name: string, url: string) {
    try {
      await navigator.clipboard.writeText(url);
      toast.info('Link copiado com sucesso', {
        description: `O link ${name} foi copiado para a área de transferência`,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <section className="flex p-8 rounded-lg flex-col bg-gray-100 h-fit max-w-[36.25rem] w-full items-start gap-5 overflow-hidden sm:max-h-[24.75rem]">
      <header className="flex gap-3 justify-between items-center w-full">
        <h1 className="text-lg text-gray-600 ">Meus links</h1>

        <Button onClick={onDownloadCSV} type="button" variant="secondary">
          <DownloadSimple />

          <span>Baixar CSV</span>
        </Button>
      </header>

      {links.length === 0 || isLoading ? (
        <main className="flex [&>svg]:size-8 [&>svg]:text-gray-400 w-full border-y border-solid border-t-gray-200 border-b-transparent gap-4 p-4 pt-9 flex-col items-center justify-center">
          {isLoading ? (
            <>
              <Spinner className="animate-spin" />

              <span className="text-xs text-gray-500 whitespace-nowrap w-full text-center">
                Carregando links ...
              </span>
            </>
          ) : (
            <>
              <LinkIcon />

              <span className="text-xs text-gray-500 whitespace-nowrap w-full text-center">
                ainda não existem links cadastrados
              </span>
            </>
          )}
        </main>
      ) : (
        <main className="flex [&>svg]:size-8 overflow-hidden [&>svg]:text-gray-400 w-full border-y border-solid border-t-gray-200 border-b-transparent gap-4 flex-col items-center justify-center">
          <ul className="flex flex-col w-full overflow-auto">
            {links.map((link) => (
              <li
                key={link.id}
                className="grid w-full grid-cols-[1fr_5.5rem_auto] gap-5 py-4 border-y border-solid border-b-gray-200 last-of-type:border-b-transparent border-t-transparent"
              >
                <div className="flex flex-col w-full overflow-hidden gap-1">
                  <strong
                    className="text-md truncate text-blue-base cursor-pointer"
                    onClick={() => navigate(`/links/${link.id}`)}
                  >
                    {link.shortenerlUrl}
                  </strong>

                  <small className="text-sm text-gray-500 truncate">{link.originalUrl}</small>
                </div>

                <span className="whitespace-nowrap text-end self-center text-sm text-gray-500 truncate">{`${link.accessQuantity.toLocaleString(navigator.language, { style: 'decimal' })} acessos`}</span>

                <div className="flex items-center gap-1">
                  <IconButton
                    onClick={() =>
                      copyToClipboard(link.shortenerlUrl, `${window.location.href}links/${link.id}`)
                    }
                  >
                    <Copy />
                  </IconButton>

                  <IconButton value={link.id} name={link.shortenerlUrl} onClick={onDeleteLink}>
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
