import noteText from './note-text.js';
import noteImg from './note-img.js';
import noteTodo from './note-todo.js';
import noteVideo from './note-video.js';

export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <component @deleteNote="removeIt":is="note.type" v-for="note in notes" :info="note.info" @updateNote="setUpdate" :id="note.id"></component> 
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
    },
};
