import { IconX } from "@tabler/icons-react";
import { blogStore } from "../state/zustand";

const Tags = ({ tag }: { tag: string }) => {
  const {
    blog,
  setBlog} = blogStore();
  const handleTagDelete = () => {
    const toremoveTag = blog.tags.filter((t) => t !== tag);
setBlog({
    ...blog,
    tags:toremoveTag

})
  };
  return (
    <div className=" p-2 mt-2 mr-2 mx-2 px-3 bg-main rounded-full inline-block hover:bg-opacity-50 pr-8">
      <p >{tag}</p>
      <button className="" onClick={handleTagDelete}>
        <IconX></IconX>
      </button>
    </div>
  );
};

export default Tags;
