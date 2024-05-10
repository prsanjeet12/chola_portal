import React, { useState } from 'react';
import { Table, Button, Tag, Select, Input, Drawer, Form, InputNumber,Space } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Option } = Select;


// Define the type for a row of data
interface RowData {
  key: React.Key;
  name: string;
  email: string;
  role: string;
  isBanned: boolean;
  bannedReason: string;
  createdOn: string;
  updatedOn: string;
  companyCode: string;
  company: string;
}

// Sample data
const dataSource: RowData[] = [
  {
    key: '1',
    name: 'ram sharma',
    email: 'ram@example.com',
    role: "repersantive",
    isBanned: false,
    bannedReason: '',
    createdOn: '2023-01-01',
    updatedOn: '2023-01-02',
    companyCode: 'ABC123',
    company: 'ABC Inc.',
  },
  {
    key: '2',
    name: 'prsanjeet panwar',
    email: 'prsanjeet@gmail.com',
    role: "subadmin",
    isBanned: true,
    bannedReason: 'Violation of terms',
    createdOn: '2023-01-03',
    updatedOn: '2023-01-04',
    companyCode: 'DEF456',
    company: 'XYZ Corp.',
  },
  // Add more rows as needed
];

const columns = [
  {
    title:<span className='font-bold text-[14px]'>Name</span>,
    dataIndex: 'name',
    key: 'name',
   
  },
  {
    title: <span className='font-bold text-[14px]'>Email</span>,
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: <span className='font-bold text-[14px]'>Role</span>,
    dataIndex: 'role',
    key: 'role',
    render: (role:any) => {
      let color = '';
      let text = '';

      switch (role) {
        case 'superadmin':
          color = 'red';
          text = 'Super Admin';
          break;
        case 'subadmin':
          color = 'blue';
          text = 'Sub Admin';
          break;
        case 'repersantive':
          color = 'purple';
          text = 'Repersantive';
          break;
        case 'editor':
          color = 'purple';
          text = 'Editor';
          break;
        default:
          color = 'gray';
          text = 'Unknown';
      }

      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    title: <span className='font-bold text-[14px]'>Banned</span>,
    dataIndex: 'isBanned',
    key: 'isBanned',
    render: (isBanned: boolean) => (
      <Tag color={isBanned ? 'red' : 'green'}>
        {isBanned ? 'Yes' : 'No'}
      </Tag>
    ),
  },
  {
    title: <span className='font-bold text-[14px]'>Banned Reason</span>,
    dataIndex: 'bannedReason',
    key: 'bannedReason',
    width:140,
  },
  // {
  //   title: <span className='font-bold text-[14px]'>Created On</span>,
  //   dataIndex: 'createdOn',
  //   key: 'createdOn',
  // },
  {
    title: <span className='font-bold text-[14px]'>Company Code</span>,
    dataIndex: 'companyCode',
    key: 'companyCode',
  },
  {
    title: <span className='font-bold text-[14px]'>Company</span>,
    dataIndex: 'company',
    key: 'company',
  },
  {
    title: <span className='font-bold text-[14px]'>Actions</span>,
    key: 'action',
    render: (text: any, record: RowData) => (
      <Space>
        <Button onClick={() => handleView()} icon={<EyeOutlined />} />
        <Button  onClick={() => handleUpdate(record)} icon={<EditOutlined />} />
        <Button  onClick={() => handleDelete(record)} danger icon={<DeleteOutlined />} />
      </Space>
    ),
  },
];


const handleView=()=>{
  console.log("View clicked");
}
const handleUpdate = (record: RowData) => {
  console.log('Update clicked for record:', record);
}

const handleDelete = (record: RowData) => {
  console.log('Delete clicked for record:', record);
}
const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value);
  // Implement search functionality here
};
const handleAddAdmin = () => {
  // Implement logic to add a new admin
  console.log("Adding new admin...");
};

const handleAction = (record: RowData) => {
  console.log('Action clicked for record:', record);
};

export default function AdminTable() {
  const [visible, setVisible] = useState<boolean>(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="overflow-x-auto font-montserrat">
      <div className='bg-[#fffff]  mt-20 ml-10 mr-10'>
        


        <div  className="bg-white pt-6 pl-8 pb-8  " style={{ display: 'flex', gap: '10px' }}>
          {/* Dropdown for Role */}
          <Select  defaultValue="Role" style={{  height: 50, width: 320, gap: 10 }}>
          
            <Option    value="admin">Admin</Option>
            <Option value="subAdmin">Sub Admin</Option>
           
           
            {/* Add more role options here */}
          </Select>

          {/* Dropdown for Banned */}
          <Select defaultValue="Banned" style={{ height: 50, width: 320 }}>
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>

          {/* Dropdown for Active */}
          <Select defaultValue="Active" style={{ height: 50, width: 320 }}>
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </div>
        <div className="flex bg-white justify-between items-center ">
          <div className="flex xl:pl-[500px]">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search Admin"
              onChange={onSearch}
              className="border border-gray-400 rounded-md"
              style={{ width: 300, height: 50, padding: '0.5rem', marginRight: '0.5rem' }}
            />
          </div>
          <div>
            <button
          className='hover:animate-bounce font-montserrat
           px-4 py-2 mr-8 opacity-1 duration-100
            text-white rounded-lg bg-black shadow-2xl '
              onClick={showDrawer}>Add New Admin</button>
          </div>
        </div>
        {/* className='  
              mr-8
               bg-black font-semibold py-2 rounded-md
                px-4 text-white inline-block' */}
        <Table
        
          dataSource={dataSource}
          columns={columns}
    
          className='font-semibold font-montserrat'
        />
      </div>
      <Drawer
  title="Add New Admin"
  placement="right"
  width={400}
  onClose={onClose}
  visible={visible}
  destroyOnClose={true}
>
<form className="max-w-lg mx-auto mt-6 space-y-6">
  <div className="flex flex-wrap">
    {/* <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
      Full Name
    </label> */}
    <input
      id="fullName"
      type="text"
      className="      w-full h-14
      
      bg-white border-2
      border-purple-1
      placeholder-gray-800
       bg-opacity-5 rounded-lg 
        py-2 px-4  focus:outline-none
         focus:bg-white"
      placeholder="Enter full name"
    />
  </div>
  <div className="flex flex-wrap">
    {/* <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
      Username
    </label> */}
    <input
      id="username"
      type="text"
      className="      w-full h-14
      
      bg-white border-2
      border-purple-1
      placeholder-gray-800
       bg-opacity-5 rounded-lg 
        py-2 px-4  focus:outline-none
         focus:bg-white"
      placeholder="Enter username"
    />
  </div>
  <div className="flex flex-wrap">
    {/* <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
      Email
    </label> */}
    <input
      id="email"
      type="email"
      className="
      w-full h-14
      
      bg-white border-2
      border-purple-1
      placeholder-gray-800
       bg-opacity-5 rounded-lg 
        py-2 px-4  focus:outline-none
         focus:bg-white"
      placeholder="Enter email"
    />
    {/* border-2  px-2 py-3 bg-purple-1  */}
  </div>
  <div className="flex flex-wrap">
    {/* <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
      Password
    </label> */}
    <input
      id="password"
      type="password"
      className="      w-full h-14
      
      bg-white border-2
      border-purple-1
      placeholder-gray-800
       bg-opacity-5 rounded-lg 
        py-2 px-4  focus:outline-none
         focus:bg-white"
      placeholder="Enter password"
    />
  </div>
  <div className="flex flex-wrap">
    {/* <label htmlFor="company" className="block text-gray-700 text-sm font-bold mb-2">
      Company
    </label> */}
    <input
      id="company"
      type="text"
      className="      w-full h-14
      
      bg-white border-2
      border-purple-1
      placeholder-gray-800
       bg-opacity-5 rounded-lg 
        py-2 px-4  focus:outline-none
         focus:bg-white"
      placeholder="Enter company"
    />
  </div>
  
  <div className="flex flex-wrap">
    {/* <label htmlFor="district" className="block text-gray-700 text-sm font-bold mb-2">
      District
    </label> */}
    <input
      id="State"
      type="text"
      className="      w-full h-14
      
      bg-white border-2
      border-purple-1
      placeholder-gray-800
       bg-opacity-5 rounded-lg 
        py-2 px-4  focus:outline-none
         focus:bg-white"
      placeholder="Enter State"
    />
  </div>
  <div className="flex flex-wrap">
    {/* <label htmlFor="district" className="block text-gray-700 text-sm font-bold mb-2">
      District
    </label> */}
    <input
      id="district"
      type="text"
      className="      w-full h-14
      
      bg-white border-2
      border-purple-1
      placeholder-gray-800
       bg-opacity-5 rounded-lg 
        py-2 px-4  focus:outline-none
         focus:bg-white"
      placeholder="Enter district"
    />
  </div>
  <div className="flex flex-wrap">
    {/* <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2">
      Contact
    </label> */}
    <input
      id="contact"
      type="text"
      className="      w-full h-14
      
      bg-white border-2
      border-purple-1
      placeholder-gray-800
       bg-opacity-5 rounded-lg 
        py-2 px-4  focus:outline-none
         focus:bg-white"
      placeholder="Enter contact"
    />
  </div>
  <div className="flex flex-wrap">
    {/* <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
      Role
    </label> */}
   <select
  id="role"
  className=" w-full h-14
   bg-white border border-gray-600
    placeholder-gray-800
   rounded-md py-2 px-4 
   focus:outline-none
    focus:bg-white 
    appearance-none"
>
  <option className="" value="admin">
    Admin
  </option>
  <option value="subAdmin">Sub Admin</option>
</select>
  </div>
  <div className="flex flex-wrap">
    {/* <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
      Status
    </label> */}
    <select id="status" className="ant-select w-[400px] h-14 bg-white border
        border-gray-600 
        placeholder-gray-800  rounded-md py-2 px-4 focus:outline-none focus:bg-white">
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  </div>
  <div className="flex">
      <button
        type="submit"
        className="bg-black mr-12
         hover:bg-white text-[16px]
         hover:border-[3px] hover:border-black
         hover:text-black
          text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
      >
        Save
      </button>
      <button
        type="button"
        onClick={onClose}
        className="bg-white 
        border-[2px] border-yellow-300
       
         text-gray-800 font-bold py-2
          px-10 rounded focus:outline-none focus:shadow-outline"
      >
        Cancel
      </button>
    </div>
</form>
</Drawer>
    </div>
  );
}