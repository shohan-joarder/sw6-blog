import template from  "./blog-post-list.html.twig"

const { Component, Mixin } = Shopware;

const { Criteria } = Shopware.Data;

Component.register('blog-post-list', {
    
    template,

    mixins: [
        Mixin.getByName('notification')
    ],

    inject: ['repositoryFactory'],
    data() {
        return {
            items: [],
            total: 0,
            limit: 10,
            page: 1,
            sortBy: 'createdAt',
            sortDirection: 'DESC',
            naturalSorting: false,
            columns: [
                { property: 'name', label: 'Title' },
                { property: 'description', label: 'Description' },
                { property: 'active', label: 'Status' }
            ],
            repository:"gdn_blog_post"
        };
    },
    created() {
        this.loadItems();
    },
    methods: {
        loadItems() {

            const criteria = new Criteria(this.page, this.limit);
            criteria.addSorting(Criteria.sort(this.sortBy, this.sortDirection, this.naturalSorting));
            criteria.addAssociation('media');

            this.repository = this.repositoryFactory.create(this.repository);
            this.repository.search(criteria).then((result) => {
                console.log("post called")
                console.log(result);
                console.log("post called")
                this.items = result;
                this.total = result.total;
            })

        },
        onEditItem(item){
            const id = item.id;
            this.$router.push({ name: 'blog.post.create', params: {id}  });
        }
    }
})
