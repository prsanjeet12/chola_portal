import React, { useState } from 'react';
import { Table, Modal, Button } from 'antd';
import farrri from '../../../assets/car2.png';

const { confirm } = Modal;

interface DriverData {
  key: string;
  driverName: string;
  driverID: string;
  driverNumber: string;
  requestCarId: string;
  requestCarModal: string;
  requestCarAvability: string;
  requestCar: string;
  carImage: string;
  requestStatus: string;
  allocationStatus: string;
  vehicleNumberPlate: string; // Added vehicle number plate field
  driverType: string; // Added type of driver field
}

const DriverCarApproval: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<DriverData | null>(null);

  const showDriverDetailsModal = (record: DriverData) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleAllocation = (record: DriverData) => {
    confirm({
      title: 'Confirm Allocation',
      content: 'Are you sure you want to allocate the car to this driver?',
      onOk() {
        // Logic to allocate the car
      },
      onCancel() {},
    });
  };
  const showDriverImageModal = (imageSrc: string) => {
    Modal.info({
      title: 'Car Image',
      content: (
        <img src={farrri} alt="Car" style={{ width: '100%' }} />
      ),
      onOk() {},
    });
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRecord(null);
  };

  const columns = [
    {
      title: 'Driver Name',
      dataIndex: 'driverName',
      key: 'driverName',
    },
    {
      title: 'Driver ID',
      dataIndex: 'driverID',
      key: 'driverID',
    },
    // {
    //   title: 'Driver Number',
    //   dataIndex: 'driverNumber',
    //   key: 'driverNumber',
    // },
    {
      title: 'Requested Car',
      dataIndex: 'requestCar',
      key: 'requestCar',
    },
    // {
    //   title: 'Requested Car Modal',
    //   dataIndex: 'requestCarModal',
    //   key: 'requestCarModal',
    // },
    {
      title: 'Requested Car Availablity',
      dataIndex: 'requestCarAvability',
      key: 'requestCarAvability',
    },
    {
      title: ' Number Plate', // Added vehicle number plate column
      dataIndex: 'vehicleNumberPlate',
      key: 'vehicleNumberPlate',
    },
    {
      title: 'Type of Driver', // Added type of driver column
      dataIndex: 'driverType',
      key: 'driverType',
    },
    {
      title: ' Image',
      dataIndex: 'carImage',
      key: 'carImage',
      render: (text: string, record: DriverData) => (
        <img onClick={() => showDriverImageModal(record.carImage)} src={farrri} alt="Car" style={{ width: '50px', height: 'auto' }} />
      ),
    },
    {
      title: ' Status',
      dataIndex: 'requestStatus',
      key: 'requestStatus',
    },
    // {
    //   title: 'Status of Allocation',
    //   dataIndex: 'allocationStatus',
    //   key: 'allocationStatus',
    // },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: DriverData) => (
        <button className='bg-gray-950 text-white px-4 py-2 rounded-lg hover:scale-105 transition duration-300 ease-in-out'  onClick={() => showDriverDetailsModal(record)} >
          View Details
        </button>
      ),
    },
  ];

  const data: DriverData[] = [
    {
      key: '1',
      driverName: 'John Doe',
      driverID: 'DRV001',
      driverNumber: '1234567890',
      requestCarId: "12122",
      requestCar: 'Alto',
      requestCarModal: "pata12",
      requestCarAvability: 'Available',
      vehicleNumberPlate: 'ABC1234', // Example vehicle number plate
      driverType: 'Rental', // Example type of driver
      carImage: 'path_to_car_image',
      requestStatus: 'Pending',
      allocationStatus: 'Pending',
    },
    {
      key: '2',
      driverName: 'Jane Smith',
      driverID: 'DRV002',
      driverNumber: '0987654321',
      requestCarId: "12123",
      requestCar: 'Tesla',
      requestCarModal: "modelX",
      requestCarAvability: 'Not Available',
      vehicleNumberPlate: 'XYZ5678', // Example vehicle number plate
      driverType: 'Chola Employ', // Example type of driver
      carImage: 'path_to_car_image',
      requestStatus: 'Approved',
      allocationStatus: 'Allocated',
    },
    // Add more data as needed
  ];

  return (
    <div>
      <h1 className='text-black text-3xl font-semibold ml-4 mt-3'>WareHouse Management</h1>
      <div className="overflow-x-auto mt-20 ml-10 mr-10">
        <div className="bg-white">
          <Table<DriverData>
            columns={columns}
            dataSource={data}
            pagination={false}
            className="font-semibold font-montserrat"
          />
          <Modal
            title="Driver and Car Details"
            visible={modalVisible}
            onCancel={closeModal}
            footer={null}
          >
            {selectedRecord && (
              <div className="mt-8 font-semibold text-[14px] font-montserrat flex flex-wrap">
                <div className="w-1/2 mb-4">
                  <p className="mb-8">Driver Name: {selectedRecord.driverName}</p>
                  <p className="mb-2">Driver ID: {selectedRecord.driverID}</p>
                </div>
                <div className="w-1/2 mb-4">
                  <p className="mb-8">Driver Number: {selectedRecord.driverNumber}</p>
                </div>
                <div className="w-1/2 mb-4">
                  <p className="mb-8">Requested CarID: {selectedRecord.requestCarId}</p>
                  <p className="mb-2">Requested Car: {selectedRecord.requestCar}</p>
                </div>
                <div className="w-1/2 mb-4">
                  <p className="mb-8">Requested Car: {selectedRecord.requestCarModal}</p>
                  <p className="mb-2">Requested Car Availablity: {selectedRecord.requestCarAvability}</p>
                </div>
                <div className="w-1/2 mb-4">
                  <p className="mb-8">Vehicle Number Plate: {selectedRecord.vehicleNumberPlate}</p>
                  <p className="mb-2">Type of Driver: {selectedRecord.driverType}</p>
                </div>
                <div className="w-full flex mr-10 justify-center">
                  <button  className=" mr-8 bg-gray-950 text-white px-4 py-2 rounded-lg hover:scale-105 transition duration-300 ease-in-out
                   hover:bg-purple-400" >
                    Approve
                  </button>
                  <button  onClick={()=>handleAllocation(selectedRecord)} className='bg-gray-950 text-white px-4 py-2 rounded-lg hover:scale-105 transition duration-300 ease-in-out hover:bg-purple-400' >
                    Allocate
                  </button>
                </div>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default DriverCarApproval;