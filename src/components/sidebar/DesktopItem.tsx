import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons/lib";

interface DesktopItemProps {
  label: string;
  href: string;
  icon: IconType;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem = (props: DesktopItemProps) => {
  const { label, href, icon: Icon, onClick, active } = props;
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(`
        group
        flex
        gap-x-3
        rounded-md
        p-3
        text-sm
        leading-6
        font-semibold
        text-gray-500
        hover:text-black
        bg-white
        hover:bg-gray-100
      `)}
      >
        <Icon className="w-6 h-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
