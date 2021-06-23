export default {
    props: ['info'],
    template: `
        <section class="note-card">
            <h3>{{info.title}}</h3>
            <img :src="info.url" alt="">
        </section>
    `,
};
