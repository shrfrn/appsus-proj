export default {
    props: ['info', 'id'],
    template: `
        <section class="note-card w-2 h-2">
            <article :style="{ background: info.backgroundColor }" class="note-card-info">
                <h2>{{info.txt}}</h2>
                <div class="vid">
                    <video width="320" height="240" controls>
                        <source :src="info.url" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
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
