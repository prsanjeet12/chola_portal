import React from 'react';
import { Descriptions, Button } from 'antd';

interface VehicleData {
  vehicleTypeId: string;
  vehicleCompany: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  licensePlateNo: string;
  vehicleImage: string;
}

interface VehicleDetailsProps {
  vehicleData: VehicleData;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ vehicleData }) => {
  return (
    <div>
      <Descriptions bordered column={1}
       className="font-semibold">
        <Descriptions.Item label="Vehicle Type">{vehicleData.vehicleTypeId}</Descriptions.Item>
        <Descriptions.Item label="Company">{vehicleData.vehicleCompany}</Descriptions.Item>
        <Descriptions.Item label="Model">{vehicleData.vehicleModel}</Descriptions.Item>
        <Descriptions.Item label="Year">{vehicleData.vehicleYear}</Descriptions.Item>
        <Descriptions.Item label="Color">{vehicleData.vehicleColor}</Descriptions.Item>
        <Descriptions.Item label="License Plate No">{vehicleData.licensePlateNo}</Descriptions.Item>
        <Descriptions.Item label="Vehicle Image">
          <img src={vehicleData.vehicleImage} alt="Vehicle" style={{ maxWidth: '100%' }} />
        </Descriptions.Item>
      </Descriptions>
      {/* You can add a button or any other UI elements here */}
    </div>
  );
};

export default VehicleDetails;
