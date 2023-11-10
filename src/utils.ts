import { Location } from "@/types";
import geoDistance from "geo-distance-helper";

export const findClosest = (needle: Location, haystack: Location[]) =>
  new Promise<{ closest: Location; nearby: Location[] }>((resolve) => {
    let position = 0;

    const device = { lat: needle[0], lng: needle[1] };
    let closestDistance = Number.MAX_VALUE;
    let closest: Location;
    const nearby: Location[] = [];

    function searchBatch() {
      const batchStartTime = Date.now();

      while (Date.now() - batchStartTime < 10 && position < haystack.length) {
        const target = {
          lat: haystack[position][0],
          lng: haystack[position][1],
        };

        const distance = geoDistance(target, device) as number;

        if (distance < closestDistance) {
          closestDistance = distance;
          closest = haystack[position];
        }

        if (distance < 1) {
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
