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
