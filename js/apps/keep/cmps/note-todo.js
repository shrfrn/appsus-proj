export default {
    props: ['info'],
    template: `
        <section class="note-card">
            <ul>
                <li v-for="todo in info.todos" >
                    ID: {{todo.id}} , Text: {{todo.txt}}, Time: {{todo.doneAt}}
                </li>
            </ul>
        </section>
    `,
};
