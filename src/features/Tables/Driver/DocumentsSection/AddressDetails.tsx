import React from 'react';
import { Descriptions, Switch } from 'antd';

interface AddressData {
  country: string;
  state: string;
  city: string;
  postalCode: string;
  houseNumber: string;
  apartmentSuit?: string;
  address1: string;
  address2?: string;
  verified: boolean;
}

interface AddressProps {
  addressData: AddressData;
}

const Address: React.FC<AddressProps> = ({ addressData }) => {
  return (
    <Descriptions bordered column={1} className="font-semibold">
      <Descriptions.Item label="Country">{addressData.country}</Descriptions.Item>
      <Descriptions.Item label="State">{addressData.state}</Descriptions.Item>
      <Descriptions.Item label="City">{addressData.city}</Descriptions.Item>
      <Descriptions.Item label="Postal Code">{addressData.postalCode}</Descriptions.Item>
      <Descriptions.Item label="House Number">{addressData.houseNumber}</Descriptions.Item>
      {addressData.apartmentSuit && (
        <Descriptions.Item label="Apartment/Suite">{addressData.apartmentSuit}</Descriptions.Item>
      )}
      <Descriptions.Item label="Address Line 1">{addressData.address1}</Descriptions.Item>
      {addressData.address2 && (
        <Descriptions.Item label="Address Line 2">{addressData.address2}</Descriptions.Item>
      )}
      <Descriptions.Item label="Verified">
        <Switch checked={addressData.verified} />
      </Descriptions.Item>
    </Descriptions>
  );
};

export default Address;