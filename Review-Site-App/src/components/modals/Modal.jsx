import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  // set show modal to isOpen value on mount
  useEffect(() => {
    setShowModal(isOpen);
    // Add 'overflow-hidden' to body to prevent background scrolling
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    }

    // Clean up the class when component unmounts or modal closes
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);

    // timeout for onClose to align with animation
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  // must be above return null conditional to avoid extra render error
  //  remove this if it interferes with loading aspects!!
  useEffect(() => {
    const handleEscapeKeyClose = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKeyClose);

    return () => document.removeEventListener("keydown", handleEscapeKeyClose);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center  bg-neutral-800/70 outline-none focus:outline-none">
        <div className="relative mx-auto my-6 w-full overflow-y-auto h-full md:h-auto md:w-4/6 lg:w-3/6 xl:w-2/5">
          {/* CONTENT */}
          {/* animation on open close of modal */}
          <div
            className={`translate h-full duration-300 ${showModal ? "translate-y-0" : "translate-y-full"} ${showModal ? "opacity-100" : "opacity-0"} `}
          >
            <div className="translate relative flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto">
              {/* HEADER */}
              <div className="relative flex items-center justify-center rounded-t border-b p-6">
                <button
                  onClick={handleClose}
                  className="absolute left-9 border-0 p-1 transition hover:opacity-70"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* BODY */}
              <div className="relative flex-auto p-6">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex w-full flex-row items-center gap-4">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
