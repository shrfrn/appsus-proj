// Component: email-details

export default {
    props: ['email'],
    template: `
        <section>
            <h1>{{email}}</h1>
            <p>{{email.body}}</p>
            <button @click="emitCloseEmailDetails">back</button>
            <button @click="emitDelete">delete</button>
            <button @click="emitReply">reply</button>
            <button @click="emitToggleRead">markRead</button>
            <button @click="emitStar">star</button>
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
    },

    created() {
    },

    destroyed() {
    }
}