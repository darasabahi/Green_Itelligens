const Test = (props) => {
  const dara = async () => {
    const response = await fetch(
      "http://shserver.top:8080/test/users/getData",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer YOUR_TICKET_IS_...852",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };
  dara();
  console.log(props);
  return (
    <>
      <h2>dara</h2>
    </>
  );
};
export async function getStaticProps() {
  return {
    props: { data: "data" },
  };
}
export default Test;

const dara = async (ticket) => {
  const headers = {
    ticket: ticket,
  };
  const data = {
    message: "Write me a chrome extension code",
  };
  console.log(ticket);
  const result = await instance
    .post("/getCode", data, headers)
    .then(function (response) {
      // setRespons(response.data);
      console.log(response.data);
      console.log("sssssssssssss");
    })
    .catch(function (error) {
      // setError(error);
      // console.log(error);
      console.log("dddddddddddddddddd");
    });
};
