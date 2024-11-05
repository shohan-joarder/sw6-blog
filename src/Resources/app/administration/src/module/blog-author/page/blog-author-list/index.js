import template from  "./blog-author-list.html.twig"
import "./../../../../module/gdn_blog.scss"

const { Component, Mixin } = Shopware;

const { Criteria } = Shopware.Data;

Component.register('blog-author-list', {
    
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
                { property: 'name', label: 'Title',routerLink: 'blog.author.create', },
                { property: 'description', label: 'Description' }
            ],
            entity:"gdn_blog_author",
            itemId:null,
            confirmModal:false
        };
    },
    methods: {
        loadItems() {

            const criteria = new Criteria(this.page, this.limit);
            criteria.addSorting(Criteria.sort(this.sortBy, this.sortDirection, this.naturalSorting));
            
            this.repository = this.repositoryFactory.create(this.entity);
            this.repository.search(criteria).then((result) => {
                this.items = result;
                this.total = result.total;
            })

        },
        onEditItem(item){
            const id = item.id;
            this.$router.push({ name: 'blog.author.create', params: {id}  });
        },
        onPageChange(newPage) {
            const {page,limit} = newPage;
            this.limit = limit;
            this.page = page;
            this.loadItems();
        },
        async onDeleteItem() {
            let itemId = this.itemId
            if (!itemId) {
                console.error("Item ID is undefined or null.");
                return;
            }
    
            try {
                const repository = this.repositoryFactory.create(this.entity);
                if (!repository) {
                    console.error("Repository for 'blog_post' could not be created.");
                    return;
                }
    
                // Attempt to delete the item
                await repository.delete(itemId, Shopware.Context.api);
                this.confirmModal = false;
                // Notify success
                this.createNotificationSuccess({
                    title: "Success",
                    message: "Item deleted successfully"
                });
    
                // Refresh the list after deletion
                this.loadItems();
            } catch (error) {
                // Enhanced error logging
                console.error("Error deleting item:", error.message || error);
    
                // Display error notification
                this.createNotificationError({
                    title: "Error",
                    message: "Something went wrong, Please try again later"
                });
            }
        }
    },
    created() {
        this.loadItems();
    },
    itemRepository() {
        return this.repositoryFactory.create(this.entity);
    }
})
