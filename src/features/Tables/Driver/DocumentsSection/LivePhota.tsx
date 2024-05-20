import React from 'react';
import { Descriptions, Button, Switch } from 'antd';


interface DriverImage {
  livePhoto:string
}

interface LiveImageProps {
  imagedata: DriverImage;
}

const LiveImage: React.FC<LiveImageProps> = ({ imagedata}) => {
  return (
    <Descriptions bordered column={1} className="font-semibold">
 <Descriptions.Item label="Live Image">
      <img src={imagedata.livePhoto} alt="Live Image" style={{ maxWidth: '100%' }} />
     
    </Descriptions.Item>

    <Descriptions.Item label="Aadhar Verified">
        <Switch />
      </Descriptions.Item>
    </Descriptions>
   
  );
};

export default LiveImage;