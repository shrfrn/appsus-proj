import homePage from './pages/home-page.js';
import emailApp from './apps/email/pages/email-app.js';
import noteApp from './apps/keep/pages/note-app.js';

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
        component: noteApp,
    },
];

export const router = new VueRouter({ routes });
