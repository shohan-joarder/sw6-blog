import template from  "./blog-post-list.html.twig"

import deDE from './../../../../snippet/de-DE.json';
import enGB from './../../../../snippet/en-GB.json';

import "./../../../../module/gdn_blog.scss"

const { Component, Mixin } = Shopware;

const { Criteria } = Shopware.Data;

Component.register('blog-post-list', {
    
    template,

    mixins: [
        Mixin.getByName('notification')
    ],
    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },
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
                { property: 'title', label: 'Title', width: '200px' },
                { property: 'slug', label: 'Slug', width: '150px' },
                { property: 'postAuthor.name', label: 'Author', width: '100px' },
                // { property: 'shortDescription', label: 'Short Description', width: '300px' },
                { property: 'meta_title', label: 'Meta Title', width: '150px' },
            ],
            entity:"gdn_blog_post"
        };
    },
    methods: {
        loadItems() {

            const criteria = new Criteria(this.page, this.limit);
            criteria.addSorting(Criteria.sort(this.sortBy, this.sortDirection, this.naturalSorting));
            criteria.addAssociation('postAuthor');

            this.repository = this.repositoryFactory.create(this.entity);
            this.repository.search(criteria).then((result) => {
                this.items = result;
                this.total = result.total;
            })

        },
        onEditItem(item){
            console.log(item);
            const id = item.id;
            this.$router.push({ name: 'blog.post.create', params: {id}  });
        },

        onPageChange(newPage) {
            const {page,limit} = newPage;
            this.limit = limit;
            this.page = page;
            this.loadItems();
        },
        async onDeleteItem(item) {
            let itemId = item.id
            if (!itemId) {
                return;
            }
    
            try {
                const repository = this.repositoryFactory.create(this.entity);
                if (!repository) {
                    return;
                }
    
                // Attempt to delete the item
                await repository.delete(itemId, Shopware.Context.api);
    
                // Notify success
                this.createNotificationSuccess({
                    title: "Success",
                    message: "Blog deleted successfully"
                });
    
                // Refresh the list after deletion
                this.loadItems();
            } catch (error) {
                // Enhanced error logging
                // console.error("Error deleting item:", error.message || error);
    
                // Display error notification
                this.createNotificationError({
                    title: "Errir",
                    message: "Something went wrong, please try again later"
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
