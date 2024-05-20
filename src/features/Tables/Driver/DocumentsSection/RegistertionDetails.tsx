import React from 'react';
import { Descriptions } from 'antd';

interface RegistrationData {
  registrationCard: string;
  registrationExpiryDate: string;
  registrationFront: string;
  registrationBack: string;
}

interface RegistrationDetailsProps {
  registrationData: RegistrationData;
}

const RegistrationDetails: React.FC<RegistrationDetailsProps> = ({ registrationData }) => {
  return (
    <Descriptions bordered column={1} className="font-semibold">
      <Descriptions.Item label="Registration Card">{registrationData.registrationCard}</Descriptions.Item>
      <Descriptions.Item label="Expiry Date">{registrationData.registrationExpiryDate}</Descriptions.Item>
      <Descriptions.Item label="Registration Front">
        <img src={registrationData.registrationFront} alt="Registration Front" style={{ maxWidth: '100%' }} />
      </Descriptions.Item>
      <Descriptions.Item label="Registration Back">
        <img src={registrationData.registrationBack} alt="Registration Back" style={{ maxWidth: '100%' }} />
      </Descriptions.Item>
    </Descriptions>
  );
};

export default RegistrationDetails;