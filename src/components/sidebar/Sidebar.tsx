import React, { ReactNode } from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar = async (props: SidebarProps) => {
  const { children } = props;

  const currentUser = await getCurrentUser();
  console.log(currentUser);

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser} />
      <MobileFooter />
      <main className="h-full lg:pl-20">{children}</main>
    </div>
  );
};

export default Sidebar;
