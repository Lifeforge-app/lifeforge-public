import { Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import React from "react";

function HamburgerMenu({
  children,
  className,
  lighter,
  largerPadding,
  smallerPadding,
  customWidth,
  customIcon,
  onButtonClick,
  onClose,
}: {
  children: React.ReactNode;
  className: string;
  lighter?: boolean;
  largerPadding?: boolean;
  smallerPadding?: boolean;
  customWidth?: string;
  customIcon?: string;
  onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClose?: () => void;
}): React.ReactElement {
  return (
    <Menu as="div" className={className}>
      <Menu.Button
        onClick={onButtonClick}
        className={`rounded-md ${
          largerPadding === true
            ? "p-4"
            : smallerPadding === true
            ? "p-1"
            : "p-2"
        } ${
          lighter === true
            ? "text-zinc-100 hover:bg-zinc-700/50"
            : "text-zinc-500 hover:bg-zinc-200/50 hover:text-zinc-100 dark:hover:bg-zinc-700/30"
        }`}
      >
        <Icon icon={customIcon ?? "tabler:dots-vertical"} className="h-5 w-5" />
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="absolute right-0 top-4 z-50"
        afterLeave={onClose}
      >
        <Menu.Items
          className={`mt-6 ${
            customWidth ?? "w-48"
          } overflow-hidden overscroll-contain rounded-md border border-zinc-700 bg-zinc-100 shadow-lg outline-none focus:outline-none dark:bg-zinc-800`}
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default HamburgerMenu;
