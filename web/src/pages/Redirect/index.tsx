import LogoIcon from '../../shared/assets/Logo_Icon.svg';

function Redirect() {
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
            Não foi redirecionado? <strong className="text-md text-blue-base">Acesse aqui</strong>.
          </small>
        </div>
      </section>
    </div>
  );
}

export default Redirect;
