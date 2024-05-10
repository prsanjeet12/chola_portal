import React from 'react';
import { MdDashboard } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { TbReportSearch } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
import { FaCarSide } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { LeftOutlined } from '@ant-design/icons';

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const menus = [
    { title: "Dashboard", icon: <MdDashboard /> },
    { title: "All Users", icon: <FiUsers /> },
    { title: "Reports", icon: <TbReportSearch /> },
    { title: "Transactions", icon: <GrTransaction /> },
    { title: "Rides", icon: <FaCarSide /> },
    { title: "Feedbacks", icon: <MdFeedback /> }
  ];

  return (
    <div className="flex font-montserrat">
      <div className={`duration-300 p-3 pt-1 relative`}>
        <div className='border-dark mb-6 bg-black'>
          <LeftOutlined
            size={40}
            className={`    ${!open && " rotate-180  left-12 "}
              absolute text-black border-2  duration-500 rounded-full pr-1
              cursor-pointer -right-8 h-6 w-6
              top-10 bg-white
            `}
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className={`flex gap-x-4 items-center`}>
          {/* Logo component goes here */}
        </div>
        <ul className='pt-8'>
          {menus.map((menu, index) => (
            <li key={index} className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-1 hover:bg-black hover:text-white rounded-md`}>
              <div className='flex gap-x-4 cursor-pointer p-1 font-montserrat'>
                <span className='text-lg mb-4'>{menu.icon}</span>
                <span className={`${!open && 'hidden'} origin-left duration-200 font-montserrat`}>{menu.title}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;