import { useState, useCallback, useMemo } from "react";
import Cropper from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Icon from "./Icon";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

type AspectRatio =
  | "square"
  | "portrait"
  | "landscape"
  | "banner"
  | "wide"
  | "custom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  image: File;
  onCrop: (croppedFile: File, aspectRatio: AspectRatio) => void;
  initialAspectRatio?: AspectRatio;
  allowedAspectRatios?: AspectRatio[];
};

// Maximum dimensions for web images
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;
const MAX_FILE_SIZE = 1024 * 1024; // 1MB

const aspectRatioOptions: Record<
  AspectRatio,
  { value: number; label: string; icon: string }
> = {
  square: { value: 1, label: "Square (1:1)", icon: "Square" },
  portrait: { value: 3 / 4, label: "Portrait (3:4)", icon: "Image" },
  landscape: { value: 4 / 3, label: "Landscape (4:3)", icon: "Image" },
  banner: { value: 3, label: "Banner (3:1)", icon: "Image" },
  wide: { value: 16 / 9, label: "Wide (16:9)", icon: "Monitor" },
  custom: { value: 0, label: "Free", icon: "Maximize" },
};

export default function Crop({
  isOpen,
  onClose,
  image,
  onCrop,
  initialAspectRatio = "square",
  allowedAspectRatios = [
    "square",
    "portrait",
    "landscape",
    "banner",
    "wide",
    "custom",
  ],
}: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] =
    useState<AspectRatio>(initialAspectRatio);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  // Memoize the image URL to prevent recreating it on every render
  const imageUrl = useMemo(() => URL.createObjectURL(image), [image]);

  // Filter allowed aspect ratios
  const filteredAspectRatios = useMemo(() => {
    return allowedAspectRatios.filter((ratio) =>
      Object.keys(aspectRatioOptions).includes(ratio),
    );
  }, [allowedAspectRatios]);

  const onCropComplete = useCallback(
    (
      croppedArea: { x: number; y: number; width: number; height: number },
      croppedAreaPixels: {
        x: number;
        y: number;
        width: number;
        height: number;
      },
    ) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const createImage = useCallback(
    (url: string): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.src = url;
      }),
    [],
  );

  const getCroppedImg = useCallback(
    async (
      imageSrc: string,
      pixelCrop: { x: number; y: number; width: number; height: number },
    ) => {
      const image = await createImage(imageSrc);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("No 2d context");
      }

      // Calculate dimensions while maintaining aspect ratio
      let width = pixelCrop.width;
      let height = pixelCrop.height;

      // Scale down if dimensions exceed maximum
      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const scale = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }

      // Set canvas size to match the crop size
      canvas.width = width;
      canvas.height = height;

      // Use imageSmoothingQuality for better performance
      ctx.imageSmoothingQuality = "medium";
      ctx.imageSmoothingEnabled = true;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        width,
        height,
      );

      return new Promise<File>((resolve) => {
        let quality = 0.8;
        const compressImage = () => {
          canvas.toBlob(
            (blob) => {
              if (!blob) return;

              // If file is still too large, reduce quality and try again
              if (blob.size > MAX_FILE_SIZE && quality > 0.1) {
                quality -= 0.1;
                compressImage();
              } else {
                const file = new File([blob], image.name, {
                  type: "image/jpeg",
                });
                resolve(file);
              }
            },
            "image/jpeg",
            quality,
          );
        };

        compressImage();
      });
    },
    [createImage],
  );

  const handleCrop = useCallback(async () => {
    if (!croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
      onCrop(croppedImage, aspectRatio);
      onClose();
    } catch (e) {
      console.error(e);
    }
  }, [
    croppedAreaPixels,
    imageUrl,
    aspectRatio,
    onCrop,
    onClose,
    getCroppedImg,
  ]);

  // Cleanup the object URL when component unmounts or image changes
  useCallback(() => {
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  // Get current aspect ratio value
  const currentAspectRatioValue =
    aspectRatio === "custom"
      ? undefined // Pass undefined to disable aspect ratio constraint
      : aspectRatioOptions[aspectRatio].value;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="pt-6">
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        <div className="relative h-[500px] w-full bg-black">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={currentAspectRatioValue}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            objectFit="contain"
            showGrid={true}
          />
        </div>

        {filteredAspectRatios.length > 1 && (
          <div className="flex flex-col gap-2 py-4">
            <label className="text-sm font-medium">Aspect Ratio</label>
            <ToggleGroup
              type="single"
              value={aspectRatio}
              onValueChange={(value) => {
                if (value) setAspectRatio(value as AspectRatio);
              }}
              className="justify-start flex-wrap"
            >
              {filteredAspectRatios.map((ratio) => (
                <ToggleGroupItem
                  key={ratio}
                  value={ratio}
                  aria-label={aspectRatioOptions[ratio].label}
                >
                  <Icon
                    name={aspectRatioOptions[ratio].icon as any}
                    className="mr-2 size-4"
                  />
                  <span className="hidden sm:inline">
                    {aspectRatioOptions[ratio].label}
                  </span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        )}

        <div className="flex flex-col gap-2 py-2">
          <label className="text-sm font-medium">Zoom</label>
          <div className="flex items-center gap-2">
            <Icon name="Minimize" className="size-4" />
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full"
            />
            <Icon name="Maximize" className="size-4" />
          </div>
        </div>

        <DialogFooter className="px-6 pb-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCrop}>Crop & Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
