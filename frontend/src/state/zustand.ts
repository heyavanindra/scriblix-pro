import { create } from "zustand";
import type EditorJS from "@editorjs/editorjs"
import type { OutputData } from "@editorjs/editorjs";

type BlogType = {
  title: string;
  banner: string;
  content: OutputData ;
  tags: string[];
  des: string;
  author: {
    personal_info: {
      email: string;
      username: string;
      password: string;
      bio?: string;
      avatar?: string;
      blogs: string[];
    };
  };
};

type EditorStore = {
  blog: BlogType;
  editorState: "editor" | "publish";
  textEditor: EditorJS | null;
  setBlog: (data: BlogType) => void;
  setEditorState: (state: "editor" | "publish") => void;
  setTextEditor: (state: EditorJS) => void;
};

export const blogStore = create<EditorStore>()((set) => ({
  blog: {
    title: "",
    banner: "",
    content: {
      blocks:[]
    },
    tags: [],
    des: "",
    author: {
      personal_info: {
        email: "",
        username: "",
        password: "",
        blogs: [],
      },
    },
  },
  editorState: "editor",
  textEditor:null,
  setBlog: (data) => set({ blog: data }),
  setEditorState: (state) => set({ editorState: state }),
  setTextEditor: (state) => set({ textEditor: state }),
}));
