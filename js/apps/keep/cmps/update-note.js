export default {
    props: ['noteId'],
    template: `
        <section class="update-note">
        <h1>YOU CAN UPDATE NOW</h1>
            <select v-model="note.type">
                <option value="noteText">noteText</option>
                <option value="noteImg">noteImg</option>
                <option value="noteVideo">noteVideo</option>
                <option value="noteTodo">noteTodo</option>
            </select>
            <label >Add Text</label>
            <input type="text" v-model="note.info.txt">

            <label>Add img/vid</label>
            <input type="text" v-model="note.info.url">

            <label>Add Todo seperated by commas (,)</label>
            <input type="text" v-model="note.info.todos">

            <label>Choose Color</label>
            <input type="color" v-model="note.info.backgroundColor">
            <select v-model="note.info.backgroundColor">
                <option value="white">white</option>
                <option value="blue">blue</option>
                <option value="green">green</option>
                <option value="red">red</option>
            </select>

            
            <button @click="update">Update Note</button>
            
        </section>
    `,

    data() {
        return {
            note: {
                id: this.noteId,
                type: 'noteText',
                isPinned: false,
                info: {
                    txt: '',
                    url: null,
                    todos: null,
                },
            },
        };
    },

    methods: {
        update() {
            this.$emit('updateNote', this.note);
        },
    },
};
