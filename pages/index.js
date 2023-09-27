import Head from "next/head";
import styles from "@/styles/Home.module.css";

import Login from "../components/Login";
import { useState, useEffect } from "react";
import UseAxios from "@/useAxios";
import GateDate from "@/components/GateData";

function Home() {
  const [uname, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [respones, error, loading] = UseAxios({ uname, pass, url });
  const [ticket, setTicket] = useState("dara sabahi");

  useEffect(() => {
    setTicket(respones.ticket);
  }, [respones]);

  const login = async (event) => {
    event.preventDefault();
    setUrl("/login");
  };
  const setUname = (value) => {
    setUsername(value);
  };
  const setPass = (value) => {
    setPassword(value);
  };

  const callGateDataApi = async () => {
    setUrl("/gatData");
  };
  return (
    <>
      <Head>
        <title>Dara Sabahi App</title>
      </Head>
      <main className={`${styles.main} `}>
        {respones ? (
          <GateDate ticket={ticket} />
        ) : (
          <div>
            <Login
              uname={uname}
              pass={pass}
              setUname={setUname}
              setPass={setPass}
              login={login}
            ></Login>
            <div>{error && <label>{error?.response?.data.message}</label>}</div>
          </div>
        )}
      </main>
    </>
  );
}

export default Home;
