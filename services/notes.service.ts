import { nanoid } from "https://esm.sh/nanoid@4.0.0";

export interface Note {
    id: string | null;
    title: string;
    body: string;
    updatedAt: string;
}


export class NotesService {
    constructor(private storageKey: string = "notes") {
    }

    save(note: Note): Note {
        if (note.id === null) {
            note.id = nanoid();
        }
        note.updatedAt = (new Date()).toISOString();
        const notes = this.getNotesFromStorage();
        notes.set(note.id, note);
        this.storeNotesInStorage(notes);
        return note;
    }

    create(title: string, body: string): Note {
        return { id: nanoid(), title, body, updatedAt: (new Date()).toISOString() }
    }

    getById(noteId: string): Note | null {
        const notes = this.getNotesFromStorage();
        const note = notes.get(noteId);
        if (!note) {
            return null;
        }
        return note;
    }

    deleteById(noteId: string): boolean {
        const notes = this.getNotesFromStorage();
        const result = notes.delete(noteId);
        this.storeNotesInStorage(notes);
        return result;
    }

    getAll(): Note[] {
        return Array.from(this.getNotesFromStorage().values());
    }

    deleteAll() {
        localStorage.removeItem(this.storageKey);
    }

    private getNotesFromStorage(): Map<string, Note> {
        const notesString = localStorage.getItem(this.storageKey);
        if (notesString === null) {
            return new Map<string, Note>();
        }

        return new Map<string, Note>(Object.entries(JSON.parse(notesString)));
    }

    private storeNotesInStorage(notes: Map<string, Note>) {
        localStorage.setItem(this.storageKey, JSON.stringify(Object.fromEntries(notes)));
    }

}