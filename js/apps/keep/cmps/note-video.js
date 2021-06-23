export default {
    props: ['info', 'id'],
    template: `
        <section class="note-card w-1 h-1">
            <article class="note-card-info">
                <h2>{{info.txt}}</h2>
                <div class="vid">
                    <video width="320" height="240" controls>
                        <source :src="info.url" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <button @click="removeNote">Delete</button>
                
            </article>
        </section>
    `,

    methods: {
        removeNote() {
            this.$emit('deleteNote', this.id);
        },
    },
};
