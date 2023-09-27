import { useState } from "react";
import SanitizeHtml from "../../components/sanitizeHtml";
import UseAxios from "@/useAxios";
import axios from "axios";

const GateData = (props) => {
  console.log(props);
  return (
    <>
      <SanitizeHtml text={props.respones}></SanitizeHtml>
    </>
  );
};
export default GateData;

export const getServerSideProps = async (context) => {
  const { params } = context;
  const ticket = params.ticket;
  const url = "/gateData";
  let response = "";
  let error = "";
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
      response = response.data.result;
    })
    .catch(function (error) {
      error = error;
    });

  return {
    props: { response: response, error: error },
  };
};
