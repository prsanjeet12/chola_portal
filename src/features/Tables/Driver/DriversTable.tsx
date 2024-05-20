import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Drawer, Collapse, Descriptions } from 'antd';
import axios from 'axios';
import DriverID from './DocumentsSection/DriverID';
import Address from './DocumentsSection/AddressDetails';
import LiveImage from './DocumentsSection/LivePhota';
import LicenseDetails from './DocumentsSection/LicenceDetails';
import BankDetails from './DocumentsSection/BankDetails';
import VehicleDetails from './DocumentsSection/VehicleDetails';
import RegistrationDetails from './DocumentsSection/RegistertionDetails';
import VehicleInsurance from './DocumentsSection/VehicleInsurance';

import { IoIosDocument } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { EyeFilled } from '@ant-design/icons';

type DriverType ={
  id: number;
  firstName:string;
  lastName:string;
  phoneNo:string;
  email:string;
  dob:string;
  companyCode:string;
  profileImage:string;
  bloodGroup:string;
 registeredOn:string; 
  city:string;
  country:string;








}

const DriversTable: React.FC = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  // const [selectedRider, setSelectedRider] = useState<DriverType | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const { Panel } = Collapse;
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://chola-web-app.azurewebsites.net/api/admin/get-all-driver', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const transformedData=response.data.map((item:any)=>({
          userId: item.userId,
          firstName:item.user.firstName,
          lastName:item.user.lastName,
          phoneNo:item.user.phoneNo,
          email:item.user.email,
          dob:formatDateString(item.user.dob),
          companyCode:item.user.companyCode,
          profileImage:item.user.profileImage,
          bloodGroup:item.user.bloodGroup,
          registeredOn:formatDateString(item.user.registeredOn),
          city:item.user.city,
          country:item.user.country

        }))
        setDrivers(transformedData);
        console.table(response.data)
      } catch (error) {
        console.error('Error fetching drivers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleDrawerOpen = (driver: DriverType) => {
    setSelectedDriver(driver);
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    setSelectedDriver(null);
  };


  const handleViewDocuments = async (userId: any) => {
    try {
      setLoading(true);
      console.log('Data', userId.userId);
      const response = await axios.get(`https://chola-web-app.azurewebsites.net/api/admin/user-document/${userId.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedDriver(response.data);
      console.log(response.data)
      setIsDrawerVisible(true);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleDocumentVerify = async (userId: any, documentType: string, isVerified: boolean) => {
    console.log(`Updating document verification for userId: ${userId}, documentType: ${documentType}, isVerified: ${isVerified}`);
    console.log("userId for driver vertication",userId)
    try {
      setLoading(true);
      await axios.put(`https://chola-web-app.azurewebsites.net/api/admin/verifydocument/${userId}`, {
     documentType,
     isVerified,
  
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("this", userId)
      // message.success(`${documentType} verification status updated`);
    } catch (error) {
      console.error('Error updating document verification:', error);
      // message.error('Failed to update document verification status');
    } finally {
      setLoading(false);
    }
  };


  const formatDateString = (dateString: string | null) => {
    if (!dateString) return 'NULL';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };


  const columns = [
    {
      title: 'userId',
      dataIndex: 'userId',
      key: 'id',
    },
    {
      title: 'UserName',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNo',
      key: 'phoneNo',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      key: 'dob',
    },{
      title:'companyCode',
      dataIndex:'companyCode',
      key:'companyCode'
    },
    // {
    //   title: 'Blood Group',
    //   dataIndex: 'bloodGroup',
    //   key: 'bloodGroup',
    // },
    // {
    //   title: 'Registered On',
    //   dataIndex: 'registeredOn',
    //   key: 'registeredOn',
    // },
    // {
    //   title: 'City',
    //   dataIndex: 'city',
    //   key: 'city',
    // },
    {
      title: 'Action',
      key: 'action',
      render: (userId: any) => (
        <Space size="large">
          <Button onClick={()=>handleDrawerOpen(userId)} icon={<EyeFilled/>}/>
          <Button onClick={()=>handleViewDocuments(userId)} icon={<IoIosDocument/>}/>
            

          {/* <EyeFilled height={50} onClick={()=>handleDrawerOpen(userId)}/>
          <IoIosDocument onClick={() => handleViewDocuments(userId)}/> */}
        </Space>
      ),
    },
  ];

  return (
    <div className='overflow-x-auto h-[550px]'>
      <div className='bg-white mt-10 ml-10 mr-10 font-montserrat'>
        <Table
          columns={columns}
          dataSource={drivers}
          size='large'
          className='font-montserrat font-semibold'
        />
        <Drawer
          width={620}
          className='font-montserrat font-semibold'
          title="Driver Documents"
          placement="right"
          closable={false}
          onClose={() => setIsDrawerVisible(false)}
          visible={isDrawerVisible}
        >
          <div className="drawer-header">
            <div style={{ flex: 1 }}>
              <h2 className='pb-5 text-2xl font-poppins font-bold'>User Details</h2>
            </div>
          </div>
          {selectedDriver && (
            <Collapse accordion>
              <Panel header="Driver ID" key="1">
              <DriverID driverData={selectedDriver} handleDocumentVerify={handleDocumentVerify} />
              </Panel>
              <Panel header="Address Details" key="2">
                <Address addressData={selectedDriver} />
              </Panel>

              <Panel header='Driver Live Image' key='3'>
                <LiveImage imagedata={selectedDriver}  />
              </Panel>
              <Panel header='LicenseDetails' key='4'>
                <LicenseDetails licenseData={selectedDriver}/>
              </Panel>
              <Panel header='Bank Details' key='5'>
                <BankDetails bankData={selectedDriver}/>
               </Panel>
               <Panel header="VehicleDetails" key='6'>
                <VehicleDetails vehicleData={selectedDriver}/>
               </Panel>
               <Panel header="RegisterDetails" key='7'
               
               
               >
                <RegistrationDetails registrationData={selectedDriver}/>
               </Panel>
               <Panel header="VehicleInsurance " key='8'>
                <VehicleInsurance vehicleInsuranceData={selectedDriver}/>
               </Panel>
            </Collapse>
          )}
        </Drawer>
        <Drawer
          title="Drivers Details"
          width={400}
          onClose={handleDrawerClose}
          visible={drawerVisible}
        >
{
  selectedDriver && (
    <div>
       <Descriptions column={1} bordered>
                <Descriptions.Item label="First Name">
                  {selectedDriver.firstName}
                </Descriptions.Item>
                <Descriptions.Item label="Last Name">
                  {selectedDriver.lastName}
                </Descriptions.Item>
                <Descriptions.Item label="Phone Number">
                  {selectedDriver.phoneNo}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {selectedDriver.email}
                </Descriptions.Item>
                <Descriptions.Item label="DOB">
                  {selectedDriver.dob}
                </Descriptions.Item>
                <Descriptions.Item label="Company Code">
                  {selectedDriver.companyCode}
                </Descriptions.Item>
                <Descriptions.Item label="City">
                  {selectedDriver.city}
                </Descriptions.Item>
                <Descriptions.Item label="Country">
                  {selectedDriver.country}
                </Descriptions.Item>
              </Descriptions>
    </div>
  )
}

        </Drawer>
      </div>
    </div>
  );
};

export default DriversTable;