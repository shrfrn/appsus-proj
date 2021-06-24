import noteText from './note-text.js';
import noteImg from './note-img.js';
import noteTodo from './note-todo.js';
import noteVideo from './note-video.js';
import noteAudio from './note-audio.js';

export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <component @pinNote="setPinned" @updateNote="setUpdate" @deleteNote="removeIt" :is="note.type" v-for="note in notes" :key="note.id" :info="note.info"  :id="note.id"></component> 
        </section>
    `,
    components: {
        noteText,
        noteImg,
        noteTodo,
        noteVideo,
        noteAudio,
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
