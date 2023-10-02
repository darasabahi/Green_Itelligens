import { useRouter } from "next/router";
import { useEffect } from "react";
import GetCodeStyle from "@/styles/GetCode.module.css";

let startCode = false;
let startText = false;
let startCodeTitel = false;
let code = 0;
let text = 0;
let codeTitel = 0;
const GetCode = () => {
  const router = useRouter();
  const { ticket } = router.query;

  const Dara = (word) => {
    console.log({ word });
    if (word === "```") {
      if (!startCodeTitel) {
        console.log("start code titel");
        startCodeTitel = true;
        startText = false;
        var b = document.getElementById("main");
        var a = document.createElement("h5");
        var c = document.createElement("pre");
        codeTitel += 1;
        a.setAttribute("id", `codetitel${codeTitel}`);
        c.setAttribute("id", `pre${codeTitel}`);
        b.appendChild(c);
        c.appendChild(a);
      } else {
        console.log("end of code titel");
        console.log("start code");
        var b = document.getElementById(`pre${codeTitel}`);
        var a = document.createElement("code");

        code += 1;
        a.setAttribute("id", `code${code}`);
        b.appendChild(a);
        startCodeTitel = false;
        startCode = true;
      }
    } else if (word === "`") {
      console.log("end of code");
      startCode = false;
    } else {
      if (startCodeTitel) {
        var b = document.getElementById(`codetitel${codeTitel}`);
        if (b) b.innerText = b.innerText + word;
      } else if (startCode) {
        var b = document.getElementById(`code${code}`);
        if (b) b.innerText = b.innerText + word;
        if (
          word === ";" ||
          word === ">" ||
          word === "{" ||
          word === "}" ||
          word === ","
        ) {
          var a = document.createElement("br");
          b.appendChild(a);
        }
      } else {
        if (!startText) {
          console.log("start text");
          startText = true;
          var b = document.getElementById("main");
          var a = document.createElement("p");
          text = text + 1;
          a.setAttribute("id", `text${text}`);
          a.appendChild(document.createTextNode(word));
          b.appendChild(a);
        } else {
          var b = document.getElementById(`text${text}`);
          if (b) b.innerText = b.innerText + word;
        }
      }
    }
  };

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
                startCode = false;
                startText = false;
                setGenerating(false);
                break;
              }
              let chunk = new TextDecoder("utf-8").decode(value);
              chunk = chunk.replace(/data:/g, "");

              try {
                if (chunk) {
                  const parsed = JSON.parse(chunk);
                  Dara(parsed.content);
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
      <div className={`${GetCodeStyle.main}`} id="main"></div>
    </>
  );
};
export default GetCode;
