import {useEffect, useRef, useState} from 'react';
import _ from "lodash";

import {BUS_DATA, LANGUAGES} from "./utils/constants.js";
import Map from "./components/map.jsx";
import {elementInViewport} from "./utils/index.js";
import BusesList from "./components/buses_list.jsx";
import SelectedBusDetails from "./components/selected_bus_details.jsx";
import appStorage from "./utils/storage.js";
import i18n from "i18next";

function App() {
  const [selectedBus, setSelectedBus] = useState("");
  const [lang, setLang] = useState(
    appStorage.getItem("lang") || LANGUAGES[0].code,
  );
  const mapRef = useRef();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentParam = params.get("q");
    if(currentParam && !selectedBus) {
      // First open, has URL param
      if(_.some(BUS_DATA, {route_number: currentParam})) {
        // Check if bus exists in the list. If not, there's no bus details to show so no point in selecting it
        setSelectedBus(currentParam);
      }
    }
  }, []);

  useEffect(() => {
    appStorage.setItem("lang", lang);
    document.documentElement.setAttribute("lang", lang);
    i18n.changeLanguage(lang);
  }, [lang]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentParam = params.get("q");
    const { origin, pathname } = window.location;
    if(selectedBus && currentParam !== selectedBus) {
      // Bus is selected but doesn't exist in URL
      params.set("q", selectedBus || BUS_DATA[0].route_number);
      const newUrl = origin + pathname + '?' + params.toString();
      window.history.pushState({path:newUrl},'',newUrl);
    } else if(!selectedBus) {
      // No bus is selected
      const newUrl = origin + pathname;
      window.history.pushState({path:newUrl},'',newUrl);
    }

    const sidebarElement = document.getElementById(`bus-item-${selectedBus}`);
    if(sidebarElement && !elementInViewport(sidebarElement)) {
      sidebarElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedBus]);

  return (
    <>
      <div id="sidebar">
        {
          selectedBus ? (
            <SelectedBusDetails selectedBus={selectedBus} setSelectedBus={setSelectedBus} busData={BUS_DATA} />
          ) : (
            <BusesList busData={BUS_DATA} setSelectedBus={setSelectedBus} />
          )
        }
        <div id="credits">
          {
            lang === "en" ? <>
              By Team Bengawalk.<br />
              Check out our other works at <a href="https://bengawalk.com/" target="_blank">bengawalk.com</a>
            </> : <>
              ಬೆಂಗಾವಾಕ್ ತಂಡದಿಂದ.<br/>
              ನಮ್ಮ ಇತರ ಕೆಲಸ <a href="https://bengawalk.com/" target="_blank">bengawalk.com</a>
            </>
          }

        </div>
      </div>
      <Map lang={lang} setLang={setLang} mapRef={mapRef} busData={BUS_DATA} selectedBus={selectedBus} setSelectedBus={setSelectedBus} />
    </>
  )
}

export default App
