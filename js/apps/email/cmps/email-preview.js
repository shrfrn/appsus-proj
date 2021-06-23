// Component: email-preview

export default
{
    props: ['email'],
    
    template: `
        <div class="email-preview">
            <p>{{email.subject}}</p>
            <p class="email-body">{{email.body}}</p>
        </div>
    `,

    data() {
        return {
        }
    },

    methods: {
    },

    computed: {
    },

    created() {
        console.log(this.email);
    },

    destroyed() {
    }
}