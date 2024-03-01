import React from "react";
import _ from "lodash";
import i18n from "i18next";

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

const BusDetailsMetros = ({ metroDetails }) => {
  const { language } = i18n;
  return <p>
    {
      _.map(metroDetails, m => (
        <span key={m.name_en} className="metro-list-item">
          <MetroIcon line={m.line} />
          {m[`name_${language}`]}</span>
      ))
    }
  </p>;
};

export default BusDetailsMetros;
