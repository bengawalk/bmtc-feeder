import _ from "lodash";
import polyline from "polyline";

export const getRoutesGeojson = (busData) => {
  return {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: busData.map((b) => ({
        type: "Feature",
        properties: {
          name: b.bus_name,
        },
        geometry: {
          type: "LineString",
          coordinates: polyline.decode(decodeURIComponent(b.route_line)),
        },
      })),
    },
  };
};

export const elementInViewport = (element) => {
  if (!element) return false;
  if (1 !== element.nodeType) return false;

  const html = document.documentElement;
  const rect = element.getBoundingClientRect();

  return !!rect &&
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.left <= html.clientWidth &&
    rect.top <= html.clientHeight;
}
