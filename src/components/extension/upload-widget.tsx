import { useEffect, useRef } from "react";
import { Button } from "../ui/button";

// Define types for Cloudinary
interface CloudinaryResult {
  event: string;
  info: {
    public_id: string;
    secure_url: string;
    [key: string]: unknown;
  };
}

interface CloudinaryError {
  [key: string]: unknown;
}

// Define type for the widget config
interface UwConfig {
  cloudName: string;
  uploadPreset: string;
  multiple?: boolean;
  [key: string]: unknown;
}

// Define props interface
interface CloudinaryUploadWidgetProps {
  uwConfig: UwConfig;
  onImagesUploaded?: (publicIds: string[], secureUrls: string[]) => void;
  cloudName: string;
  className?: string;
}

// Add type declaration for the Cloudinary global object
declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        config: UwConfig,
        callback: (
          error: CloudinaryError | null,
          result: CloudinaryResult | null
        ) => void
      ) => {
        open: () => void;
        close: () => void;
      };
    };
  }
}

interface CloudinaryWidget {
  open: () => void;
}

const CloudinaryUploadWidget: React.FC<CloudinaryUploadWidgetProps> = ({
  uwConfig,
  onImagesUploaded,
  cloudName,
  className = "",
}) => {
  const uploadWidgetRef = useRef<CloudinaryWidget | null>(null);
  const uploadButtonRef = useRef<HTMLButtonElement>(null);

  // Track URLs only for the current upload session
  const tempPublicIdsRef = useRef<string[]>([]);
  const tempSecureUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    const initializeUploadWidget = () => {
      if (window.cloudinary && uploadButtonRef.current) {
        // Ensure multiple uploads are enabled and set z-index
        const config = {
          ...uwConfig,
          zIndex: 9999, // Much higher z-index to ensure it appears above everything
        };

        // Create upload widget
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(
          config,
          (error: CloudinaryError | null, result: CloudinaryResult | null) => {
            if (!error && result) {
              // Handle successful upload
              if (result.event === "success") {
                const publicId = result.info.public_id;
                const secureUrl = result.info.secure_url as string;

                // Store temporarily for this session
                tempPublicIdsRef.current.push(publicId);
                tempSecureUrlsRef.current.push(secureUrl);
              }

              // Handle upload completion
              if (result.event === "close") {
                if (onImagesUploaded && tempSecureUrlsRef.current.length > 0) {
                  // Pass the collected URLs to the parent component
                  onImagesUploaded(
                    tempPublicIdsRef.current,
                    tempSecureUrlsRef.current
                  );

                  // Reset for next upload session
                  tempPublicIdsRef.current = [];
                  tempSecureUrlsRef.current = [];
                }
              }
            }
          }
        );

        // Add click event to open widget
        const handleUploadClick = () => {
          if (uploadWidgetRef.current) {
            // Reset temporary arrays before opening
            tempPublicIdsRef.current = [];
            tempSecureUrlsRef.current = [];
            uploadWidgetRef.current.open();
          }
        };

        const buttonElement = uploadButtonRef.current;
        buttonElement.addEventListener("click", handleUploadClick);

        // Cleanup function
        return () => {
          buttonElement?.removeEventListener("click", handleUploadClick);
        };
      }
    };

    initializeUploadWidget();
  }, [uwConfig, onImagesUploaded, cloudName]);

  return (
    <Button
      ref={uploadButtonRef}
      id="upload_widget"
      className={`hover:cursor-pointer ${className}`}
      type="button"
    >
      Upload Images
    </Button>
  );
};

export default CloudinaryUploadWidget;
