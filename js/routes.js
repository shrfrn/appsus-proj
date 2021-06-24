import homePage from './pages/home-page.js';
import emailApp from './apps/email/pages/email-app.js';
import keepApp from './apps/keep/pages/keep-app.js';

const routes = [
    {
        path: '/',
        component: homePage,
    },
    {
        path: '/email',
        component: emailApp,
    },
    {
        path: '/keep',
        component: keepApp,
    },
    {
        path: '/keep/:mail?',
        component: keepApp,
    },
];

export const router = new VueRouter({ routes });
