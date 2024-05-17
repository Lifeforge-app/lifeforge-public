/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable multiline-ternary */
import { Icon } from "@iconify/react";
import moment from "moment";
import React, { useEffect } from "react";
import Gallery from "react-photo-gallery";
import { useNavigate, useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { IPhotoAlbumEntryItem, IPhotosAlbum } from "./interface";
import APIComponentWithFallback from "../APIComponentWithFallback";
import ModuleWrapper from "../ModuleWrapper";
import ImageObject from "./ImageObject";

function PhotosAlbumGallery(): React.ReactElement {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const [valid] = useFetch<boolean>(`photos/album/valid/${id}`);
  const [isPublic] = useFetch<boolean>(`photos/album/check-publicity/${id}`);
  const [albumData] = useFetch<IPhotosAlbum>(`photos/album/get/${id}`);
  const [photos] = useFetch<IPhotoAlbumEntryItem[]>(`photos/entry/list/${id}`);

  useEffect(() => {
    if (typeof valid === "boolean" && !valid) {
      navigate("/photos/album");
    }
    if (typeof isPublic === "boolean" && !isPublic) {
      navigate("/not-found");
    }
  }, [valid, isPublic]);

  return (
    <APIComponentWithFallback data={albumData}>
      {typeof albumData !== "string" && (
        <>
          <div className="relative min-h-0 w-full flex-1 overflow-y-hidden">
            <ModuleWrapper>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h1 className="flex items-center gap-4 text-2xl font-semibold">
                    <div className="flex-center flex h-14 w-14 shrink-0 rounded-md bg-zinc-200 shadow-md dark:bg-zinc-700/50">
                      {albumData.cover !== "" ? (
                        <img
                          src={`${import.meta.env.VITE_API_HOST}/media/${
                            albumData.cover
                          }?thumb=0x300`}
                          alt=""
                          className="h-full w-full rounded-md object-cover"
                        />
                      ) : (
                        <Icon
                          icon="tabler:library-photo"
                          className="h-8 w-8 text-zinc-500 dark:text-zinc-500"
                        />
                      )}
                    </div>
                    <span className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        {albumData.name}
                        <Icon
                          icon={
                            albumData.is_public ? "tabler:world" : "tabler:lock"
                          }
                          className="h-5 w-5 text-zinc-500"
                        />
                      </div>
                      {(() => {
                        switch (photos) {
                          case "loading":
                            return (
                              <span className="text-sm text-zinc-500">
                                <Icon
                                  icon="svg-spinners:180-ring"
                                  className="h-5 w-5"
                                />
                              </span>
                            );
                          case "error":
                            return (
                              <span className="text-sm text-zinc-500">
                                Error
                              </span>
                            );
                          default:
                            return (
                              <span className="flex items-center gap-2 text-sm font-medium text-zinc-500">
                                {photos.length === 0
                                  ? "No photos added"
                                  : photos.length === 1
                                  ? moment(photos[0].shot_time).format(
                                      "DD MMM YYYY"
                                    )
                                  : `${moment(
                                      photos[photos.length - 1].shot_time
                                    ).format("DD MMM YYYY")} ${
                                      moment(
                                        photos[photos.length - 1].shot_time
                                      ).format("DD MMM YYYY") ===
                                      moment(photos[0].shot_time).format(
                                        "DD MMM YYYY"
                                      )
                                        ? ""
                                        : `to ${moment(
                                            photos[0].shot_time
                                          ).format("DD MMM YYYY")}`
                                    }`}
                                <Icon
                                  icon="tabler:circle-filled"
                                  className="h-1 w-1"
                                />
                                {photos.length.toLocaleString()} photos
                              </span>
                            );
                        }
                      })()}
                    </span>
                  </h1>
                </div>
              </div>
              <div className="relative w-full mt-6 flex-1 overflow-y-auto">
                <APIComponentWithFallback data={photos}>
                  {typeof photos !== "string" && (
                    <Gallery
                      targetRowHeight={200}
                      photos={photos.map((image) => ({
                        src: `${import.meta.env.VITE_API_HOST}/media/${
                          image.collectionId
                        }/${image.photoId}/${image.image}?thumb=0x300`,
                        width: image.width / 20,
                        height: image.height / 20,
                        key: image.id,
                      }))}
                      margin={3}
                      renderImage={({ photo, margin }) => (
                        <ImageObject
                          photo={photo}
                          details={
                            photos.find((image) => image.id === photo.key)!
                          }
                          margin={margin ?? ""}
                        />
                      )}
                    />
                  )}
                </APIComponentWithFallback>
              </div>
            </ModuleWrapper>
          </div>
        </>
      )}
    </APIComponentWithFallback>
  );
}

export default PhotosAlbumGallery;
