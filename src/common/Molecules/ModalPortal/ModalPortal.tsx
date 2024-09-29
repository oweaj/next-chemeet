import { ForwardedRef, forwardRef, MouseEventHandler } from "react";
import { TModalPortalProps } from "@/types/component/props";
import ModalBackdrop from "./ModalBackdrop";
import Button from "@/common/Atoms/Form/Button";
import { CloseIcon } from "@/common/Atoms/Image/Icon";

const ModalPortal = forwardRef(
  (
    props: TModalPortalProps<HTMLButtonElement | HTMLDialogElement>,
    ref: ForwardedRef<HTMLDialogElement>
  ) => {
    const { children, onClose } = props;
    const stopPropagation: MouseEventHandler<HTMLDivElement> = (e) => {
      e.stopPropagation();
    };
    return (
      <dialog
        ref={ref}
        className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center lg:px-[96px] lg:py-[94px] bg-transparent z-modal"
        onClick={onClose}
      >
        <ModalBackdrop></ModalBackdrop>
        <div
          className="relative w-full h-full lg:max-w-full lg:max-h-full lg:w-fit lg:h-fit lg:rounded-twenty bg-white p-14 overflow-hidden z-modal"
          onClick={stopPropagation}
        >
          <Button.Icon className="absolute right-8 top-8" onClick={onClose}>
            <CloseIcon />
          </Button.Icon>
          <div className="flex items-center justify-center h-full max-h-[calc(100vh-(94px+56px)*2)] overflow-auto">
            {children}
          </div>
        </div>
      </dialog>
    );
  }
);

ModalPortal.displayName = "ModalPortal";

export default ModalPortal;
