export default {
    props: ['info', 'id'],
    template: `
        <section class="note-card w-2">
            <article :style="{ background: info.backgroundColor }" class="note-card-info">
                <h3>{{info.txt}}</h3>
                <div class="image">
                    <img :src="info.url" alt="">
                </div>
                <div class="buttons-actions">
                    <button @click="removeNote"><i class="fas fa-trash-alt"></i></button>
                    <button @click="updateNote"><i class="fas fa-edit"></i></button>
                    <button @click="pinNote"><i class="fas fa-thumbtack"></i></button>
                </div>
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
