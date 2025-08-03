import { Img, Quote } from "./blogHelper";

type BlockType = {
  block: {
    id: string;
    type: string;
    data: {
      caption: string;
      text: "string";
      level?: number;
      file: {
        url: string;
      };
    };
  };
};

const BlockContent = ({ block }: BlockType) => {
  const { data, type } = block;

  if (type === "paragraph") {
    return (
      <p
        className="mb-4 leading-relaxed font-body"
        dangerouslySetInnerHTML={{ __html: data.text }}
      ></p>
    );
  }

  if (type === "header") {
    if (data.level === 3) {
      return (
        <h3
          className="text-2xl font-semibold mt-6 mb-2 font-body"
          dangerouslySetInnerHTML={{ __html: data.text }}
        ></h3>
      );
    }
    return (
      <h2
        className="text-3xl font-bold mt-8 mb-4 font-body"
        dangerouslySetInnerHTML={{ __html: data.text }}
      ></h2>
    );
  }

  if (type === "image") {
    return <Img url={data.file.url} caption={data.caption} />;
  }

  if (type === "quote") {
    return <Quote qoute={data.text} caption={data.caption} />;
  }

  return <div className="text-gray-700 font-body">{data.text}</div>;
};

export default BlockContent;
