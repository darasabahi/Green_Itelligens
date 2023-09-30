import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

import Login from "../components/Login";
import { useState, useEffect } from "react";
import UseAxios from "@/useAxios";

function Home() {
  const [uname, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [respones, error, loading] = UseAxios({ uname, pass, url });
  const [ticket, setTicket] = useState("");
  const [getDataButton, setGetDataButton] = useState("Get Data");

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

  return (
    <>
      <Head>
        <title>Dara Sabahi App</title>
      </Head>
      <main className={`${styles.main} `}>
        {respones ? (
          <div>
            <div
              className={`${styles.card} `}
              onClick={() => setGetDataButton("Please Wait!")}
            >
              <Link href={`./getData/[ticket]`} as={`./getData/${ticket}`}>
                {getDataButton}
              </Link>
            </div>

            <div className={`${styles.card} `}>
              <Link href={`/getCode/${ticket}`} as={`/getCode/${ticket}`}>
                Get Code
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <Login
              uname={uname}
              pass={pass}
              setUname={setUname}
              setPass={setPass}
              login={login}
              error={error}
            ></Login>
          </div>
        )}
      </main>
    </>
  );
}

export default Home;
