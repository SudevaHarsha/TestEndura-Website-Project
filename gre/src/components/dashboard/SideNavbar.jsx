"use client"

import React, { useEffect, useState } from "react";

const SideNavbar = ({ users,setNavState }) => {

  /* const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("enetered");
      try {
        const response = await axios.get("/api/all-users");
        setUsers(response.data.users);
        console.log("Dashboard", response);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, []); */

  console.log(users);
  return (
    <div className="bg-gray-100 text-black w-64 flex flex-col rounded-3xl mr-2 min-h-[93vh] h-auto">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center">
        <img src="/logo.png" alt="Logo" className="h-8" />
      </div>
      {/* Fields */}
      <div className="flex flex-col flex-grow">
        <div className="px-4 py-2 hover:bg-gray-300 rounded cursor-pointer" onClick={()=> setNavState('dashboard')}>Dashboard</div>
        <div>
          <div className="px-4 py-2 hover:bg-gray-300 rounded cursor-pointer" onClick={()=> setNavState('users')}>Users</div>
          <div className="px-4 py-2 hover:bg-gray-300 rounded cursor-pointer" onClick={()=> setNavState('tests')}>Tests</div>
          <div className="px-4 py-2 hover:bg-gray-300 rounded cursor-pointer" onClick={()=> setNavState('question types')}>Question Types</div>
          {/* <div>
            {
              users.map((user)=>(
                <div>
                  {user.name}
                </div>
              ))
            }
          </div> */}
        </div>
        <div className="px-4 py-2 hover:bg-gray-300 rounded cursor-pointer" onClick={()=>setNavState('question')}>Create Question</div>
        <div className="px-4 py-2 hover:bg-gray-300 rounded cursor-pointer" onClick={()=>setNavState('test')}>Create Test</div>
        <div className="px-4 py-2 hover:bg-gray-300 rounded cursor-pointer" onClick={()=>setNavState('type')}>Create Question Type</div>
        {/* Add more field links as needed */}
      </div>
    </div>
  );
};

export default SideNavbar;
