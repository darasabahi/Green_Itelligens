import axios from "axios";
import EventSource from "eventsource";
import { useEffect, useState } from "react";

const instance = axios.create({
  baseURL: "http://shserver.top:8080/test/users",
});

const UseAxios = (axiosParams) => {
  const [response, setRespons] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState("");

  const login = async () => {
    const uname = axiosParams.uname;
    const pass = axiosParams.pass;
    await instance
      .post(axiosParams.url, { uname, pass })
      .then(function (response) {
        setRespons(response.data);
        setTicket(response.data.ticket);
      })
      .catch(function (error) {
        setError(error);
      });
  };


  useEffect(() => {
    switch (axiosParams.url) {
      case "/login":
        login();
        break;
      default:
        break;
    }
  }, [axiosParams.url]);

  return [response, error, loading, ticket];
};
export default UseAxios;
