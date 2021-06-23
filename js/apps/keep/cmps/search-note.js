export default {
    template: `
    <section class="note-filter">
    <input @input="filter" v-model="filterBy.title" type="search" placeholder="Search..." />
    </section>
    `,

    data() {
        return {
            filterBy: {
                title: '',
            },
        };
    },

    methods: {
        filter() {
            this.$emit('filtered', this.filterBy);
        },
    },
};
