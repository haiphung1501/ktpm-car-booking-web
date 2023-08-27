import { Button, Paper, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

import { updatePassword, type UpdatePasswordParams } from '@/apis/user';

type ChangePasswordForm = {
  newPassword: string;
  password: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const form = useForm<ChangePasswordForm>({
    validate: {
      confirmPassword: (value, values) =>
        !value?.length
          ? 'Bắt buộc'
          : value !== values.newPassword
          ? 'Mật khẩu xác nhận không khớp'
          : null,
      password: (value) => (!value?.length ? 'Bắt buộc' : null),
      newPassword: (value) => (!value?.length ? 'Bắt buộc' : null),
    },
  });

  const { mutate } = useMutation<unknown, unknown, UpdatePasswordParams>({
    mutationFn: (data) => updatePassword(data),
    onSuccess: () => {
      notifications.show({
        withCloseButton: true,
        color: 'green',
        title: 'Action success!',
        message: 'Change password success',
      });
    },
    onError: () => {
      notifications.show({
        withCloseButton: true,
        color: 'red',
        title: 'Action fail!',
        message: 'Wrong password. Please try again.',
      });
    },
  });

  const handleSubmit = (values: ChangePasswordForm) => {
    mutate({ oldPassword: values.password, newPassword: values.newPassword });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <div className="mb-4 text-xl font-medium">Change Password</div>
        <PasswordInput
          label="Current Password"
          placeholder="Current password"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          label="New Password"
          placeholder="New password"
          mt="md"
          {...form.getInputProps('newPassword')}
        />

        <PasswordInput
          label="Confirm New Password"
          placeholder="Confirm New password"
          mt="md"
          {...form.getInputProps('confirmPassword')}
        />

        <Button type="submit" fullWidth mt="xl" color="cyan">
          Change password
        </Button>
      </Paper>
    </form>
  );
};

export default ChangePassword;
