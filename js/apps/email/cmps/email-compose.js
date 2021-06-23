import { emailService } from "../services/email-service.js"

// Component: email-compose

export default {
    props: ['repliedEmail'],
    template: `
        <form class="email-compose">
            <input 
                id="email-subject" 
                type="text" 
                v-model="newEmail.subject" />
            <input 
                id="email-to" 
                type="text" 
                v-model="newEmail.to" />
            <input 
                id="email-cc" 
                type="text" 
                v-model="newEmail.cc" />
            <input 
                id="email-bcc" 
                type="text" 
                v-model="newEmail.bcc" />
            <textarea 
                id="email-body" 
                cols="30" 
                rows="10" 
                v-model="newEmail.body">
            </textarea>
            <button @click="send">Send</button>
            <button @click.prevent="cancel">Cancel</button>
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
            console.log('replying', repliedEmail);
            this.newMail.to = this.repliedEmail.to
            this.newMail.cc = this.repliedEmail.cc
            this.newMail.bcc = this.repliedEmail.bcc
            this.newMail.body = this.repliedEmail.body
            this.newMail.to = this.repliedEmail.from
        } 
    },

    destroyed() {
    },
    components: {
        emailService,
    },
}