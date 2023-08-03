import React, { useEffect } from "react";
import textfile from "./blog4.txt";
import HTMLReactParser from "html-react-parser";

function Blog1() {
  const [text, setText] = React.useState<string>();
  useEffect(() => {
    fetch(textfile)
      .then((response) => response.text())
      .then((textContent) => {
        setText(textContent);
      });
  }, []);

  return (
    <div className="px-40 overflow-hidden">{text && HTMLReactParser(text)}</div>
  );
}

export default Blog1;
