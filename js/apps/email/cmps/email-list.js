import emailPreview from "./email-preview.js"

// Component: email-list

export default 
{
    props: ['emails'],
    template: `
        <section class="email-list">
            <article v-for="email in emails" :key="email.id" class="email-preview-container">
                <email-preview 
                    :email="email"
                    @delete="emitDelete($event)"
                    @toggle-read="emitToggleRead($event)"
                    @reply="emitReply($event)"
                    class="email-preview" />
                <router-link :to="'/email/' + email.id">Details</router-link>
            </article>
        </section>
    `,
    data() {
        return {
        }
    },

    methods: {
        emitDelete(ev) {
            this.$emit('delete',ev)
        },
        emitToggleRead(ev) {
            this.$emit('toggle-read',ev)
        },
        emitReply(ev) {
            this.$emit('reply',ev)
        },
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