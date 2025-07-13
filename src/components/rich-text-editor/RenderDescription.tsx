import { useMemo } from "react";
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/react";
import { type JSONContent } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";

const RenderDescription = ({ json }: { json: JSONContent }) => {
  const outPut = useMemo(() => {
    return generateHTML(json, [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ]);
  }, [json]);
  return <div>RenderDescription</div>;
};

export default RenderDescription;
