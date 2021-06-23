// Component: email-compose

const options = 
{
    props: ['newEmail'],
    template: `
        <form>
            <input 
                id="email-subject" 
                type="text" 
                v-model="newEmail.subject" />
            <textarea 
                id="email-body" 
                id="email-body" 
                cols="30" 
                rows="10" 
                v-model="newEmail.body">
            </textarea>
        </form>
    `,
    data() {
        return {
            newEmail: {
                id: null,  
                subject: '',
                body: '',
                isRead: false,
                sentAt: null
            },
        }
    },

    methods: {
    },

    computed: {
    },

    created() {
    },

    destroyed() {
    }
}
Vue.component('component-name', options)