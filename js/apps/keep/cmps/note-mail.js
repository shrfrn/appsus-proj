export default {
    props: ['info', 'id'],
    template: `
            <!-- <section class="note-card w-2 h-1"> -->
            <article :style="{ background: info.backgroundColor }" class="note-card-info note-mail note-card w-2 h-1">
                <div class="texts">
                    
                    <p>FROM: <span>{{info.from}}</span> TO: <span>{{info.to}}</span></p>
                    <p>{{info.subject}}</p>
                    <p>SENT AT: <span> {{time}}</span></p>
                    <p>{{info.txt}}</p>
                    
                </div>
                <div class="buttons-actions">
                    <button @click="removeNote"><i class="fas fa-trash-alt"></i></button>
                    <button @click="updateNote"><i class="fas fa-edit"></i></button>
                    <button @click="pinNote"><i class="fas fa-thumbtack"></i></button>
                    <button @click="sendAsMail"><i class="fas fa-envelope"></i></button>
                </div>
            </article>
        <!-- </section> -->
        `,
    computed: {
        time() {
            return new Date(this.info.sentAt).toLocaleTimeString();
        },
    },
    methods: {
        removeNote() {
            console.log('this.id :>> ', this.id);
            this.$emit('deleteNote', this.id);
        },
        updateNote() {
            this.$emit('updateNote', this.id);
        },
        pinNote() {
            this.$emit('pinNote', this.id);
        },
        sendAsMail() {
            this.$emit('sendAsMail', this.id);
        },
    },
};
