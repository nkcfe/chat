import React, { ReactNode } from "react";

interface ConversationLayoutProps {
  children: ReactNode;
}

const ConversationLayout = (props: ConversationLayoutProps) => {
  const { children } = props;
  return <div className="w-full">{children}</div>;
};

export default ConversationLayout;
