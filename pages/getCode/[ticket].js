import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import GetCodeStyle from "@/styles/GetCode.module.css";

const GetCode = () => {
  const [response, setResponse] = useState("");
  const router = useRouter();
  const { ticket } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${ticket}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          message: "Write me a chrome extension code",
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        let res = await fetch(
          "http://shserver.top:8080/test/users/getCode",
          requestOptions
        );

        if (res.ok) {
          const reader = res.body.getReader();
          const processStream = async () => {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                console.log("stream completed");
                setGenerating(false);
                break;
              }
              let chunk = new TextDecoder("utf-8").decode(value);
              chunk = chunk.replace(/data:/g, "");

              try {
                if (chunk) {
                  const parsed = JSON.parse(chunk);
                  setResponse((prev) => prev + parsed.content);
                }
              } catch (error) {}
            }
          };
          processStream().catch((err) => console.log("--stream error--", err));
        } else {
          alert(`error getting response`);
        }
      } catch (error) {
        alert(`error: ${error.message}`);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={`${GetCodeStyle.main}`}>
        <div className={`${GetCodeStyle.description}`}>{response}</div>
      </div>
    </>
  );
};
export default GetCode;
