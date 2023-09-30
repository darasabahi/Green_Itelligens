import SanitizeHtml from "../../components/sanitizeHtml";
import axios from "axios";
import GetDataStyle from "@/styles/GetData.module.css";

const GateData = (props) => {
  return (
    <div className={`${GetDataStyle.main}`}>
      <div className={`${GetDataStyle.card}`}>
        <SanitizeHtml text={props.response}></SanitizeHtml>
      </div>
    </div>
  );
};
export default GateData;

export const getServerSideProps = async (context) => {
  const { params } = context;
  const ticket = params.ticket;
  const url = "/getData";
  let Response = "";
  let Error = "";
  const instance = axios.create({
    baseURL: "http://shserver.top:8080/test/users",
  });
  const headers = {
    headers: {
      Authorization: `Bearer ${ticket}`,
    },
  };

  await instance
    .get(url, headers)
    .then(function (response) {
      Response = response.data.result;
    })
    .catch(function (error) {
      Error = error;
    });

  return {
    props: { response: Response },
  };
};
