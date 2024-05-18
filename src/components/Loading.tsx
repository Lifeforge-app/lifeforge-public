import React from "react";
import { Icon } from "@iconify/react";

export default function Loading({
  customMessage,
}: {
  customMessage?: string;
}): React.ReactElement {
  return (
    <div className="flex-center flex h-full w-full flex-col gap-6">
      <Icon icon="svg-spinners:180-ring" className="h-12 w-12 text-zinc-500" />
      <p className="text-lg font-medium text-zinc-500">
        {customMessage ?? "Loading data"}
      </p>
    </div>
  );
}
