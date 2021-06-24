// Component: email-details

export default {
    props: ['email'],
    template: `
        <section>
            <h1>{{email.subject}}</h1>
            <p>{{email.body}}</p>
            <i class="icon-large back-icon" @click="emitCloseEmailDetails"></i>
            <i class="icon-large delete-icon" @click="emitDelete"></i>
            <i class="icon-large reply-icon" @click="emitReply"></i>
            <i class="icon-large" :class="envelopeIcon" @click="emitToggleRead"></i>
            <i class="icon-large star-icon" @click="emitStar"></i>

            <!-- <button @click="emitCloseEmailDetails">back</button>
            <button @click="emitDelete">delete</button>
            <button @click="emitReply">reply</button>
            <button @click="emitToggleRead">markRead</button>
            <button @click="emitStar">star</button> -->
        </section>
    `,
    data() {
        return {
        }
    },

    methods: {

        emitCloseEmailDetails(){
            this.$emit('close-email-details')
        },

        emitDelete() {
            this.$emit('delete',this.email)
        },

        emitToggleRead() {
            this.$emit('toggle-read',this.email)
        },

        emitReply() {
            this.$emit('reply',this.email)
        },

        emitStar() {
            console.log('star not implemented');
            this.$emit('star',this.email)
        },
    },

    computed: {
        envelopeIcon() {
            return this.email.isRead ? {'envelope-icon': true} : {'envelope-open-icon': true}
        },
    },

    created() {
    },

    destroyed() {
    }
}