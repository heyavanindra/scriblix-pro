export const Img = ({ url, caption }: { url: string; caption: string }) => {
  return (
    <div className="my-8 text-center">
      <img
        src={url}
        alt="Image"
        className="mx-auto max-w-full rounded-md shadow-md"
      />
      {caption.length > 0 && (
        <p className="text-sm text-gray-500 italic mt-2 font-body">{caption}</p>
      )}
    </div>
  );
};



export const Quote = ({ caption, qoute }: { caption: string; qoute: string }) => {
  return (
    <div className="border-l-4 border-blue-400 pl-4 my-6 text-gray-800 italic">
      <p className="mb-2 font-body">"{qoute}"</p>
      {caption && <p className="text-sm text-gray-500 font-body">— {caption}</p>}
    </div>
  );
};


