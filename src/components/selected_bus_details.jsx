import React from "react";
import _ from "lodash";
import BusDetailsMetros from "./bus_details_metros.jsx";
import i18n from "i18next";
import {withTranslation} from "react-i18next";
import {ROUTE_LINES} from "../utils/constants.js";

const SelectedBusDetails = ({ busData, selectedBus, setSelectedBus,  t }) => {
  const details = _.find(busData, { route_number: selectedBus });
  const {
    route_number,
    timings_from,
    timings_to,
    metroDetails,
  } = details;
  const { language } = i18n;
  return (
    <>
      <div id="page-heading">
        <button id="btn-back" onClick={() => setSelectedBus("")}>
          <span className="material-symbols-outlined">
            arrow_back
          </span>
        </button>
        {route_number}
      </div>
      <div id="selected-bus-content">
        {
          !ROUTE_LINES[route_number] && (
            <div id="noroute">
              {
                language === "en" ? (
                  <>
                    We dont have the correct route map for this bus yet. We are making it and will update it here at the
                    earliest. If you'd like to contribute, please <a href="https://discord.gg/XhmvDP4kXp"
                                                                     target="_blank">reach out to us on Discord</a>.
                  </>
                ) : (
                  <>
                    ಈ ಬಸ್ಸಿಗೆ ನಾವು ಇನ್ನೂ ಸರಿಯಾದ ಮಾರ್ಗವನ್ನು ಹೊಂದಿಲ್ಲ. ನಾವು ಅದನ್ನು ತಯಾರಿಸುತ್ತಿದ್ದೇವೆ ಮತ್ತು ಸಾಧ್ಯವಾದಷ್ಟು
                    ಬೇಗ ಹಂಚಿಕೊಳ್ಳುತ್ತೇವೆ. ನೀವು ಕೊಡುಗೆ ನೀಡಲು ಬಯಸಿದರೆ, <a href="https://discord.gg/XhmvDP4kXp"
                                                                        target="_blank">Discord ಮೂಲಕ ಸಂಪರ್ಕಿಸಿ</a>.
                  </>
                )
              }
            </div>
          )
        }
        <p id="fromto">
          <span className="fromto-text">{t("from")}:</span> {details[`from_${language}`]} <br/>
          <span className="fromto-text">{t("to")}:</span> {details[`to_${language}`]}
        </p>
        <p id="routings">
          {t("via")}: {details[`routings_${language}`]}
        </p>
        {
          _.size(metroDetails) > 0 && (
            <>
              <h4>{t("metros")}</h4>
              <BusDetailsMetros metroDetails={metroDetails} />
            </>
          )
        }
        <h4>{i18n.t("start_times", { station: details[`from_${language}`] })}</h4>
        {
          _.map(timings_from, ti => (
            <div className="time" key={ti}>{ti}</div>
          ))
        }
        {
          _.size(timings_to) > 0 && (
            <>
              <h4>{i18n.t("start_times", { station: details[`to_${language}`] })}</h4>
              {
                _.map(timings_to, ti => (
                  <div className="time" key={ti}>{ti}</div>
                ))
              }
            </>
          )
        }
      </div>
    </>
  )
    ;
};

export default withTranslation()(SelectedBusDetails);
