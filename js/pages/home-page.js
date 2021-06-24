export default {
    template: `
        <section class="main-homepage">
            <div class="main-container">
                <div class="homepage-texts">
                    <h1>Welocome to our awesome app</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                </div>
                <div class="homepage-links">
                    <div class="link link-mail">
                        <router-link to="/email" class="link-container">
                            <img src="img/mail.svg" alt="mail">
                            
                        </router-link>
                    </div>
                    <div class="link link-home">
                            <img src="img/home.svg" alt="home">
                    </div>
                    <div class="link link-keep">
                        <router-link to="/keep" class="link-container">
                            <img src="img/notes.svg" alt="notes">
                            
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
        `,
};
