import React from "react";
import { Icon } from "@iconify/react";
import ModuleWrapper from "../../components/ModuleWrapper";

function Home(): React.ReactElement {
  return (
    <ModuleWrapper>
      <div className="flex items-center justify-center w-full flex-col h-full">
        <h1 className="ml-1 flex shrink-0 items-center gap-2 whitespace-nowrap text-5xl font-semibold text-zinc-800 dark:text-zinc-100">
          <Icon icon="tabler:hammer" className="text-6xl text-lime-500" />
          <div>
            LifeForge<span className="text-6xl text-lime-500">.</span>
          </div>
        </h1>
        <p className="mt-6 text-xl font-light text-zinc-800 dark:text-zinc-500">
          Your all in one platform for life management.
        </p>

        <div className="bg-yellow-500/20 p-4 rounded-md flex items-start gap-2 mt-12 border-l-4 border-yellow-500">
          <Icon
            icon="tabler:alert-hexagon-filled"
            className="text-2xl shrink-0 mt-1 text-zinc-100"
          />
          <p className="text-lg font-light text-zinc-100">
            This is a public portal for the system. For the actual system,
            please host it yourself.
          </p>
        </div>
      </div>
    </ModuleWrapper>
  );
}

export default Home;
