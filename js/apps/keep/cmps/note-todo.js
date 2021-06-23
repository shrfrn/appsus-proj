export default {
    props: ['info', 'id'],
    template: `
        <section class="note-card w-1 h-1">
            <article class="note-card-info">
                <ul>
                    <li v-for="todo in info.todos" >
                        Text: {{todo.txt}}, Time: {{todo.doneAt}}
                    </li>
                </ul>
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
