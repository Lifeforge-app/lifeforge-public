import React from "react";

function NotFound(): React.ReactElement {
  return (
    <div className="flex-center flex h-full w-full flex-col gap-6">
      <h1 className="text-[10rem] text-lime-500">;-;</h1>
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <h2 className="-mt-2 text-xl text-zinc-500">
        The page you are looking for does not exist.
      </h2>
    </div>
  );
}

export default NotFound;
