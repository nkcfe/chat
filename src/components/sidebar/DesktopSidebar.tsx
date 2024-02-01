"use client";

import useRoutes from "@/hooks/useRoutes";
import { User } from "@prisma/client";
import React, { useState } from "react";
import DesktopItem from "./DesktopItem";
import Avatar from "../Avatar";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar = (props: DesktopSidebarProps) => {
  const { currentUser } = props;
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`hidden
        lg:fixed
        lg:inset-y-0
        lg:left-0
        xl:px-6
        lg:z-40
        lg:border-r-[1px]
        lg:bg-orange-400
        lg:pb-4
        lg:flex
        lg:flex-col
        justify-between
        lg:overflow-y-auto`}
    >
      <nav
        className={`
          flex
          flex-col
          justify-between
          mt-4`}
      >
        <ul
          className={`
          flex
          flex-col
          items-center
          space-y-1
        `}
        >
          {routes.map((item) => (
            <DesktopItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
      <nav
        className={`
        flex
        flex-col
        items-center
        justify-between
        mt-4
        `}
      >
        <div
          className={`
          transition
          cursor-pointer
          hover:opacity-75
        `}
          onClick={() => setIsOpen(true)}
        >
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  );
};

export default DesktopSidebar;
