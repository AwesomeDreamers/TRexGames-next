import { imageUpload } from "@/actions/file.actions";
import BlotFormatter from "quill-blot-formatter";
import "quill/dist/quill.snow.css";
import { useEffect } from "react";
import { useQuill } from "react-quilljs";

const ReactQuillEditor = ({ ...props }: any) => {
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} },
  });

  if (Quill && !quill) {
    Quill.register("modules/blotFormatter", BlotFormatter);
  }

  useEffect(() => {
    if (quill) {
      if (props.onChange) {
        quill.on("text-change", () => {
          props.onChange(quill.root.innerHTML);
        });
      }
      if (props.value) {
        quill.clipboard.dangerouslyPasteHTML(props.value || "");
      }
      (quill.getModule("toolbar") as any).addHandler("image", async () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
          const file = input.files?.[0];
          if (!file) {
            console.error("파일이 선택되지 않았습니다.");
            return;
          }

          try {
            const formData = new FormData();
            formData.append("file", file);
            console.log("formData", formData.get("file"));

            const url = await imageUpload(formData);
            const range = quill.getSelection(true);
            if (range) {
              quill.insertEmbed(range.index, "image", url);
              quill.setSelection(range.index + 1);
            }
          } catch (error) {
            console.error("이미지 업로드 중 오류 발생:", error);
          }
        };
      });
    }
  }, [quill, Quill]);

  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
};

export default ReactQuillEditor;
