import * as React from "react";
import mapboxgl from "mapbox-gl";

import { getRoutesGeojson } from "../utils";
import {
  greenLinePolyline,
  MAP_STYLE_HIGHLIGHTED_ROUTE, MAP_STYLE_METRO_ROUTE,
  MAP_STYLE_ROUTE,
  MAPBOX_TOKEN, METRO_LINES_GEOJSON,
  METRO_STOPS_GEOJSON,
  MAP_STYLE_METRO_STOPS,
} from "../utils/constants";

mapboxgl.accessToken = MAPBOX_TOKEN;

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lat: 12.977529081680132,
      lng: 77.57247169985196,
      zoom: 11,
      supported: mapboxgl.supported(),
    };
    this.mapContainer = React.createRef();
  }

  initMap = () => {
    const { mapRef } = this.props;
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
      minZoom: 10,
      maxZoom: 18,
    });
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
    mapRef.current = map;
    // this.map = map;
  };

  componentDidMount() {
    const { mapRef } = this.props;
    if (this.state.supported) {
      this.initMap();
      mapRef.current?.on("load", () => {
        this.renderMapData();
        this.addMapEvents();
        this.highlightSelectedroute();
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { selectedBus, mapRef } = this.props;
    const { selectedBus: prevSelectedBus } = prevProps;
    if (selectedBus !== prevSelectedBus) {
      this.highlightSelectedroute();
    }
  }

  highlightSelectedroute = () => {
    const { selectedBus, mapRef } = this.props;
    this.callFnIfMapLoaded(() => {
      mapRef.current.setFilter("routes-highlighted", [
        "==",
        "name",
        selectedBus || "",
      ]);
    });
  }

  callFnIfMapLoaded = (fn) => {
    const { mapRef } = this.props;
    if (mapRef.current._loaded) {
      fn();
    } else {
      mapRef.current.on("load", fn);
    }
  };

  componentWillUnmount() {
    const { mapRef } = this.props;
    mapRef.current?.remove();
  }

  renderMapData = () => {
    const {
      busData,
      selectedBus,
      mapRef,
    } = this.props;

    mapRef.current.addSource("metro-routes", {
      type: "geojson",
      data: METRO_LINES_GEOJSON,
    });
    mapRef.current.addLayer({
      id: "metro-routes",
      source: "metro-routes",
      ...MAP_STYLE_METRO_ROUTE,
    });

    mapRef.current.addSource("metro-stops", {
      type: "geojson",
      data: METRO_STOPS_GEOJSON,
    });
    mapRef.current.addLayer({
      id: "metro-stops",
      source: "metro-stops",
      ...MAP_STYLE_METRO_STOPS,
    });
    // mapRef.current.addLayer({
    //   'id': 'metro-stops-labels',
    //   'type': 'symbol',
    //   'source': 'metro-stops',
    //   layout: {
    //     'text-field': ["step", ["zoom"], "", 9, ["get", "name"]],
    //     'text-variable-anchor': ['bottom', 'left'],
    //     'text-radial-offset': 0.5,
    //     'text-justify': 'left',
    //   },
    // });


    mapRef.current.addSource("routes", getRoutesGeojson(busData));
    mapRef.current.addLayer({
      id: "routes",
      source: "routes",
      ...MAP_STYLE_ROUTE,
    });

    mapRef.current.addLayer({
      id: "routes-highlighted",
      source: "routes",
      ...MAP_STYLE_HIGHLIGHTED_ROUTE,
      filter: ["==", "name", selectedBus || ""],
    });
  };

  addMapEvents = () => {
    const { mapRef } = this.props;

    // Show route as blue on hover
    mapRef.current.on("mouseenter", "routes", (e) => {
      const { selectedBus } = this.props;
      mapRef.current.getCanvas().style.cursor = "pointer";

      const feature = e.features[0];

      const { name } = feature.properties;
      mapRef.current.setFilter("routes-highlighted", [
        "==",
        "name",
        name || selectedBus || "",
      ]);
    });

    mapRef.current.on("click", "routes", (e) => {
      const { setSelectedBus } = this.props;
      const feature = e.features[0];

      const { name } = feature.properties;
      setSelectedBus(name);
    });

    mapRef.current.on("mouseleave", "routes", () => {
      const { selectedBus } = this.props;
      mapRef.current.getCanvas().style.cursor = "";
      mapRef.current.setFilter("routes-highlighted", [
        "==",
        "name",
        selectedBus || "",
      ]);
    });
  };

  render() {
    return <div id="map" ref={this.mapContainer} className="map-container" />;
  }
}

export default Map;
