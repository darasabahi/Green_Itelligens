import { useState } from "react";
import SanitizeHtml from "../../components/sanitizeHtml";
import UseAxios from "@/useAxios";
import axios from "axios";

const GateData = (props) => {
  return (
    <>
      <SanitizeHtml text={props.response}></SanitizeHtml>
    </>
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
