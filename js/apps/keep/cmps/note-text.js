export default {
    props: ['info', 'id'],
    template: `
        <section class="note-card w-1 h-1">
            <article :style="{ background: info.backgroundColor }" class="note-card-info">
                {{info.txt}}
                <button @click="removeNote">Delete</button>
                <button @click="updateNote">Update</button>
                <button @click="pinNote">Pin</button>
            </article>
        </section>
    `,

    methods: {
        removeNote() {
            this.$emit('deleteNote', this.id);
        },

        updateNote() {
            this.$emit('updateNote', this.id);
        },
        pinNote() {
            this.$emit('pinNote', this.id);
        },
    },
};
