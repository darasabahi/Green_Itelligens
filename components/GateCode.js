import { useState } from "react";
import UseAxios from "@/useAxios";

const GateCode = ({ ticket }) => {
  const [gateCode, setGetCode] = useState(false);
  const [url, setUrl] = useState("");
  const [respones, error, loading] = UseAxios({ url, ticket });
  return (
    <>
      {gateCode ? (
        <h2>code</h2>
      ) : (
        <button
          onClick={() => {
            setUrl("/getCode");
            setGetCode(true);
          }}
        >
          Gate Code
        </button>
      )}
    </>
  );
};
export default GateCode;
