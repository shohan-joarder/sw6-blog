import template from  "./blog-category-create.html.twig"


const { Component, Mixin } = Shopware;

const { Criteria } = Shopware.Data;

Component.register('blog-category-create', {
    
    template,

    mixins: [
        Mixin.getByName('notification'),
        Mixin.getByName('placeholder')
    ],

    inject: ['repositoryFactory','acl'],

    data() {
        return {
            item: {
                id: null,
                name: '',
                slug: '',
                description: '',
                short_description: '',
                active: false,
                mediaId:null,
                meta_title:"",
                meta_description:"",
                meta_keywords:"",
            },
            errors:{
                name:null,
                slug:null,
                short_description:null
            },
            toastTitle:"",
            toastMessage:"",
            repository:"gdn_blog_category",
            loading:false
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

            const isValid = await this.validateRequiredFields();
            if (!isValid) {
                this.loading = false;
                return; // Exit if validation fails
            }

            this.loading = true;

            const isUniqueSlug = await this.validateUniqueSlug();

            if (!isUniqueSlug) {
                this.createNotificationError({
                    title: "Duplicate Slug",
                    message: "The slug you entered already exists. Please choose a unique slug.",
                });
                return;
            }
            // Update the item using repository
            await this.updateItem();
        },
        async updateItem() {

            const repository = this.itemRepository;
            const isUpdating = !!this.item.id;
            const itemToSave = isUpdating ? await repository.get(this.item.id) : repository.create();
        
            // Set properties on the item
            itemToSave.name = this.item.name;
            itemToSave.slug = this.item.slug;
            itemToSave.short_description = this.item.short_description;
            itemToSave.description = this.item.description;
            itemToSave.active = this.item.active;
            itemToSave.meta_title = this.item.meta_title;
            itemToSave.meta_description = this.item.meta_description;
            itemToSave.meta_keywords = this.item.meta_keywords;
            itemToSave.mediaId = this.item.mediaId;
        
            try {
                // Save the item; will update if ID exists, otherwise create new
                await repository.save(itemToSave, Shopware.Context.api);
        
                // Display success notification
                this.createNotificationSuccess({
                    title: "Success",
                    message: isUpdating ? "Category updated successfully" : "Category added successfully",
                });
        
                // Redirect to category list
                this.$router.push({ name: 'blog.category.list' });
        
            } catch (error) {
                // Display error notification
                this.createNotificationError({
                    title: "Error",
                    message: isUpdating 
                        ? "Error updating category, please try again later" 
                        : "Error creating category, please try again later",
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

            if (!this.item.slug) {
                this.errors.slug = "Slug is required";
                isValid = false;
            } else {
                this.errors.slug = null;
            }

            if (!this.item.short_description) {
                this.errors.short_description = "Short description is required";
                isValid = false;
            } else {
                this.errors.short_description = null;
            }

            return isValid;
        },
        async validateUniqueSlug() {
            const criteria = new Shopware.Data.Criteria();
            criteria.addFilter(Shopware.Data.Criteria.equals('slug', this.item.slug));
        
            // Exclude the current item if it's an update operation
            if (this.item.id) {
                // Correct the syntax for excluding the current item by id
                criteria.addFilter(
                    Shopware.Data.Criteria.not('AND', [
                        Shopware.Data.Criteria.equals('id', this.item.id)
                    ])
                );
            }
        
            const repository = this.itemRepository;

            const result = await repository.search(criteria, Shopware.Context.api);
        
            if (result.total > 0) {
                // Set an error if a duplicate slug is found
                this.errors.slug = "The slug you entered already exists";
            } else {
                this.errors.slug = null; // Clear the error if no duplicate is found
            }
        
            this.loading = false;
        
            return result.total === 0; // Return true if no duplicates are found
        }
    },
    computed: {

        itemRepository() {
            return this.repositoryFactory.create(this.repository);
        },

        cardTitle() {
            return this.item.id ? 'Update Category' : 'New Category';
        }
    },
    mounted() {

        const itemId = this.$route.params.id

        if(itemId){
            
            this.item.id = itemId;

            this.loadItem();

        }
    }

});