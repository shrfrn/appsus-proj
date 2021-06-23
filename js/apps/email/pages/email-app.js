import { emailService } from "../services/email-service.js"
import emailList from "../cmps/email-list.js"
import emailCompose from "../cmps/email-compose.js"

export default {
    template: `
        <section v-if="emails">
            <button @click=compose()>Compose</button>
            <email-list 
                v-if="isEmailList" 
                :emails="emails"
                @delete="onEmailDeleted"
                @toggle-read="onToggleRead"
                @reply="onReply"/>
            <email-compose 
                v-if="isEmailCompose" 
                :repliedEmail="repliedEmail"
                @email-sent="onEmailSent"
                @email-canceled="onEmailCanceled"/>
        </section>
        `,
    data() {
        return {
            emails: null,
            repliedEmail: null,
            pageState: 'email-list',
        }
    },
    methods: {
        compose() {
            this.pageState = 'email-compose'
            console.log('composing...')
        },
        loadEmails() {
            emailService.query().
                then(emails => this.emails = emails)
        },

        onEmailSent(newEmail){
            emailService.save(newEmail)
            .then(() => {
                this.loadEmails()
                this.pageState = 'email-list'
            })
        },

        onEmailCanceled() {
            this.pageState = 'email-list'
        },
        onEmailDeleted(emailId) {
            console.log('deleteing', emailId);
        },
        onToggleRead(emailId) {
            console.log('toggle', emailId);
        },
        onReply(emailId) {
            console.log('reply', emailId);
            this.repliedEmail = emailService.getById(emailId)
            console.log('reply', this.repliedEmail);
            this.pageState = 'email-compose'
        },
    },
    computed: {
        isEmailList(){
            return (this.pageState === 'email-list') ? true: false
        },
        isEmailCompose(){
            return (this.pageState === 'email-compose') ? true: false
        },
    },
    created() {
        this.loadEmails()
        // emailService.query()
        //     .then(emails => this.emails = emails)
    },
    components: {
        emailList,
        emailCompose,
    }
};
