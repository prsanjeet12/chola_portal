import React from 'react';
import { Card } from 'antd';


import { FaUsers as FaUsers6 } from 'react-icons/fa6';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import User from '../../assets/user (1).png'
import Drivers from '../../assets/driving.png'


const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 font-montserrat">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8">
        <Link to="/user-table">
          <Card
            className=" text-black rounded-md
             flex items-center h-[120px] shadow-lg 
  transition-colors duration-300"
            onClick={() => navigate('/user-table')}
          >
            <div className='bg-purple-300 py-2 px-2 rounded-full '>
            <img src={User}  className="mx-auto h-8 w-8" alt="" />
            </div>
           
            {/* <FiUsers size={60}  /> */}
            <div className="absolute font-montserrat
             inset-y-0 justify-center text-2xl
             mt-10
             ml-20 items-center   ">
              <span className=" font-bold pr-2 mb-2 gap-">6000</span>
              <span className=" font-bold">Users</span>
            </div>
          </Card>
        </Link>
        <Link to="">
          <Card
            className=" text-black rounded-md flex items-center h-[120px] shadow-lg relative transition-colors duration-300"
            onClick={() => navigate('/driver-table')}
          >
            {/* <FaCar size={60} className="mx-auto" /> */}
            <div className='bg-purple-300 py-2 px-2 rounded-full '>
            <img src={Drivers}  className="mx-auto h-8 w-8" alt="" />
            </div>
            <div className="absolute font-montserrat
             inset-y-0 justify-center text-2xl
             mt-10
             ml-20 items-center    ">
              <span className=" font-bold pr-2 mb-2 gap-">2000</span>
              <span className=" font-bold">Drivers</span>
            </div>
          </Card>
        </Link>
        <Link to="/rider-table">
          <Card
            className=" text-black rounded-md flex items-center h-[120px] shadow-lg relative  transition-colors duration-300"
            onClick={() => navigate('/rider-table')}
          >
            {/* <FaUsers6 size={60} className="mx-auto" /> */}
            <div className='bg-purple-300 py-2 px-2 rounded-full '>
      <FaUsers6  className="mx-auto h-8 w-8" />
            </div>
            
            <div className="absolute font-montserrat
             inset-y-0 justify-center text-2xl
             mt-10
             ml-20 items-center   ">
              <span className=" font-bold pr-2 mb-2 gap-">4000</span>
              <span className=" font-bold">Riders</span>
            </div>
          </Card>
        </Link>
      </div>
      <div>
       
      </div>
    </div>
  );
};

export default Dashboard;