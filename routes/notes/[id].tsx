import { Handlers, PageProps } from "$fresh/server.ts";
import TopNav from "../../components/TopNav.tsx";
import { Note, NotesService } from "../../services/notes.service.ts";
import * as markdown from "markdown";
import MDView from "../../components/MDView.tsx";
import LinkButton from "../../components/LinkButton.tsx";
import MDEdit from "../../islands/MDEdit.tsx";
import { Button } from "../../components/Button.tsx";
import DeleteButton from "../../islands/DeleteButton.tsx";

export const handler: Handlers<Note | null> = {
  GET(_, ctx) {
    const notesService = new NotesService();
    return ctx.render(notesService.getById(ctx.params.id));
  },
  async POST(req, ctx) {
    const url = new URL(req.url);
    const data = await req.formData();
    const notesService = new NotesService();
    const note = notesService.getById(ctx.params.id);
    if (note === null) {
      return Response.redirect(url.origin + url.pathname);
    }

    note.title = data.get("title") as string;
    note.body = data.get("body") as string;
    notesService.save(note);
    return Response.redirect(url.origin + url.pathname);
  },
  DELETE(req, ctx) {
    const notesService = new NotesService();

    if (notesService.deleteById(ctx.params.id)) {
      return new Response();
    }
    return new Response("error", { status: 400 });
  },
};
export default function ReadNote({ data, url }: PageProps<Note | null>) {
  if (data === null) {
    return (
      <div class="container p-4 mx-auto">
        <TopNav />
        <p>Not found</p>
      </div>
    );
  }

  let isEditMode = false;
  if (url.search !== "") {
    const searchParams = new URLSearchParams(url.search);
    isEditMode = searchParams.get("edit") === "1";
  }

  return (
    <div class="container p-4 mx-auto">
      <TopNav />
      <form method="POST">
        <div class="flex flex-row gap-2">
          {isEditMode
            ? <Button type="submit">Save</Button>
            : (
              <LinkButton href={"/notes/" + data.id + "?edit=1"}>
                Edit
              </LinkButton>
            )}
          {isEditMode
            ? null
            : <DeleteButton redirectOnSuccessUrl={url.origin + "/notes"} />}
        </div>
        <div class="p-4"></div>
        {isEditMode
          ? <MDEdit content={data.title} name="title" />
          : <MDView content={data.title} />}
        <div class="p-4"></div>
        {isEditMode
          ? <MDEdit content={data.body} name="body" />
          : <MDView content={data.body} />}
      </form>
      <div class="p-4"></div>
      <p>Last update: {new Date(data.updatedAt).toLocaleString()}</p>
    </div>
  );
}
