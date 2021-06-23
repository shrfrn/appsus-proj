import noteText from './note-text.js';
import noteImg from './note-img.js';
import noteTodo from './note-todo.js';
import noteVideo from './note-video.js';

export default {
    props: ['pinnedNotes'],
    template: `
    
        <section class="pinned-list">
            <component @pinNote="setPinned" @updateNote="setUpdate" @deleteNote="removeIt" :is="note.type" v-for="note in pinnedNotes" :key="note.id" :info="note.info" :id="note.id" />
        </section>
    `,
    components: {
        noteText,
        noteImg,
        noteTodo,
        noteVideo,
    },
    methods: {
        removeIt(id) {
            this.$emit('deleteNoteSelect', id);
        },
        setUpdate(id) {
            this.$emit('updateNoteSelect', id);
        },
        setPinned(id) {
            this.$emit('pinNoteSelect', id);
        },
    },
};
