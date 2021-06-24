import { router } from './routes.js';
import homePage from './pages/home-page.js';
import appHeader from './cmps/app-header.js';
import appFooter from './cmps/app-footer.js';
import userMsg from './cmps/user-msg.js';

const options = {
    el: '#app',
    router,
    template: `
        <section class="appsus-wrapper">
            <user-msg />
            <div class="main-layout">
                <app-header></app-header>
                <router-view />
                <app-footer></app-footer>
            </div>
        </section>
        `,
    components: {
        homePage,
        appHeader,
        appFooter,
        userMsg,
    },
};

const app = new Vue(options);
