import { router } from './routes.js';
import homePage from './pages/home-page.js';
import appHeader from './cmps/app-header.js';
import appFooter from './cmps/app-footer.js';

const options = {
    el: '#app',
    router,
    template: `
        <section class="appsus-wrapper">
            <app-header></app-header>
            <router-view />
            <app-footer></app-footer>
        </section>
        `,
    components: {
        homePage,
        appHeader,
        appFooter,
    },
};

const app = new Vue(options);
