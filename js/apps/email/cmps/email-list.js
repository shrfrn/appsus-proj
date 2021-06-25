import emailPreview from "./email-preview.js"

// Component: email-list

export default 
{
    props: ['emails'],
    template: `
        <section class="email-list">
            <transition-group name="email-preview-list" tag="section">
                <article v-for="email in emails" :key="email.id" class="email-preview-container">
                    <email-preview 
                        :email="email"
                        @delete="emitDelete($event)"
                        @toggle-read="emitToggleRead($event)"
                        @reply="emitReply($event)"
                        @email-details="emitEmailDetails($event)"
                        class="email-preview" />
                </article>
            </transition-group>
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
        emitEmailDetails(ev){
            this.$emit('email-details',ev)
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