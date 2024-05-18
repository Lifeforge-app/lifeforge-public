import { Menu } from "@headlessui/react";
import { Icon } from "@iconify/react";
import React from "react";

function MenuItem({
  icon,
  text,
  isRed = false,
  onClick,
  isToggled,
}: {
  icon: string;
  text: string;
  isRed?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isToggled?: boolean;
}): React.ReactElement {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={`${
            active
              ? `bg-zinc-200/50 ${
                  isRed ? "text-red-600" : "text-zinc-800"
                } dark:bg-zinc-700 dark:text-zinc-100`
              : isRed
              ? "text-red-500"
              : "text-zinc-500"
          } flex w-full items-center p-4 text-left`}
        >
          <Icon icon={icon} className="h-5 w-5 shrink-0" />
          <span className="ml-4 w-full">{text}</span>
          {isToggled === true && (
            <Icon
              icon="tabler:check"
              className={`${
                isRed ? "text-red-600" : "text-lime-500"
              } ml-4 h-5 w-5 shrink-0`}
            />
          )}
        </button>
      )}
    </Menu.Item>
  );
}

export default MenuItem;
