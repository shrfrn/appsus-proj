import { emailService } from "../services/email-service.js"
import emailList from "../cmps/email-list.js"
import emailCompose from "../cmps/email-compose.js"

export default {
    template: `
        <section v-if="emails">
            <button @click=compose()>Compose</button>
            <button @click=sortBySentAt()>Sort by date</button>
            <button @click=sortBySubject()>SortBySubject</button>
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
            sortBy: 'timestamp',
            sortDir: 1,
        }
    },
    methods: {

        compose() {
            this.pageState = 'email-compose'
        },

        loadEmails() {
            emailService.query()
            .then(emails => {
                this.emails = emails
                this.sortBy = 'timestamp',
                this.sortDir = 1,
                this.sortBySentAt() 
            })

        },

        sortBySentAt() {
            if(this.sortBy === 'timestamp') this.sortDir *= -1
            else this.sortDir = 1

            this.emails.sort((email1, email2) => this.sortDir * (email1.sentAt - email2.sentAt))        
            this.sortBy = 'timestamp'
        },
        
        sortBySubject() {
            if(this.sortBy === 'subject') this.sortDir *= -1
            else this.sortDir = 1

            this.emails.sort((email1, email2) => this.sortDir * (email1.subject.localeCompare(email2.subject)))        
            this.sortBy = 'subject'
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
            emailService.remove(emailId)
            .then(() => {
                this.loadEmails()
                this.pageState = 'email-list'
            })
        },

        onToggleRead(email) {
            console.log('toggle');
            email.isRead = !email.isRead
            emailService.save(email)
            .then(() => {
                this.loadEmails()
                this.pageState = 'email-list'
            })
        },

        onReply(emailId) {
            emailService.getById(emailId)
            .then(email => {
                this.repliedEmail = email
                this.pageState = 'email-compose'
            })
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
    },

    components: {
        emailList,
        emailCompose,
    }
};
