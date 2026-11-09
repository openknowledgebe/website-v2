// Belgium drawn from iRail's open station list (src/data/stations.json).
// Projects longitude/latitude to a flat SVG coordinate space.
import stations from "@/data/stations.json";

export type StationDot = { id: string; name: string; x: number; y: number };

export function stationDots(width = 1000, pad = 14): { width: number; height: number; dots: StationDot[] } {
  const lons = stations.map((s) => s.lon);
  const lats = stations.map((s) => s.lat);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const squash = Math.cos(((minLat + maxLat) / 2) * (Math.PI / 180));
  const k = (width - 2 * pad) / ((maxLon - minLon) * squash);
  return {
    width,
    height: Math.round((maxLat - minLat) * k + 2 * pad),
    dots: stations.map((s) => ({
      id: s.id,
      name: s.name,
      x: +(pad + (s.lon - minLon) * squash * k).toFixed(1),
      y: +(pad + (maxLat - s.lat) * k).toFixed(1),
    })),
  };
}
