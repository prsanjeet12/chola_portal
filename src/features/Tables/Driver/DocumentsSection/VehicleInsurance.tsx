import { Descriptions } from 'antd'
import React from 'react'

interface VehicleInsuranceData {
    carinsuranceNo:string,
    expiryDateCarInsurance:string,
    carInsuranceFront:string,
    carInsuranceBack:string
}


interface VehicleInsuranceProps {
    vehicleInsuranceData:VehicleInsuranceData
}

const VehicleInsurance: React.FC<VehicleInsuranceProps> = ({vehicleInsuranceData}) => {
  return (
    <div>
        <Descriptions bordered column={1} 
        className='font-semibold'
        >
   <Descriptions.Item label="carinsuranceNo">

    {vehicleInsuranceData.carinsuranceNo}
   </Descriptions.Item>
   <Descriptions.Item label="carinsuranceNo">

{vehicleInsuranceData.expiryDateCarInsurance}
</Descriptions.Item>
<Descriptions.Item label="Vehicle Image">
          <img src={vehicleInsuranceData.carInsuranceFront} alt="Vehicle" style={{ maxWidth: '100%' }} />
        </Descriptions.Item>
        <Descriptions.Item label="Vehicle Image">
          <img src={vehicleInsuranceData.carInsuranceBack} alt="Vehicle" style={{ maxWidth: '100%' }} />
        </Descriptions.Item>

        </Descriptions>
      
    </div>
  )
}

export default VehicleInsurance



