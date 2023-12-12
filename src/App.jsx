import {useEffect, useState} from 'react';

const BUSES = [
  {
    name: "MF1F",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF1F.jpeg",
  },
  {
    name: "MF1K",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/MF1K.jpeg",
  },
  {
    name: "MF1G",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF1G.jpeg",
  },
  {
    name: "MF1GA",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF1GA.jpeg",
  },
  {
    name: "MF2",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/MF2.jpeg",
  },
  {
    name: "MF3",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF3.jpeg",
  },
  {
    name: "MF4",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF4.jpeg",
  },
  {
    name: "MF5",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF5.jpeg",
  },
  {
    name: "MF6",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF6.jpeg",
  },
  {
    name: "MF7",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF7.jpeg",
  },
  {
    name: "MF8",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF8.jpeg",
  },
  {
    name: "MF9",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF9.jpeg",
  },
  {
    name: "MF12",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF12.jpeg",
  },
  {
    name: "MF13",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF13.jpeg",
  },
  {
    name: "MF14",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF14.jpeg",
  },
  {
    name: "MF15",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF15.jpeg",
  },
  {
    name: "MF17",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/MF17.jpeg",
  },
  {
    name: "MF18",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/MF18.jpeg",
  },
  {
    name: "MF18A",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/MF18A.jpeg",
  },
  {
    name: "MF19",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/MF19.jpeg",
  },
  {
    name: "MF21",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/MF21.jpeg",
  },
  {
    name: "MF23A",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF23A.jpeg",
  },
  {
    name: "MF23B",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF23B.jpeg",
  },
  {
    name: "MF23E",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF23E.jpeg",
  },
  {
    name: "MF24",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF24.jpeg",
  },
  {
    name: "MF25",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF25.jpeg",
  },
  {
    name: "MF26",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF26.jpeg",
  },
  {
    name: "MF27",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF27.jpeg",
  },
  {
    name: "MF28",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF28.jpeg",
  },
  {
    name: "MF34",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF34.jpeg",
  },
  {
    name: "MF36",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF36.jpeg",
  },
  {
    name: "MF39",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF39.jpeg",
  },
  {
    name: "MF40",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF40.jpeg",
  },
  {
    name: "MF42",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF42.jpeg",
  },
  {
    name: "MF45",
    image: "https://mybmtc.karnataka.gov.in/storage/pdf-files/Metro%20feeder%20route%20details/MF45.jpeg",
  },
];

function App() {
  const [selectedBus, setSelectedBus] = useState("");
  const { image } = BUSES.find(b => b.name === selectedBus) || {};

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentParam = params.get("q");
    if(currentParam && !selectedBus) {
      // First open, has URL param
      setSelectedBus(currentParam);
    } else if(currentParam !== selectedBus) {
      params.set("q", selectedBus || BUSES[0].name);
      const newUrl = window.location.origin
        + window.location.pathname
        + '?' + params.toString();
      window.history.pushState({path:newUrl},'',newUrl);
    }
  }, [selectedBus]);

  return (
    <>
      <div id="sidebar">
        <h1>ಮೆಟ್ರೋ ಫೀಡರ್ ಮಾರ್ಗದ ವಿವರಗಳು</h1>
        <ul>
          {
            BUSES.map(b => (
              <li className={`bus-item ${selectedBus === b.name ? "selected" : ""}`} key={b.name} onClick={() => setSelectedBus(b.name)}>{b.name}</li>
            ))
          }
        </ul>
      </div>
      <div id="map" style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}>
        <a className="download-button" href={image} download>Download</a>
      </div>
    </>
  )
}

export default App
