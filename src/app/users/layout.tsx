import Sidebar from "@/components/sidebar/Sidebar";
import React, { ReactNode } from "react";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = (props: UserLayoutProps) => {
  const { children } = props;
  return (
    <Sidebar>
      <div className="w-full">{children}</div>
    </Sidebar>
  );
};

export default UserLayout;
