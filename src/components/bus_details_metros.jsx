import React from "react";
import _ from "lodash";
import {METRO_STOPS_DATA} from "../utils/constants.js";

const MetroIcon = ({ line }) => {
  if(line === "green") {
    return (
      <span className="metro-line-icon green">
        M
      </span>
    );
  }
  if(line === "purple") {
    return (
      <span className="metro-line-icon purple">
        M
      </span>
    );
  }
}

const BusDetailsMetros = ({list}) => {
  const metrosIndices = _.map(_.split(list, ","), m => _.toNumber(_.trim(m)));
  const metroDetails = _.map(metrosIndices, id => _.find(METRO_STOPS_DATA, { id }));
  return <p>
    {
      _.map(metroDetails, m => (
        <span key={m.name} className="metro-list-item">
          <MetroIcon line={m.line} />
          {m.name}</span>
      ))
    }
  </p>;
};

export default BusDetailsMetros;
