import { useCallback, useState } from "react";

const useSearchModal = () => {
  const [isOpen, setIsopen] = useState(false);

  // callback function to toggle open & close - will not change as both have empty dependency array
  // stable reference to functions across renders
  const onOpen = useCallback(() => {
    setIsopen(true);
  }, []);
  const onClose = useCallback(() => {
    setIsopen(false);
  }, []);
  // return isOpen value, onClose and onOpen functions in hook
  return { isOpen, onClose, onOpen };
};

export default useSearchModal;
