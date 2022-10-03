import { Note } from "../../services/notes.service.ts";
import * as markdown from "markdown";
import MDView from "../MDView.tsx";


export default function NotePreview({note} :{note: Note}) {
  return (
    <div class="border-solid rounded-lg border-black border-1 p-4 my-2">
      <MDView content={note.title} />
      <div class="flex flex-row-reverse gap-4">
        <a href={"/notes/" + note.id} class="underline">Read</a>
        <span>{new Date(note.updatedAt).toLocaleString()}</span>
      </div>
    </div>
  );
}
