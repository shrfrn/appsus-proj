import { emailService } from '../services/email-service.js';
import emailList from '../cmps/email-list.js';
import emailCompose from '../cmps/email-compose.js';
import emailDetails from '../cmps/email-details.js';
import { eventBus } from '../../../services/event-bus-service.js';
import { showMsg } from '../../../services/event-bus-service.js';

export default {
    template: `
        <section class="email-container" v-if="emails">
            <section class="email-tool-bar">
                <div class="nav-icons">
                    <div class="inbox-btn">
                        <i class="icon-large inbox-icon" @click.stop="showInbox()"></i>
                        <span>{{unReadCount}}</span>
                    </div>
                    <i class="icon-large compose-icon" @click.stop="compose()"></i>
                </div>
                <input v-model="searchStr" type="text" placeholder=" search...">
                <select v-model="filter" name="" id="">
                    <option value="All">all</option>
                    <option value="Read">read</option>
                    <option value="Unread">unread</option>
                </select>
            </section>
            <section class="email-app-container">
                <email-list 
                    v-if="isEmailList" 
                    :emails="getEmails"
                    @sort="onSortList"
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
            sortBy: 'sentAt',
            sortDir: 1,
            filter: 'All',
            searchStr: '',
        };
    },
    methods: {
        showInbox() {
            this.pageState = 'email-list';
        },

        compose() {
            this.pageState = 'email-compose';
        },

        loadEmails() {
            emailService.query().then((emails) => {
                this.emails = emails;
            });
        },
        
        onSortList(ev){
            this.emails.sort(
                (email1, email2) => ev.sortDir * String(email1[ev.sortBy]).localeCompare(String(email2[ev.sortBy]))
            );
            
        },

        onShowEmailDetails(ev) {
            this.pageState = 'email-details'
            this.currEmail = ev
            this.currEmail.isRead = true
        },

        onEmailSent(newEmail) {
            console.log('sent', newEmail);
            emailService.save(newEmail).then(() => {
                this.loadEmails();
                showMsg({text: 'Message sent.', type: 'success'})
                this.pageState = 'email-list';
            });
        },
        
        onEmailCanceled() {
            this.pageState = 'email-list';
        },
        
        onEmailDeleted(emailId) {
            emailService.remove(emailId).then(() => {
                this.loadEmails();
                showMsg({text: 'Message deleted.', type: 'success'})
                this.pageState = 'email-list';
            });
        },

        onToggleRead(email) {
            console.log('toggle');
            email.isRead = !email.isRead;
            console.log(email);
            emailService.save(email).then(() => {
                this.loadEmails();
            });
        },

        onReply(repliedEmail) {
            this.repliedEmail = this.emails.find((email) => email.id === repliedEmail.id);
            console.log(repliedEmail);
            console.log(this.repliedEmail);
            this.pageState = 'email-compose';
        },

        onCloseEmailDetails() {
            this.pageState = 'email-list';
        },
    },
    mounted() {
        eventBus.$on('shareNote', (data) => {
            console.log('data :>> ', data);
            this.repliedEmail = {}
            this.repliedEmail.subject = 'New note'
            this.repliedEmail.body = 'data.info.txt'
            this.compose()
            console.log(this.pageState)
        });
    },
    computed: {
        getEmails() {
            let filteredEmails = this.emails;
            if (this.filter !== 'All') {
                const showRead = this.filter === 'Read';
                filteredEmails = this.emails.filter((email) => email.isRead === showRead);
            }
            if (!this.searchStr) return filteredEmails;
            let searchStr = this.searchStr.toLowerCase();
            return filteredEmails.filter(
                (email) =>
                    email.subject.toLowerCase().includes(searchStr) ||
                    email.body.toLowerCase().includes(searchStr) ||
                    email.from.toLowerCase().includes(searchStr) ||
                    email.to.toLowerCase().includes(searchStr) ||
                    email.cc.toLowerCase().includes(searchStr) ||
                    email.bcc.toLowerCase().includes(searchStr)
            );
        },

        unReadCount() {
            return this.emails.reduce((acc, email) => (acc += !email.isRead ? 1 : 0), 0);
        },

        isEmailList() {
            return this.pageState === 'email-list' ? true : false;
        },

        isEmailCompose() {
            return this.pageState === 'email-compose' ? true : false;
        },

        isEmailDetails() {
            return this.pageState === 'email-details' ? true : false;
        },
    },

    created() {
        // eventBus.$on('shareNote', (data) => {
        //     console.log('data :>> ', data);
        //     this.repliedEmail = {}
        //     this.repliedEmail.subject = 'New note'
        //     this.repliedEmail.body = 'data.info.txt'
        //     this.$route.pageState = 'email-compose'
        //     this.compose()
        //     // console.log('this.$route.pageState', this.$route.pageState);
        //     console.log(this.pageState)
        // });
        this.loadEmails()
    },

    components: {
        emailList,
        emailCompose,
        emailDetails,
    },
};
