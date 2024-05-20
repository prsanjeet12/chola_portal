import React, { useState, useRef, useEffect } from 'react';
import { Button, Table, Space, Tag, Modal, Drawer ,Descriptions} from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';


const { confirm } = Modal;

type RiderType = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNo: string;
  email: string;
  city: string;
  country: string;
  companyCode: string;
  dob: Date;
  gender: string;
  profileImage: string;
  bloodGroup: string;
  registeredOn: Date;
};

type DataIndex = keyof RiderType;

const RiderTable: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false); // State to manage modal visibility
  const [editedUser, setEditedUser] = useState<RiderType | null>(null); 
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRider, setSelectedRider] = useState<RiderType | null>(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
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
        const response = await axios.get('https://chola-web-app.azurewebsites.net/api/admin/get-all-rider?page=1&pageSize=4', config);
        console.table(response.data);
        const transformedData = response.data.map((item: any) => ({
          id: item.id,
          firstName: item.user.firstName,
          lastName: item.user.lastName,
          phoneNo: item.user.phoneNo,
          email: item.user.email,
          profileImage: item.user.profileImage,
          gender: item.user.gender,
          country: item.user.country,
          verified: null,
          city: item.user.city,
          companyCode: null,
          dob: item.user.dob,
          bloodGroup: item.user.bloodGroup,
        }));
        setRiders(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const showDeleteConfirm = (id: string | number) => {
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

  const handleDrawerOpen = (rider: RiderType) => {
    setSelectedRider(rider);
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    setSelectedRider(null);
  };

  const columns = [
    { title: 'Rider Id', dataIndex: 'id', key: 'id' },
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Phone No', dataIndex: 'phoneNo', key: 'phoneNo' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Company Code', dataIndex: 'companyCode', key: 'companyCode' },
    {
      title: 'Verified',
      dataIndex: 'verified',
      key: 'verified',
      render: (verified: boolean) => (
        <Tag color={verified ? 'green' : 'red'}>{verified ? 'Yes' : 'No'}</Tag>
      ),
    },

    {
      title: 'Profile',
      dataIndex: 'profileImage',
      key: 'profileImage',
     
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: RiderType) => (
        <Space size="middle">
          <Button type="text" icon={<EyeOutlined />} onClick={() => handleDrawerOpen(record)}>View</Button>
          {/* <Button type="text" icon={<EditOutlined />} onClick={() => console.log('Edit:', record.id)}>Edit</Button>
          <Button type="text" icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(record.id)}>Delete</Button> */}
        </Space>
      ),
    },
  ];

  return (
    <div className='overflow-x-auto h-[550px]'>
      <h1 className='text-black text-3xl font-bold ml-4 mt-3'>Riders</h1>
      <div className='bg-white mt-10 ml-10 mr-10'>
        <Table<RiderType>
          columns={columns}
          dataSource={Riders}
          rowKey="id"
          size="large"
          className="font-semibold font-montserrat"
          loading={loading}
        />
        <Drawer
          title="Rider Details"
          width={400}
          onClose={handleDrawerClose}
          visible={drawerVisible}
        >
          {selectedRider && (
            <div>
             
             <Descriptions className='font-montserrat font-semibold' bordered column={1}>

              <Descriptions.Item label="City">{selectedRider.city}</Descriptions.Item>
              <Descriptions.Item label="Country">{selectedRider.country}</Descriptions.Item>
              <Descriptions.Item label="Date of Birth">{new Date(selectedRider.dob).toLocaleDateString()}</Descriptions.Item>
              <Descriptions.Item label="Gender">{selectedRider.gender}</Descriptions.Item>
              <Descriptions.Item label="Blood Group">{selectedRider.bloodGroup}</Descriptions.Item>
              <Descriptions.Item label="Registered On">{new Date(selectedRider.registeredOn).toLocaleDateString()}</Descriptions.Item>
            </Descriptions>
            </div>
          )}
        </Drawer>
      </div>
    </div>
  );
};

export default RiderTable;