import { useState } from "preact/hooks";
import { JSX } from "preact";
import * as markdown from "markdown";

export default function MDEdit(
  { content, name }: {
    content: string;
    name: string;
  },
) {
  if (!content) {
    content = "";
  }
  const [data, setData] = useState(content);

  const onDataChange = (
    { currentTarget }: JSX.TargetedEvent<HTMLTextAreaElement, Event>,
  ) => {
    setData(currentTarget.value);
  };

  return (
    <div class="flex flex-row gap-4">
      <textarea
        class="border-solid border-black border-1 rounded w-1/2 h-48 p-1"
        onInput={onDataChange}
        id={name}
        name={name}
      >
        {data}
      </textarea>
      <div
        class="prose-sm"
        dangerouslySetInnerHTML={{
          __html: markdown.Marked.parse(data).content,
        }}
      >
      </div>
    </div>
  );
}
