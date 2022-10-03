import { Handlers, PageProps } from "$fresh/server.ts";
import TopNav from "../../components/TopNav.tsx";
import { Note, NotesService } from "../../services/notes.service.ts";
import * as markdown from "markdown";
import NotePreview from "../../components/notes/NotePreview.tsx";
import LinkButton from "../../components/LinkButton.tsx";

export const handler: Handlers<Note[]> = {
  GET(_, ctx) {
    const notesService = new NotesService();
    return ctx.render(notesService.getAll());
  }
};

export default function Notes({ data }: PageProps<Note[]>) {
  return (
    <div class="container p-4 mx-auto">
      <TopNav />
      <LinkButton href="/notes/new">New</LinkButton>
    
      {data.map((item) => <NotePreview note={item} />)}
    </div>
  );
}
