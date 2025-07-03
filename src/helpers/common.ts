import type React from "react";

type FileType = "image" | "document";

interface FileHandlerOptions {
  fileType: FileType;
  // eslint-disable-next-line no-unused-vars
  onValid: (file: File) => void;
  onInvalid?: () => void;
  // eslint-disable-next-line no-unused-vars
  previewSetter?: (previewUrl: string | null) => void;
}

export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  options: FileHandlerOptions,
) => {
  const inputFile = e.target.files?.[0];
  if (!inputFile) {
    return;
  }

  const { fileType, onValid, onInvalid, previewSetter } = options;

  if (fileType === "image") {
    if (inputFile.type.startsWith("image/")) {
      onValid(inputFile);
      previewSetter?.(URL.createObjectURL(inputFile));
    } else {
      onInvalid?.();
      previewSetter?.(null);
    }
  }

  if (fileType === "document") {
    if (/\.(pdf|docx?)$/i.test(inputFile.name)) {
      onValid(inputFile);
    } else {
      onInvalid?.();
    }
  }
};
