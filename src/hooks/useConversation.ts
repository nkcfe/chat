"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.conversationId) return;

    return params.conversationId;
  }, [params?.conversationId]);

  const isOpen = !!conversationId;

  return { conversationId, isOpen };
};

export default useConversation;

// useMemo를 사용하면 conversationId가 변경될 때만 새로운 값을 계산하게 되고
// return을 통해 함수가 아니라 conversationId를 반환하게 된다.
