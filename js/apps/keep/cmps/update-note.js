export default {
    props: ['noteId'],
    template: `
        <section class="update-note">
        <h1>YOU CAN UPDATE NOW</h1>
            <!-- <label >Add Text</label> -->
            <input v-if="type === 'noteText'" type="text" v-model='note.info.txt' :placeholder="placeholder">
            <!-- <label>Add img</label> -->
            <input v-if="type === 'noteImg'" type="text" v-model="note.info.url" :placeholder="placeholder">
            <!-- <label>Add VIdeo</label> -->
            <input v-if="type === 'noteVideo'" type="text" v-model="note.info.url" :placeholder="placeholder">
            <!-- <label>Add Todo seperated by commas (,)</label> -->
            <input v-if="type === 'noteTodo'" type="text" v-model="note.info.todos" :placeholder="placeholder">

            <label>Choose Color</label>
            <input type="color" v-model="note.info.backgroundColor">
    
            <button @click="changeToTxt">A</button>
            <button @click="changeToImage">Image</button>
            <button @click="changeToVideo">Video</button>
            <button @click="changeToTodo">TODO</button>
            
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
    computed: {
        placeholder() {
            const type = this.note.type;
            switch (type) {
                case 'noteText':
                    return 'Enter Text';
                case 'noteImg':
                    return 'Enter Img URL';
                case 'noteVideo':
                    return 'Enter Vid URL';
                case 'noteTodo':
                    return 'Enter comma seperated List';
            }
        },
        type() {
            return this.note.type;
        },
    },

    methods: {
        update() {
            this.$emit('updateNote', this.note);
        },
        changeToTxt() {
            this.note.type = 'noteText';
        },
        changeToImage() {
            this.note.type = 'noteImg';
        },
        changeToVideo() {
            this.note.type = 'noteVideo';
        },
        changeToTodo() {
            this.note.type = 'noteTodo';
        },
    },
};
