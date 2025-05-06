import Error404 from '../../shared/assets/Error404.svg';

function NotFound() {
  return (
    <div className="flex bg-gray-200 w-full h-dvh items-center justify-center">
      <section className="flex px-12 py-16 rounded-lg flex-col bg-gray-100 gap-6 h-fit max-w-[36.25rem] w-full items-center mx-3">
        <figure className="flex [&>img]:w-[12.125rem] [&>img]:h-[5.3125rem]">
          <img src={Error404} alt="Imagem de página não encontrada" />
        </figure>

        <strong className="text-xl text-gray-600">Link não encontrado</strong>

        <small className="text-md text-center text-gray-500">
          O link que você está tentando acessar não existe, foi removido ou é uma URL inválida.
          Saiba mais em <strong className="text-md text-blue-base">brev.ly</strong>.
        </small>
      </section>
    </div>
  );
}

export default NotFound;
