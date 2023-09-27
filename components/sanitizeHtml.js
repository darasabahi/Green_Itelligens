import sanitizeHtml from "sanitize-html";
const SanitizeHtml = ({ text }) => {
  const clean = sanitizeHtml(text, {
    allowedTags: ["b", "h2"],
    disallowedTagsMode: "escape",
  });
  const result = { __html: clean };

  return <div dangerouslySetInnerHTML={result} />;
};

export default SanitizeHtml;
