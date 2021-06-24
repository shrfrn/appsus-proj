import { noteService } from '../services/note-service.js';
import noteList from '../cmps/note-list.js';
import addNote from '../cmps/add-note.js';
import updateNote from '../cmps/update-note.js';
import searchNote from '../cmps/search-note.js';
import pinnedNote from '../cmps/pinned-note.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
    template: `
        <section class="keep-app">
            <search-note @filtered="setFilter" />
            <add-note v-if="!isUpdating" @addNote ="addNewNote"  />
            <update-note v-if="isUpdating" :noteId="noteId" @updateNote="updateSelectedNote"/>
            <pinned-note @pinNoteSelect="pinNote" @updateNoteSelect="setUpdate" @deleteNoteSelect="removeNote" v-if="pinned" :pinnedNotes="pinned" />
            <note-list :notes="notesToShow" @shareAsMail="shareAsMail" @pinNoteSelect="pinNote"  @updateNoteSelect="setUpdate" @deleteNoteSelect="removeNote" v-if="notes"/>
        </section>
        `,

    components: {
        noteList,
        addNote,
        updateNote,
        searchNote,
        pinnedNote,
    },

    data() {
        return {
            notes: null,
            isUpdating: false,
            noteId: '',
            filterbyQuery: {
                title: '',
            },
            pinned: null,
        };
    },
    computed: {
        notesToShow() {
            if (!this.filterbyQuery) return this.notes;
            const searchStr = this.filterbyQuery.title.toLowerCase() || '';
            const notesItems = this.notes.filter((note) => {
                return note.info.txt.toLowerCase().includes(searchStr);
            });
            return notesItems;
        },
    },

    methods: {
        loadNotes() {
            noteService.query().then((notes) => {
                this.notes = notes.filter((note) => !note.isPinned);
                this.pinned = notes.filter((note) => note.isPinned);
            });
        },
        addNewNote(newNote) {
            noteService.create(newNote).then(() => {
                this.loadNotes();
                const msg = {
                    text: 'Note added successfully',
                    type: 'success',
                };
                eventBus.$emit('show-msg', msg);
            });
        },
        removeNote(id) {
            if (this.isUpdating) this.isUpdating = false;
            noteService.remove(id).then(() => {
                this.loadNotes();
                const msg = {
                    text: 'Note removed successfully',
                    type: 'success',
                };
                eventBus.$emit('show-msg', msg);
            });
        },
        setUpdate(id) {
            const msg = {
                text: 'You can start updating',
                type: 'success',
            };
            eventBus.$emit('show-msg', msg);

            this.noteId = id;
            this.isUpdating = !this.isUpdating;
        },
        updateSelectedNote(updatedNote) {
            noteService.update(updatedNote).then(() => {
                this.loadNotes();
                const msg = {
                    text: 'Note updated successfully',
                    type: 'success',
                };
                eventBus.$emit('show-msg', msg);
            });
            this.isUpdating = !this.isUpdating;
        },
        shareAsMail(id) {
            // console.log('id :>> ', id);
            noteService.getById(id).then((note) => {
                const formattedNote = JSON.stringify(note);
                console.log('formattedNote :>> ', formattedNote);
                this.$router.push(`/email/:${formattedNote}`);
            });
        },
        pinNote(id) {
            noteService.setNotePinned(id).then(() => {
                this.loadNotes();
                const msg = {
                    text: 'Note pinned successfully',
                    type: 'success',
                };
                eventBus.$emit('show-msg', msg);
            });
        },
        setFilter(filterby) {
            this.filterbyQuery.title = filterby.title;
        },
    },
    // watch: {
    //     '$route.params.mail': {
    //         immediate: true,
    //         handler() {
    //             const { mail } = this.$route.params;
    //             console.log('mail :>> ', mail);
    //             noteService.createMailAsNote(mail).then(this.loadNotes);
    //         },
    //     },
    // },
    created() {
        this.loadNotes();
        const msg = {
            text: 'Notes loaded successfully',
            type: 'success',
        };
        eventBus.$emit('show-msg', msg);
    },
};
