export default {
    template: `
        <section class="add-note">

        <div class="add-container">
            <div class="add-inputs">
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

            <div class="add-btn">
                <button @click="add"><i class="fas fa-plus"></i></button>
            </div>
        </div>

            
            
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
                    backgroundColor: null,
                },
            },
            isPalette: false,
        };
    },

    computed: {
        placeholder() {
            const type = this.note.type;
            const isChanged = true;
            switch (type) {
                case 'noteText':
                    return 'Enter Text';
                case 'noteImg':
                    return 'Enter Img URL';
                case 'noteVideo':
                    return 'Enter Vid URL';
                case 'noteTodo':
                    return 'Enter comma seperated List';
                case 'noteAudio':
                    return 'Enter audio URL';
            }
            if (isChanged) _initNote();
        },
    },

    methods: {
        add() {
            console.log('this.note :>> ', this.note);
            this.$emit('addNote', this.note);
            setTimeout(() => {
                this._initNote();
            }, 2);
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
