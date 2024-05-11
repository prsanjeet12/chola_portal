import React, { useState } from 'react';
import { Table, Drawer, Button, Form, Input, DatePicker, Select } from 'antd';

const { Option } = Select;

// Car data interface
interface CarData {
  key: string;
  carID: string;
  carModel: string;
  carImage: string;
  numberPlate:string;
  createdDate: string;
  availability: string;
  status: string;
  allocatedDriver: string;
}

// Main component for managing cars
const CarManagement: React.FC = () => {
  // State for drawers
  const [addCarDrawerVisible, setAddCarDrawerVisible] = useState(false);
  const [updateCarDrawerVisible, setUpdateCarDrawerVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);

  // Form state for update car
  const [updateCarForm] = Form.useForm();

  // Function to handle opening update car drawer
  const showUpdateCarDrawer = (record: CarData) => {
    setSelectedCar(record);
    setUpdateCarDrawerVisible(true);
    updateCarForm.setFieldsValue(record); // Pre-fill form fields with selected car data
  };

  // Function to handle closing update car drawer
  const closeUpdateCarDrawer = () => {
    setSelectedCar(null);
    setUpdateCarDrawerVisible(false);
  };

  // Function to handle form submission for update car form
  const handleUpdateCarSubmit = (values: any) => {
    console.log('Update Car Form values:', values);
    // Logic to send form data to backend
    closeUpdateCarDrawer();
  };

  // Sample data for cars
  const data: CarData[] = [
    {
        key: '1',
        carID: 'CAR001',
        carModel: 'Toyota Camry',
        carImage: 'data:image/jpeg;base64,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',
        createdDate: '2024-05-10',
        numberPlate:'12342123',
        availability: 'Available',
        status: 'Active',
        allocatedDriver: 'John Doe'
      },
      {
        key: '2',
        carID: 'CAR002',
        carModel: 'Honda Civic',
        carImage: 'data:image/jpeg;base64,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',
        createdDate: '2024-05-12',
        numberPlate:' RJ2034',
        availability: 'Not Available',
        status: 'Active',
        allocatedDriver: ''
      },
  ];

  // Columns for the table
  const columns = [
    { title: 'Car ID', dataIndex: 'carID', key: 'carID' },
    { title: 'Car Model', dataIndex: 'carModel', key: 'carModel' },
    { title: 'Car Image', dataIndex: 'carImage', key: 'carImage', render: (text: string) => <img src={text} alt="Car" style={{ width: '50px' }} /> },
    { title: 'Created Date', dataIndex: 'createdDate', key: 'createdDate' },
    { title: 'Number Plate', dataIndex: 'numberPlate', key: 'numberPlate' },
    { title: 'Availability', dataIndex: 'availability', key: 'availability' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Allocated Driver', dataIndex: 'allocatedDriver', key: 'allocatedDriver' },
    { title: 'Actions', key: 'actions', 
    render: (text: string, record: CarData) => <button className=' bg-gray-950


    text-white px-4 py-2 rounded-lg 
   hover:scale-105 transition 
   duration-300 ease-in-out hover:bg-purple-400' onClick={() => 
        showUpdateCarDrawer(record)}>Edit</button> }
  ];

  return (
    <div className='font-montserrat'>
             <h1 className='text-black
       text-3xl font-semibold ml-4 mt-3'>Vehicle Management</h1>
    <div className='overflow-x-auto mt-20 ml-10 mr-10
     bg-white'>
      <div className='flex justify-end'>
        <button
          className='mr-8 bg-gray-950
           text-white px-4 py-2 rounded-lg 
           mt-6 hover:scale-105 transition 
          duration-300 ease-in-out hover:bg-purple-400'
          onClick={() => setAddCarDrawerVisible(true)}
        >
          Add New Car
        </button>
      </div>

      {/* Table to display car details */}
      <Table 
      columns={columns}
       dataSource={data} 
       className='font-semibold font-montserrat' 
    
       />

      {/* Add new car drawer */}
      <Drawer
        title="Add New Car"
        placement="right"
        closable={false}
        onClose={() => setAddCarDrawerVisible(false)}
        visible={addCarDrawerVisible}
      >
      <Form form={updateCarForm} onFinish={handleUpdateCarSubmit} layout="vertical">
  <div className="mb-4">
    
    <input  className='className=" w-full h-11
   bg-white border border-gray-600
    placeholder-gray-800
   rounded-md py-2 px-4 
   focus:outline-none
    focus:bg-white 
    placeholder
    appearance-none"' placeholder='Car Name'  id="carID" name="car Name" type="text"  />
  </div>
  <div className="mb-4">
    {/* <label htmlFor="carModel" className="block text-sm font-medium text-gray-700">
      Car Model
    </label> */}
    <input 
    placeholder='Car Modal'
    
    id="carModel" name="carModel" type="text" className=" w-full h-11
   bg-white border border-gray-600
    placeholder-gray-800
   rounded-md py-2 px-4 
   focus:outline-none
    focus:bg-white 
    placeholder
    appearance-none" />
  </div>
  
  <div className="mb-4">
    {/* <label htmlFor="carModel" className="block text-sm font-medium text-gray-700">
      Car Model
    </label> */}
    <input 
    placeholder='Number Plate'
    
    id="carModel" name="Number Plate" type="text" className=" w-full h-11
   bg-white border border-gray-600
    placeholder-gray-800
   rounded-md py-2 px-4 
   focus:outline-none
    focus:bg-white 
    placeholder
    appearance-none" />
  </div>
  <div className="mb-4">
 
  <div className="flex items-center">
    <label htmlFor="upload" className="mr-2 cursor-pointer
     bg-white text-black  border-[1px] border-gray-950 py-2 px-4 rounded-md
      hover:bg-indigo-600">
      Upload Image
      <input
        id="upload"
        name="carImageUpload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          if (file) {
            // Logic to handle the uploaded file
            console.log('Uploaded file:', file);
          }
        }}
      />
    </label>
  </div>
</div>
  <div className="mb-4">

    <select id="availability" name="availability"  className=" w-full h-11
   bg-white border border-gray-600
    placeholder-gray-800
   rounded-md py-2 px-4 
   focus:outline-none
    focus:bg-white 
    placeholder
    appearance-none">
      <option value="Available">Available</option>
      <option value="Not Available">Not Available</option>
    </select>
  </div>
  <div className="mb-4">
  
    <select id="status" name="status" className=" w-full h-11
   bg-white border border-gray-600
    placeholder-gray-800
   rounded-md py-2 px-4 
   focus:outline-none
    focus:bg-white 
    placeholder
    appearance-none">
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>
  </div>
  <div>
    <button type="submit" className="inline-flex
     text-white bg-gray-950
     px-4 py-2 rounded-lg hover:scale-105 transition 
     duration-300 ease-in-out hover:bg-purple-400">
   Create New Car
    </button>
  </div>
</Form>
      </Drawer>

      {/* Update car drawer */}
      <Drawer
        title="Update Car"
        placement="right"
        closable={false}
        onClose={closeUpdateCarDrawer}
        visible={updateCarDrawerVisible}
      >
        {/* Update car form */}
        <Form form={updateCarForm} onFinish={handleUpdateCarSubmit} layout="vertical">
  <div className="mb-4">
    
    <input  className='className=" w-full h-11
   bg-white border border-gray-600
    placeholder-gray-800
   rounded-md py-2 px-4 
   focus:outline-none
    focus:bg-white 
    placeholder
    appearance-none"' placeholder='Car Name'  id="carID" name="car Name" type="text"  />
  </div>
  <div className="mb-4">
    {/* <label htmlFor="carModel" className="block text-sm font-medium text-gray-700">
      Car Model
    </label> */}
    <input 
    placeholder='Car Modal'
    
    id="carModel" name="carModel" type="text" className=" w-full h-11
   bg-white border border-gray-600
    placeholder-gray-800
   rounded-md py-2 px-4 
   focus:outline-none
    focus:bg-white 
    placeholder
    appearance-none" />
  </div>
  
  <div className="mb-4">
    {/* <label htmlFor="carModel" className="block text-sm font-medium text-gray-700">
      Car Model
    </label> */}
    <input 
    placeholder='Number Plate'
    
    id="carModel" name="Number Plate" type="text" className=" w-full h-11
   bg-white border border-gray-600
    placeholder-gray-800
   rounded-md py-2 px-4 
   focus:outline-none
    focus:bg-white 
    placeholder
    appearance-none" />
  </div>
  <div className="mb-4">
 
  <div className="flex items-center">
    <label htmlFor="upload" className="mr-2 cursor-pointer
     bg-white text-black  border-[1px] border-gray-950 py-2 px-4 rounded-md
      hover:bg-indigo-600">
      Upload Image
      <input
        id="upload"
        name="carImageUpload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          if (file) {
            // Logic to handle the uploaded file
            console.log('Uploaded file:', file);
          }
        }}
      />
    </label>
  </div>
</div>
  <div className="mb-4">

    <select id="availability" name="availability"  className=" w-full h-11
   bg-white border border-gray-600
    placeholder-gray-800
   rounded-md py-2 px-4 
   focus:outline-none
    focus:bg-white 
    placeholder
    appearance-none">
      <option value="Available">Available</option>
      <option value="Not Available">Not Available</option>
    </select>
  </div>
  <div className="mb-4">
  
    <select id="status" name="status" className=" w-full h-11
   bg-white border border-gray-600
    placeholder-gray-800
   rounded-md py-2 px-4 
   focus:outline-none
    focus:bg-white 
    placeholder
    appearance-none">
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>
  </div>
  <div>
    <button type="submit" className="inline-flex
     text-white bg-gray-950
     px-4 py-2 rounded-lg hover:scale-105 transition 
     duration-300 ease-in-out hover:bg-purple-400">
      Update Car
    </button>
  </div>
</Form>
      </Drawer>
    </div>
    </div>
  );
};

export default CarManagement;