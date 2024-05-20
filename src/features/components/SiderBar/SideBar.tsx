import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { TbReportSearch } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
import { FaCarSide } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { LeftOutlined } from '@ant-design/icons';
import { MdAdminPanelSettings } from "react-icons/md";
import './style.css';

interface MenuItem {
  title: string;
  icon: JSX.Element;
  path: string;
  submenus?: MenuItem[];
}

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const location = useLocation();

  const menus: MenuItem[] = [
    { title: "Dashboard", icon: <MdDashboard />, path: "/", submenus: [
      // { title: "Submenu 1",icon: <MdDashboard /> ,path: "/submenu1" },
      // { title: "Submenu 2",icon: <MdDashboard />, path: "/submenu2" },
    ]},
    { title: "All Users", icon: <FiUsers />, path: "/rider-table" },
    // { title: "Reports", icon: <TbReportSearch />, path: "/driver-table" },
    { title: "Admin", icon: <MdAdminPanelSettings />, path: "/admin-table" },
    { title: "Rides", icon: <FaCarSide />, path: "/notifications" },
    { title: "Feedbacks", icon: <MdFeedback />, path: "/driver-sercharges-map" },
    { title: "Drivers", icon: <MdFeedback />, path: "/drivers" },
    { title: "Users Logs", icon: <MdFeedback />, path: "/user-logs" },
    { title: "Car Managments", icon: <MdFeedback />, path: "/CarManagement" },
    { title: "driver Requests", icon: <MdFeedback />, path: "/driver-Requests" },
    { title: "account Update", icon: <MdFeedback />, path: "/accountUpdate" },
    { title: "Apis", icon: <MdFeedback />, path: "/api" },
    { title: "Feedbacks", icon: <MdFeedback />, path: "/driver-sercharges" },



    


   


    




    // Add more menu items as needed
  ];

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <div className="flex font-poppins ">
      <div className={`duration-300 pt-1 relative`}>
        <div className='border-dark mb-6 bg-black'>
          <LeftOutlined
            size={40}
            className={` ${!open && "rotate-180 left-12"} absolute
             text-black border-2 duration-500 rounded-full pr-1 cursor-pointer -right-1
             h-6 w-6 top-10 bg-white`}
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className='sidebar-scroll'>
          <ul className='pt-8'>
            {menus.map((menu, index) => (
              <li key={index} className={`text-white text-md cursor-pointer py-1 rounded-l-full ${isActive(menu.path) ? "bg-purple-400" : ""}`}>
                <Link to={menu.path} className="flex cursor-pointer py-2 ">
                  <div className='flex gap-x-2  '>
                    <span className={`text-lg mb-2 px-2 ${open ? 'mr-[3px]' : 'mr-[40px]'}`}>{menu.icon}</span>
                    <span className={`${!open && 'hidden'} origin-left w-[145px] duration-200 font-montserrat`}>{menu.title}</span>
                  </div>
                </Link>
                {menu.submenus && open && (
                  <ul className={`submenu ${isActive(menu.path) ? "active ml-20" : ""}`}>
                    {menu.submenus.map((submenu, subIndex) => (
                      <li key={subIndex}>
                        <Link to={submenu.path} className={`${isActive(submenu.path) 
                          ? "bg-purple-400" : ""}`}>{submenu.title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;