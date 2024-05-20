import React from 'react';
import { Descriptions, Switch } from 'antd';

interface DriverData {
  userId: string;
  aadharCardNo: string;
  aadharFront: string;
  aadharBack: string;
  aadharVerified: boolean;
  aadharVerifiedBy: string;
  panCardNo: string;
  panFront: string;
  panBack: string;
  panVerified: boolean;
}

interface DriverIDProps {
  driverData: DriverData;
  handleDocumentVerify: (userId: any, documentType: string, isVerified: boolean)=>void;

}

const DriverID: React.FC<DriverIDProps> = ({ driverData, handleDocumentVerify }) => {
  const onSwitchChange = (documentType: string, checked: boolean) => {
    handleDocumentVerify(parseInt(driverData.userId), documentType, checked);
    console.log(driverData.userId)


  };

  return (
    <Descriptions bordered column={1} className="font-semibold">
      {/* <Descriptions.Item label="Driver ID">{driverData.id}</Descriptions.Item> */}
      <Descriptions.Item label="Aadhar Number">{driverData.aadharCardNo}</Descriptions.Item>
      <Descriptions.Item label="Aadhar Front">
        <img src={driverData.aadharFront} alt="Aadhar Front" style={{ width: '100%' }} />
      </Descriptions.Item>
      <Descriptions.Item label="Aadhar Back">
        <img src={driverData.aadharBack} alt="Aadhar Back" style={{ height:'200px', width: '100%' }} />
      </Descriptions.Item>
      <Descriptions.Item label="Aadhar Verified">
        <Switch 
          checked={driverData.aadharVerified} 
          onChange={(checked) => onSwitchChange('aadharVerified', checked)}
        />
      </Descriptions.Item>
      <Descriptions.Item label="Aadhar Verified By">{driverData.aadharVerifiedBy}</Descriptions.Item>
      <Descriptions.Item label="PAN Number">{driverData.panCardNo}</Descriptions.Item>
      <Descriptions.Item label="PAN Image">
        <img src={driverData.panFront} alt="PAN Image" style={{ width: '100%' }} />
      </Descriptions.Item>
      <Descriptions.Item label="PAN Verified">
        <Switch 
          checked={driverData.panVerified} 
          onChange={(checked) => onSwitchChange('panVerified', checked)}
        />
      </Descriptions.Item>
    </Descriptions>
  );
};

export default DriverID;