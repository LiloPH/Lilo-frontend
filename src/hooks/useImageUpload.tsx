import { useState } from "react";

interface UploadResult {
  uploadFiles: (files: File[] | File | null) => Promise<string[]>;
  uploadSingleFile: (file: File | null) => Promise<string>;
  urls: string[];
  loading: boolean;
  error: string | null;
}

const useImageUpload = (): UploadResult => {
  const [urls, setUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const uploadSingleFile = async (file: File | null): Promise<string> => {
    if (!file) {
      setError("No file selected");
      return "";
    }

    try {
      setLoading(true);
      setError(null);

      const cloudName = import.meta.env.VITE_CLOUD_NAME;
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "tour_img");

      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Upload failed");
      }

      const data = await response.json();
      const url = data.secure_url;
      setUrls([url]);
      return url;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload image";
      setError(errorMessage);
      console.error("Upload error:", err);
      return "";
    } finally {
      setLoading(false);
    }
  };

  const uploadFiles = async (
    files: File[] | File | null
  ): Promise<string[]> => {
    if (!files) {
      setError("No files selected");
      return [];
    }

    // Handle single file
    if (files instanceof File) {
      const url = await uploadSingleFile(files);
      return url ? [url] : [];
    }

    // Handle array of files
    if (files.length === 0) {
      setError("No files selected");
      return [];
    }

    try {
      setLoading(true);
      setError(null);

      const cloudName = import.meta.env.VITE_CLOUD_NAME;
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "tour_img");

        const response = await fetch(cloudinaryUrl, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || "Upload failed");
        }

        const data = await response.json();
        return data.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setUrls(uploadedUrls);
      return uploadedUrls;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload images";
      setError(errorMessage);
      console.error("Upload error:", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { uploadFiles, uploadSingleFile, urls, loading, error };
};

export default useImageUpload;
