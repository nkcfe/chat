import Sidebar from "@/components/sidebar/Sidebar";
import React, { ReactNode } from "react";
import ConversationList from "./components/ConversationList";
import getUsers from "../actions/getUsers";
import getConversations from "../actions/getConversations";

interface ConversationLayoutProps {
  children: ReactNode;
}

const ConversationLayout = async (props: ConversationLayoutProps) => {
  const { children } = props;

  const conversations = await getConversations();

  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        {children}
        <ConversationList
          users={users}
          title="Messages"
          initialItems={conversations}
        />
      </div>
    </Sidebar>
  );
};

export default ConversationLayout;
