import template from  "./blog-post-create.html.twig"


const { Component, Mixin } = Shopware;

const { Criteria } = Shopware.Data;

Component.register('blog-post-create', {
    
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
                description: '',
                active: false,
                mediaId:null
            },
            repository:"gdn_blog_post"
        };
    },
    created() {
        // this.loadTask();
    },
    methods: {
        async loadItem() {
            // Retrieve the item. using the repository and Criteria
            const itemId = this.item.id;
            const criteria = new Criteria();
            criteria.setIds([itemId]);

            const repository = this.itemRepository();
            
            repository.search(criteria).then((result) => {
                console.log(result);
                this.item = result[0];
            });
        },
        async onSave() {
            console.log("save call")
            // Update the item. using repository
            await this.updateTask();
            // this.$router.push({ name: 'todo.list.list' });
            console.log("save call 2")
        },
        async updateTask() {
            console.log("update item. call")
            const repository = this.itemRepository(); //this.repositoryFactory.create(this.repository);
            const newTask = repository.create();
            
            // newTask.id = this.item.id;
            newTask.name = this.item.name;
            newTask.description = this.item.description;
            newTask.active = this.item.active;
            newTask.mediaId = this.item.mediaId;

            try {
                // Update the item.
                if(this.item.id){
                    await repository.get(this.item.id).then((item) => {
                        if(item){
                            item.name = this.item.name;
                            item.description = this.item.description;
                            item.active = this.item.active;
                            newTask.mediaId = this.item.mediaId;
                            repository.save(item).then(() => {
                                console.log('Task updated successfully');
                            }).catch((error) => {
                                console.error('Error updating item.:', error);
                            });
                        }
                    })
                }else{
                    await repository.save(newTask);
                }
                this.$router.push({ name: 'blog.author.list' });
            } catch (error) {
                console.error('Error updating item.');
                console.log(error)
                console.error('Error updating item.');
            }
            console.log("update item. call 2")
        }
    },
    computed: {
        itemRepository() {
            return this.repositoryFactory.create(this.repository);
        },
    },
    mounted() {

        const itemId = this.$route.params.id

        if(itemId){
            
            this.item.id = itemId;

            this.loadItem();

        }
    }
});