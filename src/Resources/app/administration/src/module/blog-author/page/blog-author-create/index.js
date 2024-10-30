import template from  "./blog-author-create.html.twig"

import deDE from './../../../../snippet/de-DE.json';
import enGB from './../../../../snippet/en-GB.json';

const { Component, Mixin } = Shopware;

const { Criteria } = Shopware.Data;

Component.register('blog-author-create', {
    
    template,

    mixins: [
        Mixin.getByName('notification'),
        Mixin.getByName('placeholder')
    ],
    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },
    inject: ['repositoryFactory','acl'],

    data() {
        return {
            item: {
                id: null,
                name: '',
                description: '',
                active: false,
                mediaId:null
            },
            errors:{
                name:null
            },
            toastTitle:"",
            toastMessage:"",
            repository:"gdn_blog_author",
            loading:false,

        };
    },
    methods: {
        async loadItem() {

            // Retrieve the item using the repository and Criteria
            const itemId = this.item.id;
            const criteria = new Criteria();
            criteria.setIds([itemId]);

            const repository = this.itemRepository;
            
            repository.search(criteria).then((result) => {
                this.item = result[0];
            });

        },
        async onSave() {
            this.loading = true;
            const isValid = await this.validateRequiredFields();
            if (!isValid) {
                this.loading = false;
                return; // Exit if validation fails
            }
            // Update the item using repository
            await this.updateItem();
        },
        async updateItem() {
            const repository = this.itemRepository;
            const isUpdating = !!this.item.id;
            const itemToSave = isUpdating ? await repository.get(this.item.id) : repository.create();
        
            // Set item properties
            itemToSave.name = this.item.name;
            itemToSave.description = this.item.description;
            itemToSave.active = this.item.active;
            itemToSave.mediaId = this.item.mediaId;
        
            try {
                // Attempt to save the item
                const result = await repository.save(itemToSave, Shopware.Context.api);
        
                // Show success notification and redirect
                this.createNotificationSuccess({
                    title: "Success",
                    message: isUpdating ? "Author updated successfully" : "Author created successfully",
                });
        
                // Redirect to list page after success notification
                this.$router.push({ name: 'blog.author.list' });
        
            } catch (error) {
        
                // Show error notification if an error occurs
                this.createNotificationError({
                    title: "Error",
                    message: "Error creating or updating author, please try again later",
                });
            } finally {
                this.loading = false;
            }
        },
        async validateRequiredFields() {
            let isValid = true;

            // Check if each required field is not empty
            if (!this.item.name) {
                this.errors.name = "Name is required";
                isValid = false;
            } else {
                this.errors.name = null;
            }

            return isValid;
        },
        checkIfId(){
            const itemId = this.$route.params.id

            if(itemId){
                
                this.item.id = itemId;
    
                this.loadItem();
    
            }
        }
    },
    computed: {

        itemRepository() {
            return this.repositoryFactory.create(this.repository);
        },

        cardTitle() {
            return this.item.id ? 'Update Author' : 'New Author';
        }
    },
    mounted() {

       this.checkIfId();

    }
});