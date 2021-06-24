export default {
    props: ['noteId'],
    template: `
        <section class="update-note">
        <div class="update-container">
            
            <div class="update-inputs">
                    <input v-if="note.type === 'noteText'" type="text" v-model='note.info.txt' :placeholder="placeholder">      
                    <input v-if="note.type === 'noteImg'" type="text" v-model="note.info.url" :placeholder="placeholder">
                    <input v-if="note.type === 'noteVideo'" type="text" v-model="note.info.url" :placeholder="placeholder">
                    <input v-if="note.type === 'noteTodo'" type="text" v-model="note.info.todos" :placeholder="placeholder">
                    <input v-if="note.type === 'noteAudio'" type="text" v-model="note.info.url" :placeholder="placeholder">
            </div>

            <div class="buttons">
                <button @click="togglePalette">
                    <i class="fas fa-palette"></i>  
                </button>
                <input v-if="isPalette" type="color" v-model="note.info.backgroundColor">

                <button @click="changeToTxt"><i class="fas fa-font"></i></button>
                <button @click="changeToImage"><i class="fas fa-image"></i></i></button>
                <button @click="changeToVideo"><i class="fas fa-video"></i></button>
                <button @click="changeToTodo"><i class="fas fa-list"></i></button>
                <button @click="changeToAudio"><i class="fas fa-volume-up"></i></button>
            </div>
            
            <div class="update-btn">
                <button @click="update"><i class="fas fa-pen"></i></button>
            </div>
        </div>
            
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
            isPalette: false,
        };
    },
    computed: {
        placeholder() {
            const type = this.note.type;
            switch (type) {
                case 'noteText':
                    return 'YOU CAN UPDATE NOW';
                case 'noteImg':
                    return 'Enter Img URL';
                case 'noteVideo':
                    return 'Enter Vid URL';
                case 'noteTodo':
                    return 'Enter comma seperated List';
                case 'noteAudio':
                    return 'Enter audio URL';
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
        changeToAudio() {
            this.note.type = 'noteAudio';
        },
        changeToTodo() {
            this.note.type = 'noteTodo';
        },
        togglePalette() {
            this.isPalette = !this.isPalette;
        },
    },
};
