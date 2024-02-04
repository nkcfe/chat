"use client";

import Avatar from "@/components/Avatar";
import LoadingModal from "@/components/modals/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface UserBoxProps {
  data: User;
}

const UserBox = (props: UserBoxProps) => {
  const { data } = props;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);
    console.log("hi");
    axios
      .post("/api/conversations", { userId: data.id })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className={`w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer`}
      >
        <Avatar />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-gray-900">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
