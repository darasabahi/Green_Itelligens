import sanitizeHtml from "sanitize-html";
const SanitizeHtml = ({ text }) => {
  const clean = sanitizeHtml(text, {
    allowedTags: ["b", "h2"],
    disallowedTagsMode: "escape",
  });
  const result = { __html: clean };

  return <div dangerouslySetInnerHTML={result} />;
};

// export async function getStaticProps() {
//   const response = await fetch("http://shserver.top:8080/test/users/getData", {
//     method: "GET",
//     headers: {},
//   });
//   const data = await response.json();

//   return {
//     props: data,
//   };
// }

export default SanitizeHtml;
