export default {
    props: ['info', 'id'],
    template: `
        <section class="note-card w-2 h-2">
            <article :style="{ background: info.backgroundColor }" class="note-card-info">
                <h3>{{info.txt}}</h3>
                <div class="image">
                    <img :src="info.url" alt="">
                </div>
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
