import { noteService } from '../services/note-service.js';
import noteList from '../cmps/note-list.js';
import addNote from '../cmps/add-note.js';

export default {
    template: `
        <section class="keep-app">
            <add-note />
            <note-list v-if="notes" :notes="notes"/>
        </section>
        `,

    components: {
        noteList,
        addNote,
    },
    data() {
        return {
            notes: null,
        };
    },
    computed: {},
    methods: {
        loadNotes() {
            noteService.query().then((notes) => (this.notes = notes));
        },
    },
    created() {
        this.loadNotes();
    },
};
