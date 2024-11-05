import template from  "./blog-category-list.html.twig"

import "./../../../../module/gdn_blog.scss"

const { Component, Mixin } = Shopware;

const { Criteria } = Shopware.Data;

Component.register('blog-category-list', {
    
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
                { property: 'name', label: 'Title',routerLink: 'blog.category.create', },
                { property: 'slug', label: 'Slug' },
                { property: 'meta_title', label: 'Meta Title' }
            ],
            entity:"gdn_blog_category",
            categoryId:null,
            confirmModal:false
        };
    },
    methods: {
        loadItems() {

            const criteria = new Criteria(this.page, this.limit);
            criteria.addSorting(Criteria.sort(this.sortBy, this.sortDirection, this.naturalSorting));
            criteria.addAssociation('media');

            this.repository = this.repositoryFactory.create(this.entity);
            this.repository.search(criteria).then((result) => {
                this.items = result;
                this.total = result.total;
            })

        },
        onEditItem(item){
            const id = item.id;
            this.$router.push({ name: 'blog.category.create', params: {id}  });
        },
        onPageChange(newPage) {
            const {page,limit} = newPage;
            this.limit = limit;
            this.page = page;
            this.loadItems();
        },
        async onDeleteItem() {
            let itemId = this.categoryId
            if (!itemId) {
                this.createNotificationError({
                    title: "Error",
                    message: "Item ID is undefined or null."
                });
                return;
            }
    
            try {
                const repository = this.repositoryFactory.create(this.entity);
                if (!repository) {
                    this.createNotificationError({
                        title: "Error",
                        message: "Repository for 'blog_author' could not be created."
                    });
                    return;
                }
    
                // Attempt to delete the item
                await repository.delete(itemId, Shopware.Context.api);
    
                this.confirmModal = false;
                // Notify success
                this.createNotificationSuccess({
                    title: "Success",
                    message: "Item deleted successfully."
                });
    
                // Refresh the list after deletion
                this.loadItems();
            } catch (error) {
    
                // Display error notification
                this.createNotificationError({
                    title: "Error",
                    message: "Something went wrong, Please try again later."
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
