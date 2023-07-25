import { Avatar, createStyles, Group, LoadingOverlay, Text, UnstyledButton } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
}));

type UserButtonProps = {
  image: string;
  name: string;
  email: string;
  loading?: boolean;
};

const UserButton = ({ image, name, email, loading = false }: UserButtonProps) => {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.user}>
      <Group className="relative">
        <LoadingOverlay visible={loading} overlayBlur={2} />
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="cyan" size="xs">
            {email}
          </Text>
        </div>

        <IconLogout size="0.9rem" stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
};

export default UserButton;
