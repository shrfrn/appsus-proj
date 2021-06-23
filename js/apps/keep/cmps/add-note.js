export default {
    template: `
        <section class="add-note">
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

            
            <button @click="add">Add Note</button>
            
        </section>
    `,

    data() {
        return {
            note: {
                type: 'noteText',
                info: {
                    txt: '',
                    url: null,
                    todos: null,
                },
            },
        };
    },

    methods: {
        add() {
            this.$emit('addNote', this.note);
        },
    },
};
