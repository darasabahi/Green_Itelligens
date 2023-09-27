import { useState } from "react";
import SanitizeHtml from "../components/sanitizeHtml";
import UseAxios from "@/useAxios";

const GateDate = ({ ticket }) => {
  const [url, setUrl] = useState("");
  const [respones, error, loading] = UseAxios({ url, ticket });
  const [gateData, setGetData] = useState(false);

  return (
    <>
      {gateData ? (
        <SanitizeHtml text={respones}></SanitizeHtml>
      ) : (
        <button
          onClick={() => {
            setUrl("/getData");
            setGetData(true);
          }}
        >
          Gate Data
        </button>
      )}
    </>
  );
};
export default GateDate;
