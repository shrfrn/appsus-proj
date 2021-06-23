import { emailService } from "../services/email-service.js"
import emailList from "../cmps/email-list.js"
import emailCompose from "../cmps/email-compose.js"

export default {
    template: `
        <section v-if="emails">
            <span>{{unReadCount}}</span>
            <button @click=compose()>Compose</button>
            <button @click=sortBySentAt()>Sort by date</button>
            <button @click=sortBySubject()>SortBySubject</button>
            <select v-model="filter" name="" id="">
                <option value="All">All</option>
                <option value="Read">Read</option>
                <option value="Unread">Unread</option>
            </select>
            <input v-model="searchStr" type="text" placeholder="search...">
            <email-list 
                v-if="isEmailList" 
                :emails="getEmails"
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
            filter: 'All',
            searchStr: '',
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
        
        onFullExpnad(ev){
            // expand
            this.fullExpand = true
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

        getEmails(){
            let filteredEmails = this.emails
            if(this.filter !== 'All')   {
                const showRead = (this.filter === 'Read')
                filteredEmails = this.emails.filter(email => email.isRead === showRead)
            }
            if(!this.searchStr) return filteredEmails
            let searchStr = this.searchStr.toLowerCase()
            return filteredEmails.filter (
                        email => email.subject.toLowerCase().includes(searchStr) || 
                        email.body.toLowerCase().includes(searchStr) ||
                        email.from.toLowerCase().includes(searchStr) ||
                        email.to.toLowerCase().includes(searchStr) ||
                        email.cc.toLowerCase().includes(searchStr) ||
                        email.bcc.toLowerCase().includes(searchStr)
                    )
        },

        unReadCount() {
            return this.emails.reduce((acc, email) => acc += (email.isRead) ? 1 : 0, 0)
        },

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
