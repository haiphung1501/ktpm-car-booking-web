import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  Paper,
  rem,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';

const ForgotPassword = () => {
  return (
    <Container size={460} my={30}>
      <Title className="text-2xl font-bold" align="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput label="Your email" placeholder="me@mantine.dev" required />
        <Group position="apart" mt="lg">
          <Anchor color="dimmed" size="sm">
            <Center inline>
              <IconArrowLeft size={rem(12)} stroke={1.5} />
              <Box ml={5}>Back to the login page</Box>
            </Center>
          </Anchor>
          <Button color="cyan">Reset password</Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
