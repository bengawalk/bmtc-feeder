import React from "react";
import _ from "lodash";
import BusDetailsMetros from "./bus_details_metros.jsx";
import i18n from "i18next";
import {withTranslation} from "react-i18next";

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
