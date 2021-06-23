import { noteService } from '../services/note-service.js';
import noteList from '../cmps/note-list.js';
import addNote from '../cmps/add-note.js';
import updateNote from '../cmps/update-note.js';

export default {
    template: `
        <section class="keep-app">
            <add-note v-if="!isUpdating" @addNote ="addNewNote"  />
            <update-note v-if="isUpdating" :noteId="noteId" @updateNote="updateSelectedNote"/>
            <note-list @updateNoteSelect="setUpdate" @deleteNoteSelect="removeNote" v-if="notes" :notes="notes"/>
        </section>
        `,

    components: {
        noteList,
        addNote,
        updateNote,
    },
    data() {
        return {
            notes: null,
            isUpdating: false,
            noteId: '',
        };
    },
    computed: {},
    methods: {
        loadNotes() {
            noteService.query().then((notes) => (this.notes = notes));
        },
        addNewNote(newNote) {
            noteService.create(newNote).then(this.loadNotes);
        },
        removeNote(id) {
            if (this.isUpdating) this.isUpdating = false;
            noteService.remove(id).then(this.loadNotes);
        },
        setUpdate(id) {
            this.noteId = id;
            this.isUpdating = !this.isUpdating;
        },
        updateSelectedNote(updatedNote) {
            noteService.update(updatedNote).then(this.loadNotes);
        },
    },
    created() {
        this.loadNotes();
    },
};
