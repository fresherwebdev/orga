import { Note, NotesService } from "./notes.service.ts";
import { assert, assertEquals, assertNotEquals } from "asserts";

Deno.test("notes service crud", async t => {
    const notesService = new NotesService("test_notes");
    notesService.deleteAll();

    let newNote: Note = {
        id: null,
        title: "",
        body: "",
        updatedAt: ""
    }

    await t.step("check no notes exist", () => {
        assertEquals(notesService.getAll().length, 0);
    });

    await t.step("save new note", () => {
        newNote = notesService.create("test title", "body test");
        newNote = notesService.save(newNote);
        assertNotEquals(newNote.id, null);
    })

    await t.step("get new note", () => {
        assertEquals(newNote, notesService.getById(newNote.id ?? ""));
    });

    await t.step("all notes is now 1", () => {
        assertEquals(notesService.getAll().length, 1);
    })
    
    await t.step("update", ()=> {
        newNote.title = "updated";
        newNote.body = "also updates";
        notesService.save(newNote);
        assertEquals(newNote, notesService.getById(newNote.id ?? ""));
    })

    await t.step("delete", ()=> {
        assert(notesService.deleteById(newNote.id ?? ""));
        assertEquals(notesService.getAll().length, 0);
        assertEquals(notesService.getById(newNote.id ?? ""), null);
    })

    notesService.deleteAll();
});