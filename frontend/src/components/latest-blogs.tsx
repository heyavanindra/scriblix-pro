const LatestBlogs = () => {
  const blogs = [
    {
      title: "Know how to blunder your queen in 2 moves",
      src: "",
    },
    {
      title: "Why your knight hates you — and how to fix it",
      src: "",
    },
    {
      title: "10 openings guaranteed to lose in under 5 minutes",
      src: "",
    },
    {
      title: "I played the Bongcloud for 30 days. Here’s what happened",
      src: "",
    },
    {
      title: "This one trick made Magnus quit our game (not clickbait)",
      src: "",
    },
    {
      title: "The psychology behind rage quitting on move 3",
      src: "",
    },
    {
      title: "ChessGPT told me to sack my queen — so I did",
      src: "",
    },
    {
      title: "How to beat your little cousin and feel zero guilt",
      src: "",
    },
    {
      title: "Avoid these 5 endgame mistakes unless you hate winning",
      src: "",
    },
    {
      title: "I tried playing blindfold chess... and stubbed my toe",
      src: "",
    },
  ];

  return (
    <section className="px-4 py-8 lg:mt-50">
      <div className="grid grid-cols-2 gap-x-8">
        <div>
          <h2 className="font-semibold font-body text-lg px-4 py-2">Latest</h2>
          <div className="flex flex-col gap-y-5">
            {blogs.slice(0, 3).map((blog, idx) => (
              <Card key={idx} title={blog.title} src={blog.src}></Card>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-semibold font-body text-lg px-4 py-2">top</h2>
           <div className="flex flex-col gap-y-5">
            {blogs.slice(0, 3).map((blog, idx) => (
              <Card key={idx} title={blog.title} src={blog.src}></Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Card = ({ title, src }: { title: string; src: string }) => {
  return (
    <div className="bg-bg-card hover:border-accent hover:border cursor-pointer rounded-xl  p-4 flex gap-4 items-center hover:shadow-lg transition-shadow duration-300">
      <div className="w-16 h-16  rounded-lg overflow-hidden flex-shrink-0">
        {src ? (
          <img src={src} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-xs text-gray-600">
            No image
          </div>
        )}
      </div>
      <p className="text-primary-text font-body">{title}</p>
    </div>
  );
};

export default LatestBlogs;
