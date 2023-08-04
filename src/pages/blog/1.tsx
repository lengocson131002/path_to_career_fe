import React, { useEffect } from "react";
import textfile from "./blog1.txt";
import HTMLReactParser from "html-react-parser";
import { Avatar, Button, Divider, Image, Input } from "antd";
import Event1 from "@/assets/event1.jpg";
import TextArea from "antd/es/input/TextArea";

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
    <div className="px-40 overflow-hidden">
      <Image
        src={Event1}
        width={"100%"}
        className="w-100 mx-auto block mb-6 rounded-xl"
      />
      {text && HTMLReactParser(text)}

      <Divider />

      <div>
        <h3>Bình luận (0)</h3>
        <div>
          <div className="mb-4 flex gap-3">
            <Avatar src={Event1} size={50} className="rounded-full"/>
            <TextArea rows={5}></TextArea>
          </div>
          <Button className="ms-auto block">Gửi</Button>
        </div>
      </div>
    </div>
  );
}

export default Blog1;
