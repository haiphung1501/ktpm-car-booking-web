import { Anchor, LoadingOverlay, ScrollArea, Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { getAllUser } from '@/apis/user';
import { useCustomerStore } from '@/stores/customer';
import { classNames } from '@/utils/classNames';

const Users = () => {
  const setCustomers = useCustomerStore.use.setCustomers();

  const { isLoading, data } = useQuery({
    queryKey: ['getAllUser'],
    queryFn: () => {
      return getAllUser({ role: 'user' }).then((res) => {
        setCustomers(res?.users || []);
        return res;
      });
    },
  });

  return (
    <ScrollArea className="mx-6 my-4">
      <Table
        className={classNames('relative  w-full', { 'min-h-[400px]': isLoading })}
        verticalSpacing="lg"
      >
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
            <th>Cars</th>
          </tr>
        </thead>
        <tbody>
          {data?.users.map((user) => (
            <tr key={user._id}>
              <td>
                <Link to={`/admin/profile/${user._id}`}>
                  <Anchor component="button" fz="sm">
                    {user._id}
                  </Anchor>
                </Link>
              </td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
              <td>{user.cars.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  );
};

export default Users;
