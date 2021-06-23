import emailPreview from "./email-preview.js"

// Component: email-list

export default 
{
    props: ['emails'],
    template: `
        <section class="email-list">
            <article v-for="email in emails" :key="email.id" class="email-preview-container">
                <email-preview :email="email" class="email-preview" />
                <router-link :to="'/email/' + email.id">Details</router-link>
            </article>
        </section>
    `,
    data() {
        return {
        }
    },

    methods: {
    },

    computed: {
    },

    created() {
    },

    destroyed() {
    },
    components: {
        emailPreview,
    }
}