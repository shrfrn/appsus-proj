export default {
    props: ['info', 'id'],
    template: `
        <section class="note-card w-1 h-1">
            <article :style="{ background: info.backgroundColor }" class="note-card-info todo-component">
                <div class="texts">
                    <h2>{{info.txt}}</h2>
                </div>
                <div class="list">
                    <ul>
                        <li :key="todo.id" v-for="todo in info.todos" >
                            <p @click="toggleStatus(todo)" :class="{ done: todo.isDone }">
                                - {{todo.txt}}
                                <span v-if="todo.isDone">{{todo.doneAt}}</span>
                            </p>
                        </li>
                    </ul>
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
        toggleStatus(todo) {
            todo.isDone = !todo.isDone;
            todo.doneAt = todo.isDone ? new Date().toLocaleTimeString() : '';
        },
    },
};
