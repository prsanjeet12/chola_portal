import React, { useState,useRef, useEffect } from 'react';
import { Button, Drawer, Table, Space, Tag, Input , Collapse,Popover,Modal,Select,DatePicker} from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined,SearchOutlined ,FilterOutlined,MoreOutlined, DownOutlined ,CloseOutlined} from '@ant-design/icons';



import type { FilterConfirmProps } from 'antd/es/table/interface';

import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { InputRef } from 'antd';

import axios from 'axios';



// import {
//   dummyDrivers,
//   // Import other necessary data or components
// } from '../../Data/DummyDriver';


const { confirm } = Modal;

 type RiderType = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNo: string;
  verified: boolean;
  companyCode:string,
    dob: Date;
  profileImage: string;
  bloodGroup: string;
  registeredOn: Date;
  updatedOn: Date;
  // ... other properties
};

type DataIndex = keyof RiderType;
interface MoreOptionsProps {
  id: string | number; 
}


const RiderTable: React.FC = () => {
 


  const [loading, setLoading] = useState(false);
  // const [Drivers, setDrivers] = useState(riderfilter);
  const [visible, setVisible] = useState(false); // State to manage modal visibility
  const [editedUser, setEditedUser] = useState<RiderType | null>(null); 
  // const [filters, setFilters] = useState<{ [key: string]: any }>({});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [Riders, setRiders] = useState<RiderType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          console.error('Token is not found');
          return;
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('https://chola-web-app.azurewebsites.net/api/admin/get-all-rider?page=1&pageSize=4 ', config);
        console.log(response.data);
        const transformedData = response.data.map((item:any) => ({
          id: item.id,
          firstName: item.user.firstName,
          lastName: item.user.lastName,
          phoneNo: item.user.phoneNo,
          verified: null,
          city: item.user.city,
          companyCode: null,
          dob: item.user.dob,
          bloodGroup: item.user.bloodGroup,
        }));
        setRiders(transformedData);
        // Do something with transformedData, such as setting it to state
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);


    // Function to handle opening the modal and setting the edited user
    const openEditModal = (user: RiderType) => {
      setVisible(true);
      setEditedUser(user);
    };
  
    // Function to handle closing the modal
    const closeEditModal = () => {
      setVisible(false);
      setEditedUser(null);
    };
  
    // Function to handle saving the edited user data
    const saveEditedUser = () => {
      // Your logic to save the edited user data goes here
      // For simplicity, let's just close the modal for now
      closeEditModal();
    };
  
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  
  
const showDeleteConfirm = (id:string |number) => {
  confirm({
    title: 'Are you sure you want to delete this item?',
    icon: <ExclamationCircleOutlined />,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('Delete:', id); 
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

  // const onFetchMore = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     const newData = riderfilter.slice(Drivers.length, Drivers.length + 10);
  //     setDrivers((prevData) => [...prevData, ...newData]);
  //     setLoading(false);
  //   }, 1000);
  // };

  // const { tableRef } = useInfiniteScroll({
  //   data: Drivers,
  //   onFetchMore,
  //   loading,
  // });

 




 
 
 
  const MoreOptions: React.FC<{ rider: RiderType }> = ({ rider }) => (
    <Space direction="vertical">
      <Button type="text" icon={<EyeOutlined />} onClick={() => console.log('View:', rider.id)}>
        View
      </Button>
      <Button type="text" icon={<EditOutlined />} onClick={() => openEditModal(rider)}>
        Edit
      </Button>
      <Button type="text" icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(rider.id)}>
        Delete
      </Button>
    </Space>
  );
  const colums=[
    {
      title: 'Rider Id',
      dataIndex:'id',
 
      key:'id',
    
    },
    {
      title: 'FirstName',
      dataIndex: 'firstName',
     
      key: 'firstName',
    
    },
    {
      title: 'LastName',
      dataIndex: 'lastName',
 
      key: 'lastName',
      
    },
    {
      title: 'PhoneNo',
      dataIndex: 'phoneNo',
   
      key: 'phoneNo',
     
    },
    {
      title:'CompanyCode',
      dataIndex:'companyCode',
    
      key:'companyCode',
     
    },{
      title: 'Verified',
      dataIndex: 'verified',
      key: 'verified',
      render: (verified: boolean) => (
        <Tag color={verified ? 'green' : 'red'}>{verified ? 'Yes' : 'No'}</Tag>
      ),
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      key: 'dob',
      // render: (dob) => new Date(dob).toLocaleDateString(),
      // sorter:(a:RiderType,b:RiderType)=>a.id-b.id,
    },
    {
      title: 'Profile',
      dataIndex: 'profileImage',
      key: 'profileImage',
      width:100,
      // render: (profileImage) => (
      //   <img src={profileImage} alt="Profile" className="rounded-full w-10 h-10" />
      // ),
    },
    {
      title: 'Blood Group',
      dataIndex: 'bloodGroup',
      key: 'bloodGroup',
      sorter:(a:RiderType,b:RiderType)=>a.id-b.id,
    },
    // {
    //   title: 'Registered On',
    //   dataIndex: 'registeredOn',
    //   key: 'registeredOn',
    //   // render: (registeredOn) => new Date(registeredOn).toLocaleDateString(),
    //   // sorter:(a:RiderType,b:RiderType)=>a.id-b.id,
    // },
    // {
    //   title: 'Updated On',
    //   dataIndex: 'updatedOn',
    //   key: 'updatedOn',
    //   // render: (updatedOn) => new Date(updatedOn).toLocaleDateString(),
    //   // sorter:(a:RiderType,b:RiderType)=>a.id-b.id,
    // },
    // {
    //   title: 'Action',
    //   key: 'Action',
    //   width:90,
    //   render: (_, record) => (
    //     <Popover content={<MoreOptions rider={record} />} title="Actions">
    //       <button className=' text-blacky underline hover:text-purple-800  px-4 py-1 rounded-md'>More</button>
    //     </Popover>
    //   ),
    // },
  ]
  


// const dragProps = {
//   onDragEnd(fromIndex: number, toIndex: number) {
//     const updatedColumns = [...columns];
//     const item = updatedColumns.splice(fromIndex, 1)[0];
//     updatedColumns.splice(toIndex, 0, item);
//     setColumns(updatedColumns);
//   },
//   nodeSelector: 'th',
// };

 
  
  return (
    <div className='overflow-x-auto' >
 <h1 className='text-black 
      text-3xl font-bold ml-4 mt-3'>Riders</h1>
      <div className='bg-white mt-20 ml-10 mr-10'>
     
   

     
     
   {/* <ReactDragListView.DragColumn {...dragProps}> */}
     <Table<RiderType>
       columns={colums}
       dataSource={Riders}
       rowKey="id"
      
      
       size="large"
       className="font-semibold font-montserrat"
       
       // onChange={handleTableChange}
      
       loading={loading}
      
       pagination={false}  
      
     />
  
   
  
      </div>
      
    </div>
  );
                }
export default RiderTable;
