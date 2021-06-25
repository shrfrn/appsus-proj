export default {
    template: `
<header class="app-header" >
  <div class="logo">
    <p>Appsus</p>
  </div>

  <div v-if="!isMobile" class="links">
    <router-link to="/">Home</router-link>
    <router-link to="/email">Email</router-link>
    <router-link to="/keep">Keep</router-link>
  </div>

  <div v-if="isMobile" class="burger-links">
    <button @click="toggleMenu" class="burger-icon"><i class="fas fa-bars fa-2x"></i></button>
    <div class="burger-list" v-if="isMenuOpen" :class="{ open: isMenuOpen }">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/email">Email</router-link></li>
        <li><router-link to="/keep">Keep</router-link></li>
      </ul>
    </div>
  </div>

  <div class="bgc-menu-mobile" v-if="isMenuOpen" @click="toggleMenu" :class="{ close: isMenuOpen }">

  </div>
</header>
`,
    data() {
        return {
            isMobile: false,
            isMenuOpen: false,
            windowWidth: window.innerWidth,
            txt: '',
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        onResize() {
            this.windowWidth = window.innerWidth;
        },
    },
    watch: {
        windowWidth() {
            if (this.windowWidth < 600) this.isMobile = !this.isMobile;
            else this.isMobile = !this.isMobile;
        },
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        });
    },
    created() {
        this.onResize();
    },
};
