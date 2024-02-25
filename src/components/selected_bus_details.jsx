import React from "react";
import _ from "lodash";
import BusDetailsMetros from "./bus_details_metros.jsx";

const SelectedBusDetails = ({ busData, selectedBus, setSelectedBus }) => {
  const {
    route_number,
    from,
    to,
    routings,
    timings_from,
    timings_to,
    metros,
  } = _.find(busData, { route_number: selectedBus });
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
          <span className="fromto-text">From:</span> {from} <br/>
          <span className="fromto-text">To:</span> {to}
        </p>
        <p id="routings">
          Via {routings}
        </p>
        {
          metros && (
            <>
              <h4>Metro stations on this route</h4>
              <BusDetailsMetros list={metros} />
            </>
          )
        }
        <h4>Start time from {from}</h4>
        {
          _.map(timings_from, t => (
            <div className="time" key={t}>{t}</div>
          ))
        }
        {
          _.size(timings_to) > 0 && (
            <>
              <h4>Start time from {to}</h4>
              {
                _.map(timings_to, t => (
                  <div className="time" key={t}>{t}</div>
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

export default SelectedBusDetails;
