// Component: email-preview

export default
{
    props: ['email'],
    
    template: `
        <div @click="expandPreview" class="email-preview">
            <div class="basic-preview">
                <p class="basic-preview-from">{{email.from}}{{email.isRead}}</p>
                <p class="basic-preview-subject">{{getSubject(40)}}
                    <span class="basic-preview-body">{{getBody(60)}}</span>
                </p>
                <div class="actions">
                    <button @click.stop="deleteEmail">x</button>
                    <button @click.stop="toggleRead">R</button>
                    <button @click.stop="reply">↻</button>
                    <img src="/downloads/trash.svg" alt="">
                </div>
                <p class="basic-preview-sent-at">{{sentAt}}</p>
            </div>
            <div v-if="isExpandedPreview" class="expanded-preview">
                <p class="basic-preview-subject">{{email.subject}}
                <p>{{getBody(130)}}</p>
                <button @click="showEmailDetails">FullExpand</button>
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

        showEmailDetails() {
            this.$emit('email-details', this.email)
        },

        deleteEmail() {
            this.$emit('delete', this.email.id)
        },

        toggleRead() {
            this.$emit('toggle-read', this.email)
        },

        reply() {
            this.$emit('reply', this.email)
        },
        getBody(len){
            return this.email.body.substr(0, len) + '...'
        },
        getSubject(len){
            return this.email.subject.substr(0, len) + '...'
        },
    },

    computed: {
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