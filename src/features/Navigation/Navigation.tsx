import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from '../components/SiderBar/SideBar';
import Header from '../Home/Header';
import Dashboard from '../Dashboard/Dashboard';
import DriverTable from '../Tables/Drivers/DriverTable';
import RiderTable from '../Tables/Riders/RiderTable';
import AdminTable from '../Tables/Admins/AdminTable';
import DriverSerchargeTable from '../Tables/Sercharges/DriverSerchargeTable';
import DriverSurchargeMapTable from '../Tables/Sercharges/DriverSerchargeMap';
import Login from '../Login/Login';
import ApiTable from '../Tables/ConfigApi/Api';
import NotificationTable from '../Tables/Notification/NotificationTable';
import AccountUpdate from '../components/AccountUpdate';
import UserLogsTable from '../components/UserLogs';
import CarManagement from '../Tables/WareHouseManagment/CarManagment';
import DriverCarApproval from '../Tables/WareHouseManagment/DriverCarApprovals';
const Navigation: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);


  const handleLogin = () => {
    setAuthenticated(true);
  };

  return (
    <Router>
      <div className="flex bg-[#e6e8f2] h-screen">
     
        {authenticated && (
          <div
            className={`
              ${open ? "w-52" : "w-20"}
              duration-300
              p-5 pt-8
              h-screen
              relative 
              bg-gradient-to-b
              from-gray-900
              to-gray-950`}
          >
            <Sidebar setOpen={setOpen} open={open} />
          </div>
        )}
        <div className="h-full w-screen">
      
          {authenticated && <Header />}
          <Routes>
        
            {authenticated ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/driver-table" element={<DriverTable />} />
                <Route path="/rider-table" element={<RiderTable />} />
                <Route path="/admin-table" element={<AdminTable />} />
                <Route path="/driver-sercharges" element={<DriverSerchargeTable />} />
                <Route path="/driver-sercharges-map" element={<DriverSurchargeMapTable />} />
                <Route path='/api' element={<ApiTable/>}/>
                <Route path='/notifications' element={<NotificationTable notifications={[]} />} />
                <Route path='/accountUpdate' element={<AccountUpdate/>}/>
                <Route path='/user-logs' element={<UserLogsTable/>}/>
                <Route path='/CarManagement' element={<CarManagement/>}/>
                <Route path='/driver-Requests' element={<DriverCarApproval/>}/>

              </>
            ) : (
              <Route
                path="/login"
                element={<Login  />} 
              />
            )}
            {/* onLogin={handleLogin} */}
          
            <Route
              path="*"
              element={authenticated ? <Navigate to="/" /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Navigation;