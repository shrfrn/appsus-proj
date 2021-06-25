export default {
    props: ['info', 'id'],
    template: `
        <!-- <section class="note-card w-1 h-1"> -->
            <article :style="{ background: info.backgroundColor }" class="note-card-info note-card w-1 h-1">
                <div class="texts">
                    {{info.txt}}
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

    methods: {
        removeNote() {
            this.$emit('deleteNote', this.id);
        },
        updateNote() {
            this.$emit('updateNote', this.id, this.info);
        },
        pinNote() {
            this.$emit('pinNote', this.id);
        },
        sendAsMail() {
            this.$emit('sendAsMail', this.id);
        },
    },
};
