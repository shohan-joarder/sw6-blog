import template from  "./blog-post-create.html.twig"

import "./../../../component/quill-editor"

import "./blog-post-create.scss"

import deDE from './../../../../snippet/de-DE.json';
import enGB from './../../../../snippet/en-GB.json';

const { Component, Mixin,Context,Application } = Shopware;

const { Criteria } = Shopware.Data;

const httpClient = Application.getContainer('init').httpClient;

Component.register('blog-post-create', {
    
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
                title: '',
                slug: '',
                shortDescription: '',
                description: '',
                publishedAt:'',
                active: true,
                mediaId:null,
                authorId:null,
                categoryIds:[],
                meta_title:"",
                meta_description:"",
                meta_keywords:"",
                tags:[]
            },
            errors:{
                title:null,
                slug:null,
                short_description:null,
                categoryIds:null,
                authorId:null,
                publishedAt:null,
            },
            loading:false,
            createdId:null,
            entity:"gdn_blog_post",
            authors:[],
            categories:[],
            tags:[],
            showMediaModal: false,
        };
    },
    methods: {
        async loadItem() {
            this.loading = true;
            // Retrieve the item. using the repository and Criteria
            const itemId = this.item.id;
            const criteria = new Criteria();
            criteria.addAssociation('postCategories');

            criteria.setIds([itemId]);

            const repository = this.itemRepository;
            
            repository.search(criteria).then((result) => {
                this.item = result[0];
                if (Object.keys(result[0].tags).length == 0 ) {
                    this.item.tags = [];
                }
                
                // Extract category_ids from postCategories association
                this.item.categoryIds = this.item.postCategories.map(category => category.id);

                const revertReplacements = {
                    '[CLONE]': ':',
                    '[COMMA]': ',',
                    '[SEMICLONE]': ';'
                };

                let desc = result[0].description;
                
                desc = desc
                        .replace(/\[iframe\]/g, '<iframe') // Replace [iframe] with <iframe
                        .replace(/&gt;\[\/iframe\]/g, '></iframe>')// Replace [/iframe] with </iframe>
                        .replace(/\[CLONE\]/g, ':'); // Replace [CLONE] with :
            
                desc = desc
                        .replace(/%5BCLONE%5D/g,":")
                        .replace(/%5BSEMICLONE%5D/g,";")
                        .replace(/%5BCOMMA%5D/g,",");

                this.item.description =  desc;
                
            });
            this.loading = false;

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

            await this.updateItem();
        },
        async updateItem() {
            const repository = this.itemRepository;
            const isUpdating = !!this.item.id;
            const itemToSave = isUpdating ? await repository.get(this.item.id) : repository.create();
        
            const replacements = {
                ':': '[CLONE]',
                ',': '[COMMA]',
                ';': '[SEMICLONE]'
            };

            this.item.description = this.item.description
                                    .replace(/<iframe/g, '[iframe]')
                                    .replace(/<\/iframe>/g, '[/iframe]');

            // Set item properties
            itemToSave.title = this.item.title;
            itemToSave.slug = this.item.slug;
            itemToSave.shortDescription = this.item.shortDescription; 
            itemToSave.description =  this.item.description.replace(
                /src="([^"]*)"/g, // Matches the src="..." pattern
                (match, group) => {
                    const replacedValue = group.replace(/[:,;]/g, (innerMatch) => replacements[innerMatch]);
                    return `src="${replacedValue}"`; // Replace only the src content
                }
            );
            itemToSave.active = this.item.active;
            itemToSave.publishedAt = this.item.publishedAt;
            itemToSave.meta_title = this.item.meta_title;
            itemToSave.meta_description = this.item.meta_description;
            itemToSave.meta_keywords = this.item.meta_keywords;
            itemToSave.mediaId = this.item.mediaId;
            itemToSave.authorId = this.item.authorId;
            itemToSave.tags = this.item.tags;
        
            // Extract and assign tag names
            if (this.item.tags) {
                itemToSave.tags_name = this.tags
                    .filter(tag => this.item.tags.includes(tag.id))
                    .map(tag => tag.name);
            } else {
                itemToSave.tags_name = []; // Set to empty array if tags are undefined
            }
            
            // return
            try {
                if (isUpdating) {
                    // Update existing item
                    await repository.save(itemToSave, Shopware.Context.api);
                    this.createdId = this.item.id;
                    await this.manageCategoryBlog();
                } else {
                    // Create new item with predefined ID
                    const postId = Shopware.Utils.createId();
                    itemToSave.id = postId;
                    await repository.save(itemToSave, Shopware.Context.api);
                    this.createdId = postId;
                    await this.manageCategoryBlog();
                }
        
                // Display success notification
                this.createNotificationSuccess({
                    title: "Success",
                    message: isUpdating ? "Post updated successfully" : "Post added successfully",
                });

                // Navigate to post list on success
                this.$router.push({ name: 'blog.post.list' });
        
            } catch (error) {
                this.createNotificationError({
                    title: "Error",
                    message: isUpdating ? "Error updating post" : "Error creating post",
                });
            } finally {
                this.loading = false;
            }
        },
        checkIfId(){
            const itemId = this.$route.params.id

            if(itemId){
                
                this.item.id = itemId;
    
                this.loadItem();
    
            }
        },
        getAllAuthors() {
            
            const criteria = new Criteria(1, 500); 

            const authorRepository = this.repositoryFactory.create("gdn_blog_author");

            return authorRepository.search(criteria, Shopware.Context.api).then((authors) => {
                this.authors = authors
            }).catch((error) => {
                // console.error('Error fetching authors:', error);
            });
        },
        getAllTags() {
            
            const criteria = new Criteria(1, 500); 

            const tagRepository = this.repositoryFactory.create("tag");

            return tagRepository.search(criteria, Shopware.Context.api).then((tags) => {
                this.tags = tags
            }).catch((error) => {
                // console.error('Error fetching authors:', error);
            });
        },
        newTag(){
            this.$router.push({ name: 'sw.settings.tag.index'});
        },
        getAllCategories() {

            const criteria = new Criteria(1, 500); 

            const authorRepository = this.repositoryFactory.create("gdn_blog_category");

            return authorRepository.search(criteria, Shopware.Context.api).then((categories) => {
                this.categories = categories
            }).catch((error) => {
                // console.error('Error fetching categories:', error);
            });
        },
        async manageCategoryBlog(){
            
            const categories = this.item.categoryIds
            if (categories) {
                const itemId = this.item.id;
                if(itemId){
                    
                    // try {
                    //     const blogRepository = this.repositoryFactory.create("gdn_blog_post_gdn_blog_category");

                    //     const criteria = new Criteria();
                    //     criteria.addFilter(Criteria.equals('blogId', itemId));

                    //     // Fetch all items that match the criteria
                    //     const itemsToDelete = await blogRepository.search(criteria, Shopware.Context.api);

                    //     console.log(itemsToDelete);

                    //     if (itemsToDelete.total > 0) {
                    //         for (const BCitem of itemsToDelete) {

                    //             httpClient.get('/api/gdn-blog-post-gdn')
                    //                 .then((response) => {
                    //                     console.log('API Response:', response.data);
                    //                 })
                    //                 .catch((error) => {
                    //                     console.error('API Error:', error);
                    //                 });
                    //         }
                    //     }

                    // } catch (error) {
                    //     console.log("Bulk delete error "+ error);
                    // }

                }

                for (const category of categories) {
                    const categoryBlogRepository = this.repositoryFactory.create("gdn_blog_post_gdn_blog_category");
                    const newItem = categoryBlogRepository.create();
                    newItem.categoryId = category;
                    newItem.blogId = this.createdId;

                    categoryBlogRepository.save(newItem, Shopware.Context.api).then(() => {

                    }).catch(error => {
                        // console.error('Error creating Post category save:', error);
                    });
                }
            }
        },
        async validateRequiredFields() {
            let isValid = true;

            // Check if each required field is not empty
            if (!this.item.title) {
                this.errors.title = "Title is required";
                isValid = false;
            } else {
                this.errors.title = null;
            }

            if (!this.item.slug) {
                this.errors.slug = "Slug is required";
                isValid = false;
            } else {
                this.errors.slug = null;
            }

            if (!this.item.shortDescription) {
                this.errors.short_description = "Short description is required";
                isValid = false;
            } else {
                this.errors.short_description = null;
            }
          
            if (!this.item.authorId) {
                this.errors.authorId = "Author is required";
                isValid = false;
            } else {
                this.errors.slug = null;
            }

            if (!this.item.publishedAt) {
                this.errors.publishedAt = "Published date is required";
                isValid = false;
            } else {
                this.errors.publishedAt = null;
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
        },
        generateSlug() {
            const text = this.item.title;
            let slug= text
                .toString()
                .toLowerCase() // Convert to lowercase
                .trim() // Remove whitespace from both ends
                .normalize('NFD') // Handle special characters like accents
                .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
                .replace(/[^a-z0-9 ]/g, '') // Remove special characters
                .replace(/\s+/g, '-') // Replace spaces with hyphens

                this.item.slug = slug;
        },
       
        updateDescription(content) {
            this.item.description = content;
        },
    },
    watch: {
        'item.title': function(newName, oldName) {
            if (oldName && newName !== oldName) {
                this.generateSlug();
            }
        }
    },
    computed: {
        itemRepository() {
            return this.repositoryFactory.create(this.entity);
        },
        cardTitle() {
            return this.item.id ? 'Update Blog' : 'New Blog';
        },
    
    },
    mounted() {

        this.checkIfId();

        this.getAllAuthors();

        this.getAllCategories();

        this.getAllTags();
        
    }
});