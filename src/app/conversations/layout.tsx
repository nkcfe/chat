import Sidebar from "@/components/sidebar/Sidebar";
import React, { ReactNode } from "react";

interface ConversationLayoutProps {
  children: ReactNode;
}

const ConversationLayout = (props: ConversationLayoutProps) => {
  const { children } = props;
  return (
    <Sidebar>
      <div className="h-full">{children}</div>
    </Sidebar>
  );
};

export default ConversationLayout;
