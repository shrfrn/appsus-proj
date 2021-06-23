export default {
    props: ['info', 'id'],
    template: `
        <section class="note-card w-1 h-1">
            <article class="note-card-info">
                <h3>{{info.txt}}</h3>
                <div class="image">
                    <img :src="info.url" alt="">
                </div>
                <button @click="removeNote">Delete</button>
            </article>
        </section>
    `,

    methods: {
        removeNote() {
            console.log('this.id :>> ', this.id);
            this.$emit('deleteNote', this.id);
        },
    },
};
