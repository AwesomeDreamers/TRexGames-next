import { imageUpload } from "@/lib/actions/file.actions";
import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";
import ReactQuillRef from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function ReactQuillEditor({ ...rest }: any) {
  const quillRef = useRef<ReactQuillRef | null>(null);
  const imageHandler = async () => {
    if (!quillRef.current) return;

    const quillInstance: any = quillRef.current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      try {
        const formData = new FormData();
        if (file) {
          formData.append("file", file);
        }
        const url = await imageUpload(formData);
        const range = quillInstance.getSelection(true);
        quillInstance.insertEmbed(range.index, "image", url);
        quillInstance.setSelection(range.index + 1);
      } catch (error) {
        console.log(error);
      }
    };
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "background",
    "color",
    "link",
    "image",
    "video",
    "width",
  ];

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["image", "link", "video"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      // 이미지 리사이즈 모듈을 사용합니다.
      // imageResize: {},
    };
  }, []);

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      modules={modules}
      {...rest}
      className="min-h-[150px]"
    />
  );
}
