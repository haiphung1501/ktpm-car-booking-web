import { RingProgress } from '@mantine/core';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

import { classNames } from '@/utils/classNames';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const VALUES = [
  {
    status: 'increase',
    title: 'Total Cost',
    value: '$560K',
    percent: 90,
  },
  {
    status: 'increase',
    title: 'Revenue',
    value: '$560K',
    percent: 50,
  },
  {
    status: 'decrease',
    title: 'Revenue',
    value: '$560K',
    percent: 80,
  },
  {
    title: 'Net Income',
    value: '$560K',
    percent: 70,
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-[150px] rounded-b-2xl bg-cyan-600 px-10 py-5 text-white">
        <div className="text-2xl font-bold">Welcome Ann Nullpointe!</div>
        <div className="text-base">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </div>
        <div className="mt-4 flex w-full justify-between">
          {VALUES.map((value, index) => (
            <div
              key={index}
              className="flex items-center rounded-2xl bg-white p-2 text-black shadow-md"
            >
              <RingProgress
                size={80}
                label={
                  <div className={classNames('flex items-center justify-center rounded-full')}>
                    {value.status === 'increase' ? (
                      <IconArrowUp color="green" size={30} />
                    ) : (
                      <IconArrowDown color="orange" size={30} />
                    )}
                  </div>
                }
                thickness={8}
                roundCaps
                sections={[
                  { value: value.percent, color: value.status === 'increase' ? 'green' : 'orange' },
                ]}
              />
              <div className="pr-2">
                <div className="font-medium text-gray-400">{value.title}</div>
                <div className="text-sm font-medium">{value.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full px-10 pt-16">
        <div>
          <div className="rounded-2xl bg-white p-4 pt-6">
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
            </AreaChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
