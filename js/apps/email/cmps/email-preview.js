// Component: email-preview

export default
{
    props: ['email'],
    
    template: `
        <div @click="expandPreview" class="email-preview">
            <div class="basic-preview">
                <p class="basic-preview-from">{{email.from}}{{email.isRead}}</p>
                <p class="basic-preview-subject">{{email.subject}}
                    <span class="basic-preview-body">{{email.body}}</span>
                </p>
                <div class="actions">
                    <button @click="deleteEmail">x</button>
                    <button @click="toggleRead">R</button>
                    <button @click="reply">↻</button>
                </div>
                <p class="basic-preview-sent-at">{{sentAt}}</p>
            </div>
            <div v-if="isExpandedPreview" class="expanded-preview">
                <h1>LaLaLa</h1>
                <p class="basic-preview-subject">{{email.subject}}
                <p>{{email.body}}</p>
                <button @click="fullExpand">FullExpand</button>
            </div>
        </div>
    `,

    data() {
        return {
            isExpandedPreview: false,
        }
    },

    methods: {
        expandPreview() {
            this.isExpandedPreview = !this.isExpandedPreview 
        },

        fullExpand() {
            this.$emit('full-expanad', this.email)
        },

        deleteEmail() {
            this.$emit('delete', this.email.id)
        },

        toggleRead() {
            this.$emit('toggle-read', this.email)
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