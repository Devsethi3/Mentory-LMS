import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon, Loader2, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

const RenderEmptyState = ({ isDragActive }: { isDragActive: boolean }) => {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4">
        <CloudUploadIcon
          className={cn(
            "size-6 text-muted-foreground",
            isDragActive && "text-primary"
          )}
        />
      </div>
      <p className="text-base mb-4 font-semibold text-foreground">
        Drop your files here or{" "}
        <span className="cursor-pointer hover:underline font-bold text-primary">
          click to upload
        </span>
      </p>
      <Button type="button">Select File</Button>
    </div>
  );
};

export default RenderEmptyState;

export function RenderErrorState() {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-destructive/20 mb-4">
        <ImageIcon className={cn("size-6 text-destructive")} />
      </div>
      <p className="text-base font-semibold">Upload Failed</p>
      <p className="text-xs mt-1 mb-4 text-muted-foreground">
        Something went wrong!
      </p>
      <Button type="button">Retry File Selection</Button>
    </div>
  );
}

export function RenderedUploadedState({
  previewUrl,
  handleRemoveFile,
  isDeleting,
}: {
  previewUrl: string;
  handleRemoveFile: () => void;
  isDeleting: boolean;
}) {
  return (
    <div>
      <Image
        src={previewUrl}
        alt="Uploaded File"
        fill
        className="object-contain p-2"
      />
      <Button
        type="button"
        variant="destructive"
        size="icon"
        className={cn("absolute top-4 right-4")}
        onClick={handleRemoveFile}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className="animate-spin size-4" />
        ) : (
          <XIcon className="size-4" />
        )}
      </Button>
    </div>
  );
}

export function RenderUploadingState({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) {
  return (
    <div className="text-center flex justify-center items-center flex-col">
      <p className="text-sm text-muted-foreground mt-2">{progress}% complete</p>
      <h1 className="mt-2 text-foreground font-medium">Uploading...</h1>
      <p className="text-sm text-muted-foreground truncate mt-1">{file.name}</p>
    </div>
  );
}
