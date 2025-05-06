import CreateLinkForm from './components/CreateLinkForm';
import LinkList from './components/LinkList';
import Logo from '../../shared/assets/Logo.svg';

function Home() {
  return (
    <div className="flex bg-gray-200 w-full h-dvh items-center justify-center px-3 py-8 max-sm:items-start overflow-hidden">
      <section className="flex flex-col sm:gap-8 max-sm:gap-6 max-sm:items-center w-full sm:max-w-[61.75rem] max-sm:h-full">
        <figure className="flex w-fit  [&>img]:h-6 [&>img]:w-24">
          <img src={Logo} alt="Ícone do brev.ly" />
        </figure>

        <div className="flex gap-[1.75rem] max-sm:flex-col w-full overflow-hidden max-h-full">
          <CreateLinkForm />

          <LinkList />
        </div>
      </section>
    </div>
  );
}

export default Home;
