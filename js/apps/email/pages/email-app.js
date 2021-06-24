import { emailService } from "../services/email-service.js"
import emailList from "../cmps/email-list.js"
import emailCompose from "../cmps/email-compose.js"
import emailDetails from "../cmps/email-details.js";

export default {
    template: `
        <section class="email-container" v-if="emails">
            <section class="email-tool-bar">
                <input v-model="searchStr" type="text" placeholder=" search...">
                <select v-model="filter" name="" id="">
                    <option value="All">all</option>
                    <option value="Read">read</option>
                    <option value="Unread">unread</option>
                </select>
            </section>
            <section class="email-app-container">
                <nav class="mail-navbar">
                    <button @click=showInbox()>inbox<span id="unread-badge">{{unReadCount}}</span></button>
                    <button @click=compose() id="compose">Compose</button>
                    <button @click=sortBySentAt()>Sort by date</button>
                    <button @click=sortBySubject()>SortBySubject</button>
                </nav>
                <email-list 
                    v-if="isEmailList" 
                    :emails="getEmails"
                    @email-details="onShowEmailDetails"
                    @delete="onEmailDeleted"
                    @toggle-read="onToggleRead"
                    @reply="onReply"/>
                <email-compose 
                    v-if="isEmailCompose" 
                    :repliedEmail="repliedEmail"
                    @email-sent="onEmailSent"
                    @email-canceled="onEmailCanceled"/>
                <email-details
                    v-if="isEmailDetails"
                    :email="currEmail"
                    @close-email-details="onCloseEmailDetails"
                    @delete="onEmailDeleted"
                    @toggle-read="onToggleRead"
                    @reply="onReply"/>
            </section>
        </section>
    `,
    data() {
        return {
            emails: null,
            repliedEmail: null,
            currEmail: null,
            pageState: 'email-list',
            sortBy: 'timestamp',
            sortDir: 1,
            filter: 'All',
            searchStr: '',
        }
    },
    methods: {

        showInbox() {
            this.pageState = 'email-list'
        },

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
        
        onShowEmailDetails(ev){
            this.pageState = 'email-details'
            this.currEmail = ev
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
            console.log(email);
            emailService.save(email)
            .then(() => {
                this.loadEmails()
                this.pageState = 'email-list'
            })
        },

        onReply(repliedEmail) {

            this.repliedEmail = this.emails.find(email => email.id === repliedEmail.id)
            console.log(repliedEmail);
            console.log(this.repliedEmail);
            this.pageState = 'email-compose'

            // emailService.getById(emailId)
            // .then(email => {
            //     this.repliedEmail = email
            //     this.pageState = 'email-compose'
            // })
        },

        onCloseEmailDetails(){
            this.pageState = 'email-list'
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

        isEmailDetails(){
            return (this.pageState === 'email-details') ? true: false
        },
    },

    created() {
        this.loadEmails()
    },

    components: {
        emailList,
        emailCompose,
        emailDetails,
    }
};
