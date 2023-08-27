import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

import { loginApi } from '@/apis/auth';
import { useUserStore } from '@/stores/user';

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const setState = useUserStore.use.setState();

  const form = useForm<LoginForm>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) =>
        !value.length ? 'Bắt buộc' : /^\S+@\S+$/.test(value) ? null : 'Email chưa hợp lệ',
      password: (value) => (!value.length ? 'Bắt buộc' : null),
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: unknown) => loginApi(data as LoginForm),
    onSuccess: (data) => {
      if (!data) throw new Error();
      setState({ user: data.user, status: 'authorized' });
      navigate('/admin');
    },
    onError: () => {
      form.setErrors({
        email: 'Email hoặc mật khẩu chưa chính xác',
        password: 'Email hoặc mật khẩu chưa chính xác',
      });
    },
  });

  const handleSubmit = (values: LoginForm) => {
    mutate(values);
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Admin website for Booking Taxi System
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <Group position="apart" mt="lg">
            <Link to="/admin/forgot-password">
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Link>
          </Group>
          <Button loading={isLoading} type="submit" fullWidth mt="xl" color="cyan">
            Đăng nhập
          </Button>
        </Paper>
      </form>
    </Container>
  );
};

export default Login;
