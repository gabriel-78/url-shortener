import { Toaster } from 'sonner';

function CustomToaster() {
  return (
    <Toaster
      position="bottom-right"
      theme="light"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: 'flex rounded shadow-2xl rounded-xl items-center gap-3 px-5 py-4',
          success: 'bg-green-50 text-green-500',
          error: 'bg-red-50 text-red-500',
          info: 'bg-blue-50 text-blue-500',
          warning: 'bg-yellow-50 text-yellow-500',
          title: 'text-md',
          description: 'text-sm',
          actionButton: 'bg-gray-200 text-black',
          cancelButton: 'bg-gray-400 text-white',
          closeButton: 'bg-gray-600 text-white',
        },
      }}
    />
  );
}

export default CustomToaster;
