/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Icon } from "@iconify/react";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Zoom from "react-medium-image-zoom";
import { toast } from "react-toastify";
import { type IPhotosEntry } from "./interface";
import useFetch from "../hooks/useFetch";
import MenuItem from "../HamburgerMenu/MenuItem";
import HamburgerMenu from "../HamburgerMenu";

function forceDown(url: string, filename: string): void {
  fetch(url)
    .then(async function (t) {
      await t.blob().then((b) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(b);
        a.setAttribute("download", filename);
        a.click();
      });
    })
    .catch(console.error);
}

function CustomZoomContent({
  img,
  data,
  modalState,
}: {
  buttonUnzoom: React.ReactElement;
  modalState: "LOADING" | "LOADED" | "UNLOADING" | "UNLOADED";
  img: any;
  data: IPhotosEntry;
}): React.ReactElement {
  const [name] = useFetch<string>(
    `photos/entry/name/${data.id}?isInAlbum=true`,
    modalState === "LOADED"
  );

  async function requestDownload(isRaw: boolean): Promise<void> {
    try {
      const { url, fileName } = await fetch(
        `${import.meta.env.VITE_API_HOST}/photos/entry/download/${
          data.id
        }?raw=${isRaw}&isInAlbum=true`
      )
        .then(async (response) => {
          if (response.status !== 200) {
            throw new Error("Failed to get download link.");
          }
          return await response.json();
        })
        .then((data) => {
          return data.data;
        })
        .catch((error) => {
          throw new Error(error as string);
        });

      forceDown(url, fileName);
    } catch (error: any) {
      toast.error(`Failed to get download link. Error: ${error}`);
    }
  }

  return (
    <>
      <div className="flex-center flex h-[100dvh] w-full">
        {img}
        <header className="absolute left-0 top-0 flex w-full items-center justify-between gap-2 p-8">
          {(() => {
            switch (name) {
              case "loading":
                return (
                  <div className="animate-pulse text-lg text-zinc-100">
                    Loading...
                  </div>
                );
              case "error":
                return (
                  <div className="flex items-center gap-2 text-lg text-red-500">
                    <Icon icon="tabler:alert-triangle" className="h-5 w-5" />
                    Failed to load image name
                  </div>
                );
              default:
                return <div className="text-lg text-zinc-100">{name}</div>;
            }
          })()}
          <div className="flex items-center gap-4">
            <HamburgerMenu
              lighter
              className="relative"
              customWidth="w-56"
              customIcon="tabler:download"
              largerPadding
            >
              {data.has_raw && (
                <MenuItem
                  icon="tabler:download"
                  onClick={() => {
                    requestDownload(true).catch(console.error);
                  }}
                  text="Download RAW"
                />
              )}
              <MenuItem
                icon="tabler:download"
                onClick={() => {
                  requestDownload(false).catch(console.error);
                }}
                text="Download JPEG"
              />
            </HamburgerMenu>
          </div>
        </header>
      </div>
    </>
  );
}

function ImageObject({
  photo,
  margin,
  details,
}: {
  photo: any;
  details: IPhotosEntry;
  margin: string;
}): React.ReactElement {
  return (
    <div
      style={{
        margin,
        height: photo.height,
        width: photo.width,
      }}
      className={`group/image relative h-full w-full min-w-[5rem] overflow-hidden ${"bg-zinc-200 dark:bg-zinc-800"} transition-all`}
    >
      <div className={`h-full w-full`}>
        <Zoom
          zoomMargin={100}
          ZoomContent={(props) => (
            <CustomZoomContent {...props} data={details} />
          )}
          zoomImg={{
            src: photo.src
              .split("?")[0]
              .replace(
                import.meta.env.VITE_API_HOST + "/media",
                import.meta.env.VITE_POCKETBASE_ENDPOINT + "/api/files"
              ),
          }}
        >
          <LazyLoadImage
            alt=""
            src={photo.src}
            className={`relative h-full w-full object-cover`}
            delayTime={300}
            delayMethod="debounce"
            threshold={50}
            useIntersectionObserver={false}
          />
        </Zoom>
      </div>
      <div className="absolute right-2 top-2 flex items-center gap-2 text-zinc-200 opacity-50">
        {details.has_raw && <Icon icon="tabler:letter-r" className="h-5 w-5" />}
        {details.is_favourite && (
          <Icon icon="tabler:star" className="h-5 w-5" />
        )}
      </div>
    </div>
  );
}

export default ImageObject;
