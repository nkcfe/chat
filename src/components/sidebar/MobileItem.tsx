import Link from "next/link";
import React from "react";
import { IconType } from "react-icons/lib";

interface MobileItemProps {
  href: string;
  icon: IconType;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem = (props: MobileItemProps) => {
  const { href, icon: Icon, onClick, active } = props;

  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100`}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
