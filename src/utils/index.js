import polyline from "polyline";
import _ from "lodash";
import {ROUTE_LINES} from "./constants.js";
import {METRO_STOPS_DATA} from "../data/index.js";


// Code to get encoded polyline from GEOJSON file
// import NEW_ROUTES_JSON from "../data/temp.json";
//
// const newRoutes = _.filter(NEW_ROUTES_JSON.features, f => f.geometry.type === "LineString");
//
// const newRoutesMap = {};
//
// newRoutes.forEach(r => {
//   newRoutesMap[r.properties.name] = polyline.encode(r.geometry.coordinates.map(b => ([b[0], b[1]])));
// });
//
// console.log(newRoutesMap);
//
// // To add a new route from the Backend API response for /RoutePoints
// // const backendResponse = "";
// // console.log(encodeURIComponent(
// //   polyline.encode(JSON.parse(backendResponse).data.map(b => ([_.toNumber(b.longitude), _.toNumber(b.latitude)])))
// // ));


export const getRoutesGeojson = (busData) => {
  return {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: busData.map((b) => ({
        type: "Feature",
        properties: {
          name: b.route_number,
        },
        geometry: {
          type: "LineString",
          coordinates: polyline.decode(decodeURIComponent(ROUTE_LINES[b.route_number])),
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

export const readTSV = (csvString) => {
  const [headersText, ...dataLines] = _.split(csvString, "\r\n");
  const headers = _.split(headersText, "\t");
  return _.map(dataLines, line => {
    const splitLine = _.split(line, "\t");
    const data = {};
    _.each(headers, (h, index) => {
      const cellData = splitLine[index];
      data[h] = cellData;
    });
    return data;
  });
}

export const textToDisplaytime = (text) => {
  if(text.length === 4) {
    return `${text[0]}${text[1]}:${text[2]}${text[3]}`;
  }
  if(text.length === 3) {
    return `0${text[0]}:${text[1]}${text[2]}`;
  }
  return null;
}
export const cleanupBusDataJson = (busData) => _.map(_.filter(busData, b => !!b.route_number), b => {
  const timings_from = _.map(_.split(b.timings_from, ","), t => textToDisplaytime(_.trim(t)));
  const timings_to = _.map(_.split(b.timings_to, ","), t => textToDisplaytime(_.trim(t)));
  const metrosIndices = b.metros ? _.map(_.split(b.metros || "", ","), m => _.toNumber(_.trim(m))) : [];
  const metroDetails = _.map(metrosIndices, id => _.find(METRO_STOPS_DATA, { id }));

  return {
    ...b,
    s_no: _.toNumber(b.s_no),
    schedule_count: _.toNumber(b.schedule_count),
    timings_from: _.uniqBy(_.compact(timings_from)),
    timings_to: _.uniqBy(_.compact(timings_to)),
    metroDetails,
  }
});
