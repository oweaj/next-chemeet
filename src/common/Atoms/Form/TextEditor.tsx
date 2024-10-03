import { ReactQuillProps } from "react-quill";
import QuillNoSSR from "./QuillNoSSR";

type TEditorProps = ReactQuillProps;
export default function TextEditor(props: TEditorProps) {
  return (
    <div className="editor w-full flex-1">
      <QuillNoSSR forwardedRef={null} {...props} />
    </div>
  );
}
