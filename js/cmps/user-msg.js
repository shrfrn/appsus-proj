import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
    <div v-if="msg" @click="hideMsg" class="user-msg" :class="msg.type">
        <i class="fas fa-check"></i>
        <div class="texts">
            <h3>{{msg.type}}</h3>
            <p>{{msg.text}}</p>
        </div>
    </div>
    `,

    data() {
        return {
            msg: null,
            timerHandle: null,
        };
    },

    created() {
        eventBus.$on('show-msg', this.showMsg);
    },
    destroyed() {
        eventBus.$off('show-msg', this.showMsg);
    },

    methods: {
        showMsg(msg) {
            this.msg = msg;
            this.timerHandle = setTimeout(() => {
                this.msg = null;
            }, 1500);
        },
        hideMsg(){
            clearTimeout(this.timerHandle)
            this.msg = null
        },
    },
};
