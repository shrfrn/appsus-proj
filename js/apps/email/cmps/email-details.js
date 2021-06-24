// Component: email-details

export default {
    props: ['email'],
    template: `
        <section class="email-details">
            <h1>{{email.subject}}</h1>
            <p>from {{email.from}},<span>{{sentAt}}</span></p>
            <p>{{email.body}}</p>
            <div class="actions">
                <i class="icon-large back-icon" @click="emitCloseEmailDetails"></i>
                <i class="icon-large delete-icon" @click="emitDelete"></i>
                <i class="icon-large reply-icon" @click="emitReply"></i>
                <i class="icon-large" :class="envelopeIcon" @click="emitToggleRead"></i>
                <i class="icon-large note-icon" @click="shareAsNote"></i>
                <i class="icon-large star-outline-icon" @click="emitStar"></i>
            </div>

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

        shareAsNote() {
            console.log('note share');
            const shareStr = JSON.stringify(this.email)
            this.$router.push(`/keep:${shareStr}`)
        },
    },

    computed: {
        envelopeIcon() {
            return this.email.isRead ? {'envelope-icon': true} : {'envelope-open-icon': true}
        },
        sentAt(){
            const ts = new Date(this.email.sentAt)
            const dd = ts.getDate()
            const mm = ts.getMonth()
            const yyyy = ts.getFullYear()

            return `${dd} - ${mm} - ${yyyy}`
        },
    },

    created() {
    },

    destroyed() {
    }
}