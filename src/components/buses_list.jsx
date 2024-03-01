import React, {useRef, useState} from "react";
import _ from "lodash";
import {withTranslation} from "react-i18next";
import i18n from "i18next";

const filterBuses = (busesList, searchText) => {
  if(!searchText) {
    return busesList;
  }
  const lowerSearchText = _.toLower(searchText.replace(/[^a-z0-9]/gi, ''));
  return _.filter(busesList, b => {
    const stringsToSearch = [
      _.toLower(b.route_number),
      _.toLower(b.routings_en),
      _.toLower(b.routings_kn),
      _.toLower(b.from_en),
      _.toLower(b.to_en),
      _.toLower(b.from_kn),
      _.toLower(b.to_kn),
      ..._.map(b.metroDetails, m => _.toLower(m.name)),
    ];

    return _.some(stringsToSearch, s => _.includes(s.replace(/[^a-z0-9]/gi, ''), lowerSearchText));
  });
};

const BusesList = ({ t, busData, setSelectedBus }) => {
  const { language } = i18n;
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const filteredBuses = filterBuses(busData, search);
  return (
    <>
      <div id="page-heading">{t("title")}</div>
      <div id="search-input-wrapper">
        <input
          id="search-input"
          type="text"
          placeholder={t("search")}
          ref={inputRef}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {
          search ? (
            <span className="material-symbols-outlined" onClick={() => setSearch("")}>
              close
            </span>
          ) : (
            <span className="material-symbols-outlined" onClick={() => inputRef.current.focus()}>
              search
            </span>
          )
        }
      </div>
      <ul>
        {
          _.map(filteredBuses, b => (
            <li
              id={`bus-item-${b.route_number}`}
              className="bus-item"
              key={b.route_number}
              onClick={() => setSelectedBus(b.route_number)}
            >
              <h4 className="bus-item-name">{b.route_number}</h4>
              <p className="bus-item-route">{b[`from_${language}`]} - {b[`to_${language}`]}</p>
              <p className="bus-item-description">Via {b[`routings_${language}`]}</p>
            </li>
          ))
        }
      </ul>
    </>
  );
};

export default withTranslation()(BusesList);
