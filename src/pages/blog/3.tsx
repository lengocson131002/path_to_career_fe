import React from "react";
import textfile from "./blog3.txt";
import HTMLReactParser from "html-react-parser";

function Blog1() {
  const [text, setText] = React.useState<string>();
  fetch(textfile)
    .then((response) => response.text())
    .then((textContent) => {
      setText(textContent);
    });

  return <div className="px-40">{text && HTMLReactParser(text)}</div>;
}

export default Blog1;
