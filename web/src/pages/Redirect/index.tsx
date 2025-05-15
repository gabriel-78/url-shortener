import { useParams } from 'react-router-dom';
import LogoIcon from '../../shared/assets/Logo_Icon.svg';
import { useEffect, useState } from 'react';
import { Link } from '../../services/links/link';
import { parseGetLinkResponseToLink } from '../Home/utils/parseGetLinkResponseToLink';
import { accessLink } from '../../services/links/accessLink';

function Redirect() {
  const { linkId } = useParams<{ linkId: string }>();
  const [link, setLink] = useState<Link | null>(null);

  async function fetchAccessLink() {
    const result = await accessLink(linkId ?? '');

    if (result.isSuccess) {
      const value = parseGetLinkResponseToLink(result.getValue());

      setLink(value);
      window.open(value.originalUrl, '_self');
    }
  }

  useEffect(() => {
    fetchAccessLink();
  }, []);

  return (
    <div className="flex bg-gray-200 w-full h-dvh items-center justify-center">
      <section className="flex px-12 py-16 rounded-lg flex-col bg-gray-100 gap-6 h-fit max-w-[36.25rem] w-full items-center mx-3">
        <figure className="flex [&>img]:size-12">
          <img src={LogoIcon} alt="Ícone do brev.ly" />
        </figure>

        <strong className="text-xl text-gray-600">Redirecionando...</strong>

        <div className="flex flex-col gap-1">
          <small className="text-md text-center text-gray-500">
            O link será aberto automaticamente em alguns instantes.
          </small>

          <small className="text-md text-center text-gray-500">
            Não foi redirecionado?{' '}
            <a
              href={link?.originalUrl ?? ''}
              rel="noopener noreferrer"
              target="_blank"
              className="text-md text-blue-base"
            >
              Acesse aqui
            </a>
            .
          </small>
        </div>
      </section>
    </div>
  );
}

export default Redirect;
