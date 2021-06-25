import emailPreview from "./email-preview.js"

// Component: email-list

export default 
{
    props: ['emails'],
    template: `
        <section class="email-list">
            <header class="basic-preview">
                <p class="sort-btn" @click="sortList('from')" :class="sortField('from')">from</p>
                <p class="sort-btn" @click="sortList('subject')" :class="sortField('subject')">subject</p>
                <p class="sort-btn" @click="sortList('body')" :class="sortField('body')">message</p>
                <p></p>
                <p class="sort-btn" @click="sortList('sentAt')" :class="sortField('sentAt')">sent</p>
            </header>
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
            sortBy: 'sent',
            sortDir: -1,
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
        sortList(sortBy){
            if(sortBy === this.sortBy)  this.sortDir *= -1
            else this.sortDir = -1
            this.sortBy = sortBy

            this.$emit('sort', {sortBy, sortDir: this.sortDir})
        },
        sortField(fieldName){
            if(this.sortDir === -1) return (this.sortBy === fieldName) ? 'sort-field-des' : ''
            else                    return (this.sortBy === fieldName) ? 'sort-field-asc' : ''
        },
    },

    computed: {
    },

    created() {
        this.sortBy = 'sentAt'
        this.sortDir = -1
        this.sortList('sentAt')
    },

    destroyed() {
    },
    components: {
        emailPreview,
    }
}