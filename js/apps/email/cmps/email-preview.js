// Component: email-preview

export default
{
    props: ['email'],
    
    template: `
        <div class="email-preview">
            <p class="email-preview-from">{{email.from}}</p>
            <p class="email-preview-subject">{{email.subject}}
                <span class="email-preview-body">{{email.body}}</span>
            </p>
            <div class="actions">
                <button @click="deleteEmail">x</button>
                <button @click="toggleRead">R</button>
                <button @click="reply">↻</button>
            </div>
            <p class="email-preview-sent-at">{{sentAt}}</p>
        </div>
    `,

    data() {
        return {
        }
    },

    methods: {
        deleteEmail() {
            this.$emit('delete', this.email.id)
        },
        toggleRead() {
            this.$emit('toggle-read', this.email.id)
        },
        reply() {
            this.$emit('reply', this.email.id)
        },
    },

    computed: {
        sentAt(){
            const ts = new Date(this.email.sentAt)
            const dd = ts.getDate()
            const mm = ts.getMonth()
            const yyyy = ts.getFullYear()

            return `${dd} - ${mm} - ${yyyy}`
        }
    },

    created() {
    },

    destroyed() {
    }
}