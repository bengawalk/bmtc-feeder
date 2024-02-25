import React from "react";
import _ from "lodash";

const BusesList = ({ busData, setSelectedBus }) => {
  return (
    <>
      <div id="page-heading">BMTC Metro Feeder Info</div>
      <ul>
        {
          _.map(busData, b => (
            <li id={`bus-item-${b.route_number}`} className="bus-item"
                key={b.route_number} onClick={() => setSelectedBus(b.route_number)}>
              <h4 className="bus-item-name">{b.route_number}</h4>
              <p className="bus-item-route">{b.from} - {b.to}</p>
              <p className="bus-item-description">Via {b.routings}</p>
            </li>
          ))
        }
      </ul>
    </>
  );
};

export default BusesList;
