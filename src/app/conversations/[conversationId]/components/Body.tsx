"use client";

import useConversation from "@/hooks/useConversation";
import { pusherClient } from "@/lib/pusher";
import { FullMessageType } from "@/types";
import axios from "axios";
import { find } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";

interface Props {
  initialMessages: FullMessageType[];
}

const Body = (props: Props) => {
  const { initialMessages } = props;
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
  const { conversationId } = useConversation();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    ref.current?.scrollIntoView({ behavior: "smooth" });

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      console.log(message);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });

      ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    pusherClient.bind("messages:new", messageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          isLast={i === messages.length - 1}
          data={message}
        />
      ))}
      <div className="pt-24" ref={ref} />
    </div>
  );
};

export default Body;
