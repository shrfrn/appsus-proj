import noteText from './note-text.js';
import noteImg from './note-img.js';
import noteTodo from './note-todo.js';
import noteVideo from './note-video.js';

export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <component :is="note.type" v-for="note in notes" :info="note.info"></component>
        </section>
    `,
    components: {
        noteText,
        noteImg,
        noteTodo,
        noteVideo,
    },
};
