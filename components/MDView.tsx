import * as markdown from "markdown";

export default function MDView({ content }: { content: string }) {
  if (!content) {
    content = "";
  }
  return (
    <div
      class="prose-sm"
      dangerouslySetInnerHTML={{
        __html: markdown.Marked.parse(content).content,
      }}
    >
    </div>
  );
}
