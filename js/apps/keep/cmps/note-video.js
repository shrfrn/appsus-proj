export default {
    props: ['info', 'id'],
    template: `
        <section class="note-card w-2 h1">
            <article :style="{ background: info.backgroundColor }" class="note-card-info">
                <div class="vid">
                    <video width="320" height="240" controls>
                        <source :src="info.url" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
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
