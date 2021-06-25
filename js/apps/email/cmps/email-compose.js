import { emailService } from "../services/email-service.js"

// Component: email-compose

export default {
    props: ['repliedEmail'],
    template: `
        <form class="email-compose">
            <div class="input-field">
                <label for="email-to">To:</label>
                <input 
                    id="email-to" 
                    type="text" 
                    v-model="newEmail.to" />
            </div>
            <div class="input-field">
                <label for="email-cc">cc:</label>
                <input 
                    id="email-cc" 
                    type="text" 
                    v-model="newEmail.cc" />
            </div>
            <div class="input-field">
                <label for="email-bcc">bcc:</label>
                <input 
                    id="email-bcc" 
                    type="text" 
                    v-model="newEmail.bcc" />
            </div>
            <div class="input-field">
                <label for="email-subject">Subject:</label>
                <input 
                    id="email-subject" 
                    type="text" 
                    v-model="newEmail.subject" />
            </div>
            <div class="compose-msg-boby">
                <textarea 
                    id="email-body" 
                    cols="30" 
                    rows="10" 
                    placeholder="Type something interesting..."
                    v-model="newEmail.body">
                </textarea>
                <div class="actions">
                    <i class="icon-large delete-icon" @click.prevent="send"></i>
                    <i class="icon-large send-icon" @click.prevent="cancel"></i>
                </div>
            </div>
        </form>
    `,
    data() {
        return {
            newEmail: emailService.create(),
        }
    },

    methods: {
        send(){
            this.newEmail.sentAt = Date.now()
            this.newEmail.from = 'Sharon Frenkel'
            this.$emit('email-sent', this.newEmail)
        },

        cancel(){
            this.$emit('email-canceled')
        }
    },

    computed: {
    },

    created() {
        if(this.repliedEmail){
            this.newEmail.to = this.repliedEmail.from
            this.newEmail.cc = this.repliedEmail.cc
            this.newEmail.bcc = this.repliedEmail.bcc
            this.newEmail.subject = 'Re: ' + this.repliedEmail.subject
            this.newEmail.body = this.repliedEmail.body
        } 
    },

    destroyed() {
    },

    components: {
        emailService,
    },
}