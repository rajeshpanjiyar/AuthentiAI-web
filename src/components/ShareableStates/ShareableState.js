import { useState, useCallback } from 'react';
import { useBetween } from 'use-between';

const useStateVariables = () => {
  const [open, setOpen] = useState(false);
  const [chatting, setChatting] = useState(false);

  return {
    open,
    setOpen,
    chatting, 
    setChatting
  };
};

export const useSharedVariables = () => useBetween(useStateVariables);