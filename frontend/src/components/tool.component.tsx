
import List from "@editorjs/list";


export const tools = {
  embed: Embed,
  link: EditorjsList,
  list: {
    config:List,
    inlineToolbar:true
  },
  image: Image,
  header: {
    class:Header,
    config:{
        placeholder:"Type Heading....",
        levels:[2,3],
        defaultLevel:2
    }
  },
  quote: Quote,
  marker: Marker ,
  inlineCode: InlineCode,
};
