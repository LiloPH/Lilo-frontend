import axios from "axios";

type Location = { lat: number; lng: number };
const GOOGLE_API = import.meta.env.VITE_GOOGLE_MAP_API;

const useGeocode = () => {
  const getAddress = async (location: Location): Promise<string> => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${GOOGLE_API}`
      );

      if (response.data.status === "OK" && response.data.results.length > 0) {
        return response.data.results[0].formatted_address;
      }
    } catch (error) {
      console.error("Reverse geocoding error:", error);
    }
    return "Unnamed Location";
  };

  return { getAddress };
};

export default useGeocode;
