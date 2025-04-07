/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLIENT_ID: string;
  readonly VITE_GOOGLE_MAP_API: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_MAP_ID: string;
  readonly VITE_CLOUD_NAME: string;
  readonly VITE_CLOUD_PRESET: string;
  readonly VITE_CLOUD_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
