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
            
            // Ensure `repository` and `criteria` are defined before using them.
            const repository = Shopware.Service('repositoryFactory').create('gdn_blog_post');
            const criteria = new Shopware.Data.Criteria();
            criteria.addAssociation('postAuthor');
            // Add filter to fetch only active blogs
            criteria.addFilter(Criteria.equals('active', true));
            // Adjust criteria settings as needed to limit or filter the latest blogs
            criteria.addSorting(Criteria.sort('publishedAt', 'DESC'));

            // Set a limit on the number of results (e.g., limit to 10)
            criteria.setLimit(3);

            repository.search(criteria, Shopware.Context.api).then((result) => {
                // console.log(result);

                result.map(item=>{
                    const blog = {
                        id:item.id,
                        title:item.title,
                        slug:item.slug,
                        author:item.postAuthor.name,
                        media:{
                            url:item.media? item.media.url:null
                        }
                    }

                    this.items.push(blog)
                });
                // this.items = result;
            }).catch((error) => {
                console.error('Error fetching latest blogs:', error);
            });
        }
    }
});
