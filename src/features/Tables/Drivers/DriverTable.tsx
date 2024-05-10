import React, { useState,useRef } from 'react';
import { Button, Drawer, Table, Space, Tag, Input , Collapse,Popover,Modal,Switch} from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined,SearchOutlined, ExclamationCircleOutlined, DownOutlined ,CloseOutlined} from '@ant-design/icons';



import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { InputRef } from 'antd';


// import EditDriverModal from '../../components/Modals/EditDriverModal';


// import UserDocumentSection from './DataSection/UserDocumentSection';
// import InsuranceProvidersSection from './DataSection/InsuranceProviderSection';
// // import InsuranceProvidersSection from '../../components/DataSection/InsuranceProviderSection';

// import ProviderDetailsSection from './DataSection/ProviderDetailsSection';
// import VehicleDetailsSection from './DataSection/VehicleDetailsSection';
// import VehicleDocumentsSection

//  from './DataSection/VehicleDocumentsSection';
//  import VehiclePollutionSection from './DataSection/VehiclePollutionSection';
// import VehicleInsuranceSection from './DataSection/VehicleInsuranceSection';

const { Panel } = Collapse;
const { confirm } = Modal;

 type DriverType = {
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
 
};

type DataIndex = keyof DriverType;
interface MoreOptionsProps {
  id: string | number; 
}


const DriverTable: React.FC = () => {
const [driverfilter,setdriverFilter]=useState<any[]>([
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    phoneNo: '555-123-4567',
    companyCode:'w2344',
    verified: true,
   
    userType: 1, // User Type: 1 (Driver)
    dob: new Date('1985-05-15'),
    profileImage: 'https://via.placeholder.com/80',
    bloodGroup: 'A+',
    registeredOn: new Date('2024-10-10'),
    updatedOn: new Date('2022-02-05'),
    aadharNo: '1234 5678 9012',
    aadharFront: 'https://via.placeholder.com/200x100',
    aadharBack: 'https://via.placeholder.com/200x100',
    aadharVerified: true,
    aadharVerifiedBy: 'Admin',
    panNo: 'ABCDE1234F',
    panImage: 'https://via.placeholder.com/200x100',
    panVerified: true,
    panVerifiedBy: 'Admin',
    licenseNo: 'DL1234567890123',
    licenseImage: 'https://via.placeholder.com/200x100',
    licenseVerified: true,
    licenseVerifiedBy: 'Admin',
    vehicleType: 'Car',
    fuelType: 'Petrol',
    vehicleNo: 'KA01AB1234',
    vehicleVerified: true,
    vehicleVerifiedBy: 'Admin',
    vehicleImages: [
      'https://via.placeholder.com/200x100',
      'https://via.placeholder.com/200x100',
    ],
    registeredOnVehicle: new Date('2022-02-15'),
    updatedOnVehicle: new Date('2022-02-18'),
    insuranceProvider: 'ABC Insurance',
    insuranceNo: 'INS123456789',
    insuranceExpiryDate: new Date('2023-02-28'),
    insuranceVerified: true,
    insuranceVerifiedBy: 'Admin',
    pollutionExpiryDate: new Date('2023-03-15'),
    pollutionVerified: true,
    pollutionVerifiedBy: 'Admin',
    providerName: 'XYZ Cab Services',
    addedOn: new Date('2022-02-01'),
    addedBy: 'Admin',
    updatedOnDriver: new Date('2022-02-20'),
    updatedBy: 'Admin',
    isBanned: false,
    bannedBy: '',
    bannedReason: '',
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Doe',
    phoneNo: '555-123-4567',
    companyCode:'w2344',
    verified: true,
    userType: 1, // User Type: 1 (Driver)
    dob: new Date('1985-05-15'),
    profileImage: 'https://via.placeholder.com/80',
    bloodGroup: 'A+',
    registeredOn: new Date('2022-01-10'),
    updatedOn: new Date('2022-02-05'),
    aadharNo: '1234 5678 9012',
    aadharFront: 'https://via.placeholder.com/200x100',
    aadharBack: 'https://via.placeholder.com/200x100',
    aadharVerified: true,
    aadharVerifiedBy: 'Admin',
    panNo: 'ABCDE1234F',
    panImage: 'https://via.placeholder.com/200x100',
    panVerified: true,
    panVerifiedBy: 'Admin',
    licenseNo: 'DL1234567890123',
    licenseImage: 'https://via.placeholder.com/200x100',
    licenseVerified: true,
    licenseVerifiedBy: 'Admin',
    vehicleType: 'Car',
    fuelType: 'Petrol',
    vehicleNo: 'KA01AB1234',
    vehicleVerified: true,
    vehicleVerifiedBy: 'Admin',
    vehicleImages: [
      'https://via.placeholder.com/200x100',
      'https://via.placeholder.com/200x100',
    ],
    registeredOnVehicle: new Date('2022-02-15'),
    updatedOnVehicle: new Date('2022-02-18'),
    insuranceProvider: 'ABC Insurance',
    insuranceNo: 'INS123456789',
    insuranceExpiryDate: new Date('2023-02-28'),
    insuranceVerified: true,
    insuranceVerifiedBy: 'Admin',
    pollutionExpiryDate: new Date('2023-03-15'),
    pollutionVerified: true,
    pollutionVerifiedBy: 'Admin',
    providerName: 'XYZ Cab Services',
    addedOn: new Date('2022-02-01'),
    addedBy: 'Admin',
    updatedOnDriver: new Date('2022-02-20'),
    updatedBy: 'Admin',
    isBanned: false,
    bannedBy: '',
    bannedReason: '',
  },
  {
    "id": 3,
    "firstName": "Alice",
    "lastName": "Smith",
    "phoneNo": "555-987-6543",
    "companyCode": "x4567",
    "verified": true,
    "userType": 1,
    "dob": "1988-09-20T00:00:00.000Z",
    "profileImage": "https://via.placeholder.com/80",
    "bloodGroup": "O-",
    "registeredOn": "2022-03-05T00:00:00.000Z",
    "updatedOn": "2022-04-10T00:00:00.000Z",
    "aadharNo": "9876 5432 1098",
    "aadharFront": "https://via.placeholder.com/200x100",
    "aadharBack": "https://via.placeholder.com/200x100",
    "aadharVerified": true,
    "aadharVerifiedBy": "Admin",
    "panNo": "FGHIJ6789K",
    "panImage": "https://via.placeholder.com/200x100",
    "panVerified": true,
    "panVerifiedBy": "Admin",
    "licenseNo": "DL9876543210987",
    "licenseImage": "https://via.placeholder.com/200x100",
    "licenseVerified": true,
    "licenseVerifiedBy": "Admin",
    "vehicleType": "Motorcycle",
    "fuelType": "Electric",
    "vehicleNo": "MH02CD5678",
    "vehicleVerified": true,
    "vehicleVerifiedBy": "Admin",
    "vehicleImages": [
        "https://via.placeholder.com/200x100",
        "https://via.placeholder.com/200x100"
    ],
    "registeredOnVehicle": "2022-04-15T00:00:00.000Z",
    "updatedOnVehicle": "2022-05-18T00:00:00.000Z",
    "insuranceProvider": "DEF Insurance",
    "insuranceNo": "INS987654321",
    "insuranceExpiryDate": "2023-03-31T00:00:00.000Z",
    "insuranceVerified": true,
    "insuranceVerifiedBy": "Admin",
    "pollutionExpiryDate": "2023-04-15T00:00:00.000Z",
    "pollutionVerified": true,
    "pollutionVerifiedBy": "Admin",
    "providerName": "PQR Ride Services",
    "addedOn": "2022-03-01T00:00:00.000Z",
    "addedBy": "Admin",
    "updatedOnDriver": "2022-05-20T00:00:00.000Z",
    "updatedBy": "Admin",
    "isBanned": false,
    "bannedBy": "",
    "bannedReason": ""
},
{
  "id": 4,
  "UserName": "Emily",
  "lastName": "Johnson",
  "phoneNo": "555-222-3333",
  "companyCode": "y7890",
  "verified": true,
  "userType": 1,
  "dob": "1990-07-12T00:00:00.000Z",
  "profileImage": "https://via.placeholder.com/80",
  "bloodGroup": "B+",
  "registeredOn": "2022-05-20T00:00:00.000Z",
  "updatedOn": "2022-06-25T00:00:00.000Z",
  "aadharNo": "5432 1098 7654",
  "aadharFront": "https://via.placeholder.com/200x100",
  "aadharBack": "https://via.placeholder.com/200x100",
  "aadharVerified": true,
  "aadharVerifiedBy": "Admin",
  "panNo": "LMNOP5678Q",
  "panImage": "https://via.placeholder.com/200x100",
  "panVerified": true,
  "panVerifiedBy": "Admin",
  "licenseNo": "DL5432109876543",
  "licenseImage": "https://via.placeholder.com/200x100",
  "licenseVerified": true,
  "licenseVerifiedBy": "Admin",
  "vehicleType": "Van",
  "fuelType": "Diesel",
  "vehicleNo": "TN03EF1234",
  "vehicleVerified": true,
  "vehicleVerifiedBy": "Admin",
  "vehicleImages": [
      "https://via.placeholder.com/200x100",
      "https://via.placeholder.com/200x100"
  ],
  "registeredOnVehicle": "2022-06-01T00:00:00.000Z",
  "updatedOnVehicle": "2022-07-10T00:00:00.000Z",
  "insuranceProvider": "GHI Insurance",
  "insuranceNo": "INS543210987",
  "insuranceExpiryDate": "2023-05-31T00:00:00.000Z",
  "insuranceVerified": true,
  "insuranceVerifiedBy": "Admin",
  "pollutionExpiryDate": "2023-06-15T00:00:00.000Z",
  "pollutionVerified": true,
  "pollutionVerifiedBy": "Admin",
  "providerName": "LMN Transportation",
  "addedOn": "2022-05-01T00:00:00.000Z",
  "addedBy": "Admin",
  "updatedOnDriver": "2022-07-15T00:00:00.000Z",
  "updatedBy": "Admin",
  "isBanned": false,
  "bannedBy": "",
  "bannedReason": ""
}
])


 
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [driver,setdrivers]=useState()

;const [visible, setVisible] = useState(false); // State to manage modal visibility
const [editedUser, setEditedUser] = useState<DriverType | null>(null);

 



  

  const openEditModal = (user: DriverType) => {
    setVisible(true);
    setEditedUser(user);
  };


  const closeEditModal = () => {
    setVisible(false);
    setEditedUser(null);
  };


  const saveEditedUser = () => {
  
    closeEditModal();
  };


  

  
 











  const showDrawer = (userId: number) => {
    setSelectedUserId(userId);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setSelectedUserId(null);
  };





 
 const renderSectionWithSeparator = (section: React.ReactNode, title: string) => (
    <Panel header={title} key={title} className=' font-poppins text-[14px] font-semibold'>
      {section}
    </Panel>
  )
 
const MoreOptions: React.FC<MoreOptionsProps> = ({ id }) => ( // Specify the type of props
<Space direction="vertical">
<Button type="text" icon={<EyeOutlined />} onClick={(event) => showDrawer(Number(id))}>view</Button>

  <Button type="text" icon={<EditOutlined />} onClick={() => console.log('Edit:', id)}>
    Edit
  </Button>
  <Button type="text" icon={<DeleteOutlined />} >
        Delete
      </Button>
</Space>
);
const [columns, setColumns] = useState<ColumnsType<DriverType>>([
  {
  title:<span className='text-[15px] font-bold'>Driver Id</span>,
  dataIndex:'id',
  key:'id',
  width:60,
  // ...getColumnSearchProps('id'),
  // sorter:(a:DriverType,b:DriverType)=>a.id-b.id,
  },

  {
    title: <span className='text-[15px] font-bold'>UserName</span>,
    dataIndex: 'UserName',
    key: 'firstName', 
    width:70,
    // ...getColumnSearchProps('firstName'),
    // sorter:(a:DriverType,b:DriverType)=>a.id-b.id,
  },
  // {
  //   title: <span className='text-[15px] font-bold'>LastName</span>,
  //   dataIndex: 'lastName',
  //   key: 'lastName',
  //   width:120,
  //   ...getColumnSearchProps('lastName'),
  //   sorter:(a:DriverType,b:DriverType)=>a.id-b.id,
  // },
  {
    title: <span className='text-[15px] font-bold'>PhoneNo</span>,
    dataIndex: 'phoneNo',
    key: 'phoneNo',  
    width:80,
    // ...getColumnSearchProps('phoneNo'),
    //   sorter:(a:DriverType,b:DriverType)=>a.id-b.id,
  },
  {
    title:<span className='text-[15px] font-bold'>Company Code</span>,
    dataIndex:'companyCode',
    width:70,
  
    key:'companyCode',

    // sorter:(a:DriverType,b:DriverType)=>a.id-b.id,
  },
  {
    title: <span className='text-[15px] font-bold'>Verified</span>,
    dataIndex: 'verified',
    key: 'verified',
    width:80,
    render: (isVerified: boolean) => (isVerified ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>),
    // sorter:(a:DriverType,b:DriverType)=>a.id-b.id,
  },
  {
    title: <span className='text-[15px] font-bold'>DOB</span>,
    dataIndex: 'dob',
    key: 'dob',
    width:80,
    // render: (dob) => new Date(dob).toLocaleDateString(),
    // sorter:(a:DriverType,b:DriverType)=>a.id-b.id,
  },
  // {
  //   title: <span className='text-[15px] font-bold'>Profile</span>,
  //   dataIndex: 'profileImage',
  //   key: 'profileImage',

  //   width:90,
  //   sorter:(a:DriverType,b:DriverType)=>a.id-b.id,
  //   render: (profileImage) => (
  //     <img src={profileImage} alt="Profile" className="rounded-full w-10 h-10" />
  //   ),
  // },
  {
    title: <span className='text-[15px] font-bold'>Blood Group</span>,
    dataIndex: 'bloodGroup',
    width:70,
    // key: 'bloodGroup',
    // sorter:(a:DriverType,b:DriverType)=>a.id-b.id,
  },

  {
    title:<span className='text-[15px] font-bold'>Action</span>,
    key: 'Action',
    width:80,
    sorter:(a:DriverType,b:DriverType)=>a.id-b.id,
    render: (_, record) => (
      <Popover content={<MoreOptions id={record.id} />} title="Actions">
        <button className=' text-blacky underline hover:text-purple-800  px-4 py-1 rounded-md'>More</button>
      </Popover>
    ),
  },
]);

 

 
  
  return (
    <div className='overflow-x-auto font-montserrat' >
      <h1 className='text-black
       text-3xl font-bold ml-4 mt-3'>Drivers</h1>
      <div className=" mt-20 ml-10 mr-10  ">
      <div className="flex
       bg-white 

       justify-between 

       items-center ">
    <div className=" ml-4 grid grid-cols-4
     mt-10 gap-10">
  <div className="relative">
    <input
      type="text"
      placeholder="Driver Id"
      className="h-12 px-4 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
    />
    <SearchOutlined className="absolute top-3 right-4 text-gray-400" />
  </div>
  <div className="relative">
    <input
      type="text"
      placeholder="UserName"
      className="h-12 px-4 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
    />
    <SearchOutlined className="absolute top-3 right-4 text-gray-400" />
  </div>
  <div className="relative">
    <input
      type="text"
      placeholder="PhoneNo"
      className="h-12 px-4 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
    />
    <SearchOutlined className="absolute top-3 right-4 text-gray-400" />
  </div>
  <div className="relative">
    <input
      type="text"
      placeholder="Company Code"
      className="h-12 px-4 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
    />
    <SearchOutlined className="absolute top-3 right-4 text-gray-400" />
  </div>
</div>
     </div>
        <Table<DriverType>
          columns={columns}
          dataSource={driverfilter}
          rowKey="id"
          
      
          
         
        
          pagination={false}
          loading={loading}
          className='font-semibold font-montserrat'
        />
 
      </div>
      {/* {editedUser && (
        // <EditDriverModal
        //   visible={visible}
        //   onCancel={closeEditModal}
        //   onSave={saveEditedUser}
        //   editedUser={editedUser}
        // />
      )} */}
      <Drawer
        width={720}
        onClose={onClose}
        visible={visible}
        destroyOnClose
        closable={false}
        className="max-w-screen-md font-poppins mx-auto"
      >
        {/* <div className="drawer-header">
          <div style={{ flex: 1 }}>
            <h2 className='pb-5 text-2xl font-poppins font-bold'>User Details</h2>
          </div>
          <Button className="close-button" onClick={onClose}>
            <CloseOutlined className='text-[20px]' />
          </Button>
        </div>
        {selectedUserId !== null && (
          <Collapse
            defaultActiveKey={['UserDocument']}
            bordered={false}
            expandIcon={({ isActive }) => (
              <DownOutlined className={`text-lg ${isActive ? 'transform rotate-180' : ''}`} />
            )}
            className="mt-4"
          >
            {driverfilter.find((driver) => driver.id === selectedUserId) && (
              <>
                {renderSectionWithSeparator(
                  <UserDocumentSection 
                    driverData={driverfilter.find((driver) => driver.id === selectedUserId)!} />,
                  'User Document'
                )}
                {renderSectionWithSeparator(
                  <div className='border-b-2 p-4 shadow-md'>
                    <InsuranceProvidersSection driverData={driverfilter.find((driver) => driver.id === selectedUserId)!} />
                  </div>,
                  'Insurance Providers'
                )}
                {renderSectionWithSeparator(
                  <ProviderDetailsSection driverData={driverfilter.find((driver) => driver.id === selectedUserId)!} />,
                  'Provider Details'
                )}
                {renderSectionWithSeparator
                  (
                    <VehicleDetailsSection driverData={driverfilter.find((driver)=>driver.id===selectedUserId)}/>,
                    'Vehicle Details'
                  )
                }
                {renderSectionWithSeparator
                  (
                    <VehicleDocumentsSection driverData={driverfilter.find((driver)=>driver.id===selectedUserId)}/>,
                    'Vehicle Documents'
                  )
                }
                {  renderSectionWithSeparator(
                
                  <VehicleInsuranceSection driverData={driverfilter.find((driver)=>driver.id===selectedUserId)}/>,
                  'Vehicle Insurance'
                )}
              <div className="mt-10 font-montserrat font-semibold  flex justify-center">
        <button className='mr-8 bg-gray-950
        text-white px-16 py-3 rounded-lg 
         hover:scale-105 transition 
       duration-300 ease-in-out hover:bg-purple-400'>Approve</button>
      </div>
              </>
            )}
          </Collapse>
        )} */}
      </Drawer>
    </div>
  );
                }
export default DriverTable;
