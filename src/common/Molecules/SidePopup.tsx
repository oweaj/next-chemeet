import { ForwardedRef, forwardRef, MouseEventHandler } from "react";
import { TModalPortalProps } from "@/types/component/props";
import Button from "@/common/Atoms/Form/Button";
import { CloseIcon } from "@/common/Atoms/Image/Icon";
import ModalBackdrop from "@/common/Molecules/ModalPortal/ModalBackdrop";

const SidePopup = forwardRef(
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
        className="fixed top-0 left-0 w-screen h-screen lg:hidden flex items-center justify-end lg:px-[96px] lg:py-[94px] bg-transparent z-modal"
        onClick={onClose}
      >
        <ModalBackdrop></ModalBackdrop>
        <div
          className="relative w-full h-full sm:w-[240px] sm:h-full bg-white p-4 overflow-hidden z-modal"
          onClick={stopPropagation}
        >
          <Button.Icon onClick={onClose}>
            <CloseIcon stroke="#464748" />
          </Button.Icon>
          <div className="h-full overflow-auto py-8">{children}</div>
        </div>
      </dialog>
    );
  }
);

SidePopup.displayName = "SidePopup";

export default SidePopup;
