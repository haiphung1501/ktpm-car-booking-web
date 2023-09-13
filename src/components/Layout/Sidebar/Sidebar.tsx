import { Group, Navbar, ScrollArea, Text } from '@mantine/core';
import { IconGauge, IconNotes, IconReceipt, IconUser } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { logoutApi } from '@/apis/auth';
import { logout, useUserStore } from '@/stores/user';
import { LinksGroup } from '../LinksGroup';
import { UserButton } from '../UserButton';

const mockdata = [
  { label: 'Dashboard', icon: IconGauge, link: '/admin' },
  {
    label: 'Manage',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Users', link: '/admin/users' },
      { label: 'Drivers', link: '/admin/drivers' },
      { label: 'Orders', link: '/admin/orders' },
    ],
  },
  { label: 'Account', icon: IconUser, link: '/admin/account' },
  { label: 'Support Booking', icon: IconReceipt, link: '/admin/support-booking' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);
  const user = useUserStore.use.user();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      logout();
      navigate('/admin/login');
    },
    onError: () => null,
  });

  const handleLogout = () => {
    mutate();
  };

  return (
    <Navbar height={800} width={{ sm: 300 }} p="md">
      <Navbar.Section className="mb-4 border-b pb-4">
        <Group position="apart">
          <Text weight={700} size="lg">
            ADMIN SYSTEM
          </Text>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow component={ScrollArea}>
        <div>{links}</div>
      </Navbar.Section>

      {user && (
        <Navbar.Section onClick={handleLogout} className="border-t pt-2">
          <UserButton
            loading={isLoading}
            image={user.avatar.url}
            name={user.role}
            email={user.email}
          />
        </Navbar.Section>
      )}
    </Navbar>
  );
};

export default Sidebar;
