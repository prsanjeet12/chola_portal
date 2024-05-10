import React, { useState } from 'react';
import { Table, Drawer, Button } from 'antd';

// Define enum for Category Type
enum CategoryType {
  Percentage = 0,
  FixedNumber = 1,
  Currency = 2,
}

// Define enum for Calculation Type
enum CalculationType {
  Plus = 0,
  Minus = 1,
  Multiply = 2,
  Divide = 3,
  Average = 4,
  Modulus = 5,
}

interface DriverSurchargeMap {
  driverSurchargeMapId: string;
  driverId: string;
  surchargeCategoryId: string;
  surchargeValue: number;
  categoryType: CategoryType; // Use enum here
  calculationType: CalculationType; // Use enum here
}



const DriverSurchargeMapTable: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<DriverSurchargeMap | null>(null);
  const [isCreateDrawerVisible, setCreateDrawerVisible] = useState(false);
  const handleUpdate = (record: DriverSurchargeMap) => {
    setSelectedRecord(record);
    setVisible(true);
  };

  const handleCloseDrawer = () => {
    setVisible(false);
  };

  const handleCreate = () => {
    setCreateDrawerVisible(true);
  };

 

 

  const onFinishCreate = (values: any) => {
    console.log('Received values for create:', values);
    // Call create API or perform other actions here
    setCreateDrawerVisible(false);
  };
  const onFinish = (values: any) => {
    console.log('Received values:', values);
    // Call update API or perform other actions here
    setVisible(false);
  };

  const dummyData: DriverSurchargeMap[] = [
    {
      driverSurchargeMapId: 'DSM_001',
      driverId: 'DRV_001',
      surchargeCategoryId: 'TAX_001',
      surchargeValue: 18,
      categoryType: CategoryType.Percentage,
      calculationType: CalculationType.Plus,
    },
    {
      driverSurchargeMapId: 'DSM_002',
      driverId: 'DRV_002',
      surchargeCategoryId: 'TAX_002',
      surchargeValue: 20,
      categoryType: CategoryType.FixedNumber,
      calculationType: CalculationType.Minus,
    },
    // Add more dummy data as needed
  ];
  const columns = [
    {
      title: 'Driver Surcharge Map ID',
      dataIndex: 'driverSurchargeMapId',
      key: 'driverSurchargeMapId',
    },
    {
      title: 'Driver ID',
      dataIndex: 'driverId',
      key: 'driverId',
    },
    {
      title: 'Surcharge Category ID',
      dataIndex: 'surchargeCategoryId',
      key: 'surchargeCategoryId',
    },
    {
      title: 'Surcharge Value',
      dataIndex: 'surchargeValue',
      key: 'surchargeValue',
    },
    {
      title: 'Category Type',
      dataIndex: 'categoryType',
      key: 'categoryType',
      render: (categoryType: CategoryType) => CategoryType[categoryType], // Display enum value
    },
    {
      title: 'Calculation Type',
      dataIndex: 'calculationType',
      key: 'calculationType',
      render: (calculationType: CalculationType) => CalculationType[calculationType], // Display enum value
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: DriverSurchargeMap) => (
        <div>
        <button
          className='mr-2 bg-gray-950 text-white px-4 py-2 rounded-lg hover:scale-105 transition duration-300 ease-in-out hover:bg-purple-400'
          onClick={() => handleUpdate(record)}
        >
          Update
        </button>
       
      </div>
        
      ),
    },
  ];
  return (
    <div className='font-montserrat overflow-x-auto mt-20 ml-10 mr-10 bg-white'>
      <div className='mt-10 flex justify-end'>
      <button
          className='bg-gray-950 text-white px-8 py-2
           rounded-lg hover:scale-105 transition duration-300 mr-8 ease-in-out hover:bg-purple-400'
          onClick={handleCreate}
        >
          Create
        </button>
      </div>
       
      <Table dataSource={dummyData} pagination={false} className='font-semibold font-montserrat' 
      columns={columns} />

      <Drawer
        title="Update Driver Surcharge"
        width={400}
        onClose={handleCloseDrawer}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <form onSubmit={onFinish} className='
        font-montserrat
        max-w-lg mx-auto mt-6 space-y-6'>
          <div>
            <label>Driver Surcharge Map ID:</label>
            <input type="text" className='      w-full h-14
      
      bg-white border-2
      border-purple-1
      placeholder-gray-800
       bg-opacity-5 rounded-lg 
        py-2 px-4  focus:outline-none
         focus:bg-white'
             value={selectedRecord?.driverSurchargeMapId || ''}  />
          </div>
          <div>
            <label>Driver ID:</label>
            <input
             className='     w-full h-14
      
             bg-white border-2
             border-purple-1
             placeholder-gray-800
              bg-opacity-5 rounded-lg 
               py-2 px-4  focus:outline-none
                focus:bg-white'
            type="text" value={selectedRecord?.driverId || ''}  />
          </div>
          <div>
            <label>Surcharge Category ID:</label>
            <input
             className='     w-full h-14
      
             bg-white border-2
             border-purple-1
             placeholder-gray-800
              bg-opacity-5 rounded-lg 
               py-2 px-4  focus:outline-none
                focus:bg-white'
            type="text"   />
          </div>
          <div>
            <label>Surcharge Value:</label>
            <input className='     w-full h-14
      
      bg-white border-2
      border-purple-1
      placeholder-gray-800
       bg-opacity-5 rounded-lg 
        py-2 px-4  focus:outline-none
         focus:bg-white' type="number" 
          />
          </div>
          {/* Add input fields for other properties */}
          <button className='
          flex justify-center
          ml-[130px] bg-gray-950
          font-montserrat
          font-semibold
           text-white px-8 py-3 rounded-lg hover:scale-105 transition duration-300 ease-in-out
                   hover:bg-purple-400'>
            Update
          </button>
        </form>
      </Drawer>
      <Drawer
        title="Create Driver Surcharge"
        width={400}
        onClose={handleCloseDrawer}
        visible={isCreateDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <form onSubmit={onFinish} className='
        font-montserrat
        max-w-lg mx-auto mt-6 space-y-6'>
          <div>
            <label>Driver Surcharge Map ID:</label>
            <input type="text" className='      w-full h-14
      
      bg-white border-2
      border-purple-1
      placeholder-gray-800
       bg-opacity-5 rounded-lg 
        py-2 px-4  focus:outline-none
         focus:bg-white'
             value={selectedRecord?.driverSurchargeMapId || ''}  />
          </div>
          <div>
            <label>Driver ID:</label>
            <input
             className='     w-full h-14
      
             bg-white border-2
             border-purple-1
             placeholder-gray-800
              bg-opacity-5 rounded-lg 
               py-2 px-4  focus:outline-none
                focus:bg-white'
            type="text" value={selectedRecord?.driverId || ''}  />
          </div>
          <div>
            <label>Surcharge Category ID:</label>
            <input
             className='     w-full h-14
      
             bg-white border-2
             border-purple-1
             placeholder-gray-800
              bg-opacity-5 rounded-lg 
               py-2 px-4  focus:outline-none
                focus:bg-white'
            type="text"   />
          </div>
          <div>
            <label>Surcharge Value:</label>
            <input className='     w-full h-14
      
      bg-white border-2
      border-purple-1
      placeholder-gray-800
       bg-opacity-5 rounded-lg 
        py-2 px-4  focus:outline-none
         focus:bg-white' type="number" 
          />
          </div>
         
          <button className='
          flex justify-center
          ml-[130px] bg-gray-950
          font-montserrat
          font-semibold
           text-white px-8 py-3 rounded-lg hover:scale-105 transition duration-300 ease-in-out
                   hover:bg-purple-400'>
            Create 
          </button>
        </form>
      </Drawer>
    </div>
  );
};

export default DriverSurchargeMapTable;