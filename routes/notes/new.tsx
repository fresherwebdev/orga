import { Handlers } from "$fresh/server.ts";
import { Button } from "../../components/Button.tsx";
import TopNav from "../../components/TopNav.tsx";
import MDEdit from "../../islands/MDEdit.tsx";
import { NotesService } from "../../services/notes.service.ts";

export const handler: Handlers<any> = {
  async POST(req: Request, ctx) {
    const data = await req.formData();
    const notesService = new NotesService();
    notesService.save(
      notesService.create(
        data.get("title") as string,
        data.get("body") as string,
      ),
    );
    return Response.redirect(new URL(req.url).origin + "/notes");
  },
};

export default function NewNote() {
  return (
    <div class="container p-4 mx-auto">
      <TopNav />
      <form method="POST">
        <div class="flex flex-row gap-2">
          <Button type="submit">Save</Button>
        </div>
        <div class="p-4"></div>
        <MDEdit content={""} name="title" />
        <div class="p-4"></div>
        <MDEdit content={""} name="body" />
      </form>
    </div>
  );
}
