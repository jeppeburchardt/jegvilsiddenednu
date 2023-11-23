import { Location } from "@/types";
import { getDistance } from "geolib";
import { GeolibInputCoordinates } from "geolib/es/types";
import { SEARCH_RADIUS } from "./constants";

export const findNearbyLocations = (needle: Location, haystack: Location[]) =>
  new Promise<{ closest: Location; nearby: Location[] }>((resolve) => {
    let position = 0;

    const device: GeolibInputCoordinates = {
      latitude: needle[0],
      longitude: needle[1],
    };
    let closestDistance = Number.MAX_VALUE;
    let closest: Location;
    const nearby: Location[] = [];

    function searchBatch() {
      const batchStartTime = Date.now();

      while (Date.now() - batchStartTime < 10 && position < haystack.length) {
        const target: GeolibInputCoordinates = {
          latitude: haystack[position][0],
          longitude: haystack[position][1],
        };

        const distance = getDistance(target, device);

        if (distance < closestDistance) {
          closestDistance = distance;
          closest = haystack[position];
        }

        if (distance < SEARCH_RADIUS) {
          nearby.push(haystack[position]);
        }

        position++;
      }

      if (position < haystack.length) {
        setTimeout(() => searchBatch(), 0);
      } else {
        resolve({ closest, nearby });
      }
    }
    searchBatch();
  });

// Converts from degrees to radians.
function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

// Converts from radians to degrees.
function toDegrees(radians: number) {
  return (radians * 180) / Math.PI;
}

export function bearing(
  startLat: number,
  startLng: number,
  destLat: number,
  destLng: number
) {
  startLat = toRadians(startLat);
  startLng = toRadians(startLng);
  destLat = toRadians(destLat);
  destLng = toRadians(destLng);

  const y = Math.sin(destLng - startLng) * Math.cos(destLat);
  const x =
    Math.cos(startLat) * Math.sin(destLat) -
    Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
  let brng = Math.atan2(y, x);
  brng = toDegrees(brng);

  return (brng + 360) % 360;
}
