type Location = { lat: number | null; lng: number | null };
const GOOGLE_API = import.meta.env.VITE_GOOGLE_MAP_API;

export const reverseGeocode = async (location: Location): Promise<string> => {
  try {
    if (!location.lat || !location.lng) return "Unnamed Location";

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${GOOGLE_API}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      return data.results[0].formatted_address;
    }
  } catch (error) {
    console.error("Reverse geocoding failed", error);
    return "Unnamed Location";
  }

  return "Unnamed Location";
};
