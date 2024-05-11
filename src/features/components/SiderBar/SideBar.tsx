import React from 'react';
import { Link } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { TbReportSearch } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
import { FaCarSide } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { LeftOutlined } from '@ant-design/icons';
import './style.css'

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const menus = [
    { title: "Dashboard", icon: <MdDashboard />, path: "/" },
    { title: "All Users", icon: <FiUsers />, path: "/rider-table" },
    { title: "Reports", icon: <TbReportSearch />, path: "/driver-table" },
    { title: "Transactions", icon: <GrTransaction />, path: "/admin-table" },
    { title: "Rides", icon: <FaCarSide />, path: "/driver-sercharges" },
    { title: "Feedbacks", icon: <MdFeedback />, path: "/driver-sercharges-map" },
    { title: "API", icon: <MdFeedback />, path: "/api" },
    { title: "Notifications", icon: <MdFeedback  />, path: "/notifications" },
    { title: "Account Update", icon: <MdFeedback  />, path: "/accountUpdate" },
    { title: "User Logs", icon: <MdFeedback  />, path: "/user-logs" },
    { title: "Car Management", icon: <MdFeedback  />, path: "/CarManagement" },
    { title: "Driver Requests", icon: <MdFeedback  />, path: "/driver-Requests" },
  ];

  return (
    <div className="flex font-montserrat">
      <div className={`duration-300  pt-1 relative`}>
        <div className='border-dark mb-6 bg-black'>
          <LeftOutlined
            size={40}
            className={`    ${!open && " rotate-180  left-12 "}
              absolute text-black border-2 
               duration-500 rounded-full pr-1
              cursor-pointer -right-1 h-6 w-6
              top-10 bg-white
            `}
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className={`flex gap-x-4 items-center`}>
          
        </div>
        <div className='sidebar-scroll  '>
        <ul className='pt-8  '>
          {menus.map((menu, index) => (
            <li key={index} className={`
        
            text-white
             text-md
               font-montserrat
          
             cursor-pointer
             hover:bg-purple-400
               hover:text-white py-1
               rounded-l-full  `}>
              <Link to={menu.path} className="flex 
              cursor-pointer py-2 font-montserrat ">
                <div className='flex   gap-x-2   '>

                <span className={`text-lg  
                 mb-2  ${ open ? 'mr-2':'mr-[40px]' } `}>{menu.icon}</span>
                <span className={`${!open && 'hidden'} 
                origin-left w-40
                 duration-200
                  font-montserrat `}>{menu.title}</span>
                </div>
              
              </Link>
            </li>
          ))}
        </ul>
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
