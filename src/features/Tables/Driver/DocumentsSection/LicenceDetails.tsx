import React from 'react';
import { Descriptions, Button } from 'antd';

interface licenseData {
  licenceNo: string;
  licenseExpiryDate: string;
  licenceFront: string;
  licenceBack: string;
}

interface LicenseProps {
  licenseData: licenseData;
}

const LicenseDetails: React.FC<LicenseProps> = ({ licenseData }) => {
  return (
    <div>
      <Descriptions bordered column={1} className="font-semibold">
        <Descriptions.Item label="License Number">{licenseData.licenceNo}</Descriptions.Item>
        <Descriptions.Item label="Expiry Date">{licenseData.licenseExpiryDate}</Descriptions.Item>
        <Descriptions.Item label="License Front">
          <img src={licenseData.licenceFront} alt="License Front" style={{ maxWidth: '100%' }} />
        </Descriptions.Item>
        <Descriptions.Item label="License Back">
          <img src={licenseData.licenceBack} alt="License Back" style={{ maxWidth: '100%' }} />
        </Descriptions.Item>
      </Descriptions>
      <Button type="primary" style={{ marginTop: '10px' }}>Verify</Button>
    </div>
  );
};

export default LicenseDetails;