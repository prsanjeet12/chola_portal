import React from 'react';
import { Descriptions } from 'antd';

interface BankData {
  bankName: string;
  username: string;
  accountNumber: string;
  IFSC: string;
  branchName: string;
}

interface BankDetailsProps {
  bankData: BankData;
}

const BankDetails: React.FC<BankDetailsProps> = ({ bankData }) => {
  return (
    <Descriptions bordered column={1} className="font-semibold">
      <Descriptions.Item label="Bank Name">{bankData.bankName}</Descriptions.Item>
      <Descriptions.Item label="Username">{bankData.username}</Descriptions.Item>
      <Descriptions.Item label="Account Number">{bankData.accountNumber}</Descriptions.Item>
      <Descriptions.Item label="IFSC">{bankData.IFSC}</Descriptions.Item>
      <Descriptions.Item label="Branch Name">{bankData.branchName}</Descriptions.Item>
    </Descriptions>
  );
};

export default BankDetails;