export default {
    props: ['info', 'id'],
    template: `
        <section class="note-card w-1 h-1">
            <article class="note-card-info">
                {{info.txt}}
                <button @click="removeNote">Delete</button>
                <button @click="updateNote">Update</button>
            </article>
        </section>
    `,

    methods: {
        removeNote() {
            console.log('this.id :>> ', this.id);
            this.$emit('deleteNote', this.id);
        },

        updateNote() {
            console.log('this.id :>> ', this.id);
            this.$emit('updateNote', this.id);
        },
    },
};
