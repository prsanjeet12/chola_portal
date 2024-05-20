import React from 'react';
import { Table, Button } from 'antd';

const columns = [
  {
    title: 'Notifi... ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Notification Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    key: 'timestamp',
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content',
    render: (text: string) => (
      <span className="whitespace-nowrap overflow-hidden overflow-ellipsis w-40 block">
        {text}
      </span>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: ' Source',
    dataIndex: 'source',
    key: 'source',
  },
  // New columns for Company Code and Created By
  {
    title: 'Company Code',
    dataIndex: 'companyCode',
    key: 'companyCode',
  },
  {
    title: 'Created By',
    dataIndex: 'createdBy',
    key: 'createdBy',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: any, record: any) => (
      <Button type="primary" onClick={() => handleAction(record)}>Action</Button>
    ),
  },
];

const data = [
  {
    id: '001',
    type: 'Onboarding',
    timestamp: '2024-05-12 09:30',
    content: 'Welcome to our app! Your journey begins now.',
    status: true,
    source: 'User action',
    companyCode: 'XYZ123',
    createdBy: 'John Doe',
  },
  {
    id: '002',
    type: 'Ride Booking',
    timestamp: '2024-05-12 10:15',
    content: 'Your ride is on the way. Please be ready.',
    status: false,
    source: 'System event',
    companyCode: 'ABC456',
    createdBy: 'Jane Smith',
  },
  // Add more data as needed
];

const handleAction = (record: any) => {
  // Handle action logic here, for example, display a modal or perform an action.
  console.log('Action clicked for:', record);
};

const NotificationTable: React.FC = () => {
  return (
    <div className='font-montserrat '>
      <div className='mt-20 mr-10 ml-10 font-semibold'>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          className="w-full"
        />
      </div>
    </div>
  );
};

export default NotificationTable;
