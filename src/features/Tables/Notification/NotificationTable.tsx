// NotificationTable.tsx
import React, { useState } from 'react';
import { Table,Modal } from 'antd';
import NewNotificationForm from './NotificationForm';

interface Notification {
  id: string;
  title: string;
  body: string;
  to: string;
  timestamp: string;
  status: string;
  createdBy: string;
}

interface Props {
  notifications: Notification[];
}

const NotificationTable: React.FC<Props> = ({ notifications }) => {

    const [isModalVisible, setIsModalVisible]=useState(false)

    const handleCreateNotification = () => {
        setIsModalVisible(true);
      };
    
      const handleCloseModal = () => {
        setIsModalVisible(false);
      };
    
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
    },
    {
        title: 'Created By',
        dataIndex: 'createdBy',
        key: 'createdBy',
      },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
   
  ];
  const data =[
    {
      id: '1',
      title: 'New Message',
      body: 'You have a new message from John Doe',
      to: 'drivers',
      timestamp: '2024-05-10 09:30:00',
      status: 'Active',
      createdBy: 'Prsanjeet',
    },
    {
      id: '2',
      title: 'Reminder',
      body: 'Don\'t forget to  get coupon',
      to: 'Riders',
      timestamp: '2024-05-11 14:00:00',
      status: 'Active',
      createdBy: 'Nikil',
    },
  ]

  return (
  
  <div
  className='overflow-x-auto'
  
  >
<div className='bg-[#fffff]  mt-20 ml-10 mr-10'>
<div className="flex justify-end bg-white">
    <button className="mr-8 bg-gray-950
           text-white px-4 py-2 rounded-lg 
           mt-6 hover:scale-105 transition 
          duration-300 ease-in-out hover:bg-purple-400" onClick={ handleCreateNotification}>
        Create New Notification
    </button>
</div>
<Table
  rowClassName={`text-[#2e2633] text-[14px]`}
  pagination={false}
dataSource={data}
className='font-semibold font-poppins'
columns={columns} />
<Modal
 title="Send New Custom Notification"
 visible={isModalVisible}
 onCancel={handleCloseModal}
 footer={null}

>
<NewNotificationForm visible={isModalVisible} onClose={handleCloseModal} />
</Modal>
</div>
  </div>


)
};

export default NotificationTable;
