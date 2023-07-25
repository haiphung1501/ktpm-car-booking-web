import { type ReactNode } from 'react';
import { ActionIcon, Button, TextInput } from '@mantine/core';
import { IconBellFilled, IconSearch, IconSettings } from '@tabler/icons-react';

import { Sidebar } from './Sidebar';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full overflow-y-auto">
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <TextInput placeholder="Search" icon={<IconSearch />} />
          <Button variant="filled" color="cyan" className="ml-1 mr-auto">
            Search
          </Button>
          <ActionIcon size="lg" variant="subtle" color="yellow">
            <IconBellFilled size="1.5rem" />
          </ActionIcon>
          <ActionIcon size="lg" variant="light">
            <IconSettings size="1.125rem" />
          </ActionIcon>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
