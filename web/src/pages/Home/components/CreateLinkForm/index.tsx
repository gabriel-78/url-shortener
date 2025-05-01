import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import Logo from '../../../../assets/Logo.svg';

type Props = {};

const CreateLinkSchema = z.object({
  link: z.string().min(1, 'Campo obrigatório.'),
  shortenerLink: z.string().min(1, 'Campo obrigatório.'),
});

type CreateLinkFormSchema = z.infer<typeof CreateLinkSchema>;

const DEFAULT_VALUE_FORM: CreateLinkFormSchema = {
  link: '',
  shortenerLink: '',
};

function CreateLinkForm({ ...props }: Props) {
  const { register, handleSubmit, formState } = useForm<CreateLinkFormSchema>({
    defaultValues: DEFAULT_VALUE_FORM,
    resolver: zodResolver(CreateLinkSchema),
  });

  const onSubmit = useCallback((formData: CreateLinkFormSchema) => {
    console.log('enviou:', formData);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex sm:max-w-[23.75rem] w-full p-8 rounded-lg flex-col bg-gray-100 gap-6 h-fit items-start"
    >
      <h1 className="text-gray-600 text-lg">Novo link</h1>

      <Input
        label="link original"
        className="w-full"
        placeholder="www.exemplo.com.br"
        {...register('link')}
        error={formState.errors.link?.message}
      />

      <Input
        label="link encurtado"
        className="w-full"
        placeholder="brev.ly/"
        {...register('shortenerLink')}
        error={formState.errors.shortenerLink?.message}
      />

      <Button
        variant="primary"
        type="submit"
        disabled={!formState.isDirty}
        className="w-full justify-center"
      >
        <span>Salvar link</span>
      </Button>
    </form>
  );
}

export default CreateLinkForm;
