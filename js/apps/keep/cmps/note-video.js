export default {
    props: ['info'],
    template: `
        <section class="note-card">
            <h2>{{info.txt}}</h2>
        <video width="320" height="240" controls>
            <source :src="info.url" type="video/mp4">
            Your browser does not support the video tag.
            </video>
        </section>
    `,
};
