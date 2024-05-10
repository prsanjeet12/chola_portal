

import React, { useState } from 'react';
import { Tooltip, Button,Popover } from 'antd';
import { CiLogout } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
// import User from '../../images/User.png';
import User from '../../assets/User.png'


const Header: React.FC= () => {
  const navigate = useNavigate();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleTooltipVisibleChange = (visible:boolean) => {
    setIsTooltipVisible(visible);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    navigate('/accountupdate');
    setIsTooltipVisible(false);
  };

  return (
    <div className='flex 
    items-center bg-white  
    h-[70px] shadow-lg   justify-end'>
       <div className="flex
        items-end
        justify-end
gap-1">
       
      </div>
      
      <div>
        <div>
        <Popover
  content={
    <div className=''>
      <button  className='flex bg-black px-3 py-2 rounded-md text-white flex-col sm:flex-row mb-4' onClick={() => navigate('/admin/accountupdate')}>
        Update 
      </button>
      <button  className='bg-black px-3 py-2 rounded-md text-white ' onClick={() => navigate('/admin-login')}>
Logout 
      </button>
    </div>
  }
  trigger='hover' // Change trigger to 'hover'
  placement='bottomRight'
>
  <div className='mr-8 mt-4'>
    <img src={User} alt='' />
  </div>
</Popover>;
        </div>
      </div>
    </div>
  );
};

export default Header;
