import { useCallback, useState } from "react";

const useRegisterModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => {
    console.log("open");
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    console.log("close");
    setIsOpen(false);
  }, []);

  return { isOpen, onClose, onOpen };
};

export default useRegisterModal;
