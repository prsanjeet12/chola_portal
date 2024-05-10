import React from 'react';
import { Descriptions, Switch } from 'antd';

export interface DriverData {
  insuranceProvider: string;
  insuranceNo: string;
  insuranceExpiryDate?: Date;
  insuranceVerified?: boolean;
  insuranceVerifiedBy?: string;
}

interface InsuranceProvidersSectionProps {
  driverData: DriverData;
}

const InsuranceProvidersSection: React.FC<InsuranceProvidersSectionProps> = ({ driverData }) => {
  return (
    <div>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Insurance Provider">{driverData.insuranceProvider}</Descriptions.Item>
        <Descriptions.Item label="Insurance Number">{driverData.insuranceNo}</Descriptions.Item>
        <Descriptions.Item label="Insurance Expiry Date">
          {driverData.insuranceExpiryDate?.toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Insurance Verified">
          <Switch checked={driverData.insuranceVerified} disabled />
        </Descriptions.Item>
        <Descriptions.Item label="Insurance Verified By">{driverData.insuranceVerifiedBy}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default InsuranceProvidersSection;