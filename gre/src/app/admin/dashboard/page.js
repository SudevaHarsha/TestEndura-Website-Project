import Dashboard from "@/components/dashboard/Dashboard";
import DashboardTable from "@/components/dashboard/DashboardTable";
import SideNavbar from "@/components/dashboard/SideNavbar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { RedirectToSignIn, redirectToSignUp } from "@clerk/nextjs";
import { redirect } from "next/dist/server/api-utils";

const AdminDashboard = async () => {

  const profile = currentProfile();
  console.log(profile.role);

  if(!profile.role === 'admin') {
    return <RedirectToSignIn />;
  }
  const users = await db.profile.findMany();
  return (
    <div className="flex w-full p-6">
      {/* <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3> */}

      <Dashboard users={users} />
    </div>
  );
};

export default AdminDashboard;
