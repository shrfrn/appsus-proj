export default {
    template: `
        <section class="add-note">
        
            <!-- <label >Add Text</label> -->
            <input v-if="note.type === 'noteText'" type="text" v-model='note.info.txt' :placeholder="placeholder">
            <!-- <label>Add img</label> -->
            <input v-if="note.type === 'noteImg'" type="text" v-model="note.info.url" :placeholder="placeholder">
            <!-- <label>Add VIdeo</label> -->
            <input v-if="note.type === 'noteVideo'" type="text" v-model="note.info.url" :placeholder="placeholder">
            <!-- <label>Add Todo seperated by commas (,)</label> -->
            <input v-if="note.type === 'noteTodo'" type="text" v-model="note.info.todos" :placeholder="placeholder">

            <label>Choose Color</label>
            <input type="color" v-model="note.info.backgroundColor">
    
            <button @click="changeToTxt">A</button>
            <button @click="changeToImage">Image</button>
            <button @click="changeToVideo">Video</button>
            <button @click="changeToTodo">TODO</button>

            
            <button @click="add">Add Note</button>
            
        </section>
    `,

    data() {
        return {
            note: {
                type: 'noteText',
                isPinned: false,
                info: {
                    txt: '',
                    url: null,
                    todos: null,
                    backgroundColor: '#ffffff',
                },
            },
        };
    },

    computed: {
        placeholder() {
            const type = this.note.type;
            switch (type) {
                case 'noteText':
                    this._initNote();
                    return 'Enter Text';
                case 'noteImg':
                    this._initNote();
                    return 'Enter Img URL';
                case 'noteVideo':
                    this._initNote();
                    return 'Enter Vid URL';
                case 'noteTodo':
                    this._initNote();
                    return 'Enter comma seperated List';
            }
        },
    },

    methods: {
        add() {
            this.$emit('addNote', this.note);
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
        _initNote() {
            this.note.type = 'noteText';
            this.note.isPinned = false;
            this.note.info.txt = '';
            this.note.info.url = null;
            this.note.info.todos = null;
            this.note.info.backgroundColor = '#ffffff';
        },
    },
};
