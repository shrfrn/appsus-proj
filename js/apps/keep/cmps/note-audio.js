export default {
    props: ['info', 'id'],
    template: `
        <section class="note-card w-1 h-1">
            <article :style="{ background: info.backgroundColor }" class="note-card-info">
                <div class="texts">
                    <h2>{{info.txt}}</h2>
                </div>
                <div class="audio">
                <audio controls>
                    <source :src="info.url" type="audio/ogg">
                    Your browser does not support the audio element.
                </audio>
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
