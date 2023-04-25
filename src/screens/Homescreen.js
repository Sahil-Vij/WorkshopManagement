import axios from "axios";
import React, { useEffect, useState } from "react";
import Event from "../components/Event";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker, Space } from "antd";
//import 'antd/dist/antd.css'
import moment from "moment";

const { RangePicker } = DatePicker;

function Homescreen() {
  const [events, setevents] = useState([]);
  const [loading, setloading] = useState();
  const [error, setError] = useState();
  const [fromdate, setfromdate] = useState(moment().format("DD-MM-YYYY"));
  const [todate, settodate] = useState(
    moment().add(30, "days").format("DD-MM-YYYY")
  );
  const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("All");
  

  function filterByDate(dates) {
    console.log(dates[0].format("DD-MM-YYYY"));
    console.log(dates[1].format("DD-MM-YYYY"));
    setfromdate(dates[0].format("DD-MM-YYYY"));
    settodate(dates[1].format("DD-MM-YYYY"));
  }

  const fetchData = async () => {
    try {
      setloading(true);
      const data = (await axios.get("/api/events/getallevents")).data;
      console.log(data);
      setevents(data);
      setloading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function filterBySearch() {
    try {
      const key = await setSearchKey();
      const filteredEvents =
        events &&
        events.filter((event) =>
          event.name.toLowerCase().includes(searchKey.toLowerCase())
        );
      setevents(filteredEvents);
    } catch (error) {
      console.log(error);
    }
  }
  const sortedEvents=events.sort((a, b) => {
    const dateA = moment(a.Date, "DD-MM-YYYY").toDate();
    const dateB = moment(b.Date, "DD-MM-YYYY").toDate();
    return dateA - dateB;
  });

  console.log("sortedEvents",sortedEvents);
  return (
    <div className="container">
      {/* <div className="row mt-5 bs justify-content-center">
        <div className="col-md-3 ">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="search-events"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
              console.log("searchKey", searchKey);
            }}
            onKeyDown={() => filterBySearch(searchKey)}
          />
        </div>
        <div className="col-md-3">
          <select className="form-control">
            <option value="all">All</option>
            <option value="Delux">Delux</option>
            <option value="Non-Delux">Non-Delux</option>
            <option value="Crafts">Crafts</option>
          </select>
        </div>
      </div> */}
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          sortedEvents.map((event) => {
            return (
              <div className="col-md-9 mt-2">
                <Event event={event} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
