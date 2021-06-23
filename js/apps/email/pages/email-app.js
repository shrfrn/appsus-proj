import { emailService } from "../services/email-service.js";
import emailList from "../cmps/email-list.js";

export default {
    template: `
        <section v-if="emails">
            <button @click=compose()>Compose</button>
            <email-list :emails="emails"/>
        </section>
        `,
    data() {
        return {
            emails: null,
        }
    },
    methods: {
        compose() {
            console.log('composing...')
        }
    },
    created() {
        emailService.query()
            .then(emails => this.emails = emails)
    },
    components: {
        emailList,
    }
};
