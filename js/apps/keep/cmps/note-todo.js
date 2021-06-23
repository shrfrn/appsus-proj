export default {
    props: ['info', 'id'],
    template: `
        <section class="note-card w-1 h-1">
            <article :style="{ background: info.backgroundColor }" class="note-card-info">
                <h2>{{info.txt}}</h2>
                <ul>
                    <li :key="todo.id" v-for="todo in info.todos" >
                        <span @click="toggleStatus(todo)" :class="{ done: todo.isDone }">Text: {{todo.txt}}, Time: {{todo.doneAt}}</span>
                    </li>
                </ul>
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
        toggleStatus(todo) {
            todo.isDone = !todo.isDone;
            todo.doneAt = todo.isDone ? new Date().toLocaleTimeString() : '';
        },
    },
};
