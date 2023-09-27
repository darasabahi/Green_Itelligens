import axios from "axios";
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

  const gatData = async () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${axiosParams.ticket}`,
      },
    };
    await instance
      .get(axiosParams.url, headers)
      .then(function (response) {
        setRespons(response.data.result);
      })
      .catch(function (error) {
        setError(error);
      });
  };
  useEffect(() => {
    switch (axiosParams.url) {
      case "/login":
        login();

      case "/getData":
        gatData();
      default:
        break;
    }
  }, [axiosParams.url]);

  return [response, error, loading, ticket];
};
export default UseAxios;
