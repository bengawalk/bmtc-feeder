import {useEffect, useRef, useState} from 'react';
import _ from "lodash";
import {BUS_DATA} from "./utils/constants.js";
import Map from "./map.jsx";
import {elementInViewport} from "./utils/index.js";

function App() {
  const [selectedBus, setSelectedBus] = useState("");
  const mapRef = useRef();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentParam = params.get("q");
    if(currentParam && !selectedBus) {
      // First open, has URL param
      console.log("First open, has URL param");
      setSelectedBus(currentParam);
    } else if(currentParam !== selectedBus) {
      // Change of selectedBus when user clicks on item
      params.set("q", selectedBus || BUS_DATA[0].bus_name);
      const newUrl = window.location.origin
        + window.location.pathname
        + '?' + params.toString();
      window.history.pushState({path:newUrl},'',newUrl);
    } else if(!currentParam) {
      // First open of root URL
      setSelectedBus(BUS_DATA[0].bus_name);
    }

    const sidebarElement = document.getElementById(`bus-item-${selectedBus}`);
    if(!elementInViewport(sidebarElement)) {
      sidebarElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedBus]);

  return (
    <>
      <div id="sidebar">
        <h1>ಮೆಟ್ರೋ ಫೀಡರ್ ಮಾರ್ಗದ ವಿವರಗಳು</h1>
        <ul>
          {
            _.map(BUS_DATA, b => (
              <li id={`bus-item-${b.bus_name}`} className={`bus-item ${selectedBus === b.bus_name ? "selected" : ""}`} key={b.bus_name} onClick={() => setSelectedBus(b.bus_name)}>
                <h4 className="bus-item-name">{b.bus_name}</h4>
                <p className="bus-item-route">{b.route_name}</p>
                <p className="bus-item-description">{b.description}</p>
              </li>
            ))
          }
        </ul>
      </div>
      <Map mapRef={mapRef} busData={BUS_DATA} selectedBus={selectedBus} setSelectedBus={setSelectedBus} />
    </>
  )
}

export default App
