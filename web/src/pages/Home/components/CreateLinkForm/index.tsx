import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useManageLinksContext } from '../../context/ManageLinksContext/ManageLinksContext';
import { createLink } from '../../../../services/links/createLink';
import { toast } from 'sonner';

type Props = {};

const CreateLinkSchema = z.object({
  link: z.string().min(1, 'Campo obrigatório.').url('Informe uma url válida'),
  shortenerLink: z
    .string()
    .min(1, 'Campo obrigatório.')
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: 'O link encurtado deve conter apenas letras, números, hífen ou underscore',
    }),
});

type CreateLinkFormSchema = z.infer<typeof CreateLinkSchema>;

const DEFAULT_VALUE_FORM: CreateLinkFormSchema = {
  link: '',
  shortenerLink: '',
};

function CreateLinkForm({ ...props }: Props) {
  const { register, handleSubmit, formState, reset } = useForm<CreateLinkFormSchema>({
    defaultValues: DEFAULT_VALUE_FORM,
    resolver: zodResolver(CreateLinkSchema),
  });

  const { addLink } = useManageLinksContext();

  const onSubmit = useCallback(
    async (formData: CreateLinkFormSchema) => {
      const result = await createLink({
        originalUrl: formData.link,
        shortenerUrl: formData.shortenerLink,
      });

      if (result.isSuccess) {
        const value = result.getValue();

        addLink({
          accessQuantity: value.accessQuantity,
          id: value.id,
          originalUrl: value.url,
          shortenerlUrl: value.abreviatedUrl,
        });

        reset();
      } else {
        toast.error(result.error);
      }
    },
    [addLink],
  );

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
        disabled={formState.isSubmitting}
      />

      <Input
        label="link encurtado"
        className="w-full"
        placeholder="brev.ly/"
        {...register('shortenerLink')}
        error={formState.errors.shortenerLink?.message}
        disabled={formState.isSubmitting}
      />

      <Button
        variant="primary"
        type="submit"
        disabled={!formState.isDirty || formState.isSubmitting}
        className="w-full justify-center"
      >
        <span>Salvar link</span>
      </Button>
    </form>
  );
}

export default CreateLinkForm;
