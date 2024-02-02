import Sidebar from "@/components/sidebar/Sidebar";
import React, { ReactNode } from "react";
import UserList from "./components/UserList";
import getUsers from "../actions/getUsers";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = async (props: UserLayoutProps) => {
  const { children } = props;
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
};

export default UserLayout;
