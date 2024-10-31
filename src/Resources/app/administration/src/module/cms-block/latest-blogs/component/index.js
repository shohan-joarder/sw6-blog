import template from './sw-cms-block-latest-blogs.html.twig';
import "./sw-cms-block-latest-blogs.scss"

const { Criteria } = Shopware.Data;

Shopware.Component.register('sw-cms-block-latest-blogs', {
    template,
    inject: ['repositoryFactory'],
    data() {
        return {
            items: []
        };
    },
    created() {
        this.getLatestBlogs();
    },
    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    },
    methods: {
        getLatestBlogs() {
            const criteria = new Criteria();
            criteria.setLimit(3); // Adjusted limit to 3 for the latest 5 blogs
            criteria.addSorting(Criteria.sort('publishedAt', 'DESC'));
            criteria.addAssociation('postAuthor');

            const repository = this.repositoryFactory.create('gdn_blog_post');
            repository.search(criteria, Shopware.Context.api).then((result) => {
                this.items = result;
            }).catch((error) => {
                console.error('Error fetching latest blogs:', error);
            });
        }
    }
});
