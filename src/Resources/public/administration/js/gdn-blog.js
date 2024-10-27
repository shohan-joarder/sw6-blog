(function(){"use strict";var t={};t.p="bundles/gdnblog/",window?.__sw__?.assetPath&&(t.p=window.__sw__.assetPath+"/bundles/gdnblog/"),function(){let{Component:t,Mixin:e}=Shopware,{Criteria:o}=Shopware.Data;t.register("blog-author-list",{template:'{% block blog_author_list %}\n\n<sw-page class="blog-author-list">\n\n    {% block blog_author_list_smart_bar_actions %}\n        <template #smart-bar-actions>\n            <sw-button\n                variant="primary"\n                :routerLink="{ name: \'blog.author.create\' }"\n                > + New Author\n            </sw-button>\n        </template>\n    {% endblock %}\n\n    <template #content>\n        <sw-data-grid\n            :dataSource="items"\n            :columns="columns">\n\n            <template #actions="{ item }">\n                <sw-context-menu-item @click="onEditTask(item)">Edit</sw-context-menu-item>\n                <sw-context-menu-item @click="onDeleteTask(item)">Delete</sw-context-menu-item>\n            </template>\n        </sw-data-grid>\n    </template>\n        \n</sw-page>\n\n{% endblock %}',mixins:[e.getByName("notification")],inject:["repositoryFactory"],data(){return{items:[],total:0,limit:10,page:1,sortBy:"createdAt",sortDirection:"DESC",naturalSorting:!1,columns:[{property:"name",label:"Title"},{property:"description",label:"Description"},{property:"active",label:"Status"}],repository:"gdn_blog_author"}},created(){this.loadItems()},methods:{loadItems(){let t=new o(this.page,this.limit);t.addSorting(o.sort(this.sortBy,this.sortDirection,this.naturalSorting)),t.addAssociation("media"),this.repository=this.repositoryFactory.create(this.repository),this.repository.search(t).then(t=>{console.log("author called"),console.log(t),console.log("author called"),this.items=t,this.total=t.total})},onEditItem(t){let e=t.id;this.$router.push({name:"blog.author.create",params:{id:e}})}}});let{Component:a,Mixin:i}=Shopware,{Criteria:s}=Shopware.Data;a.register("blog-author-create",{template:'{% block blog_author_list %}\n\n<sw-page class="blog-author-create">\n\n    {% block blog_author_list_smart_bar_actions %}\n        <template #smart-bar-actions>\n            <sw-button\n                variant="primary"\n                @click="onSave"\n                > + Save\n            </sw-button>\n        </template>\n    {% endblock %}\n\n    <template #content> \n\n        <sw-card title="New Todo">\n\n            <sw-text-field v-model:value="item.name" label="Title"></sw-text-field>\n            \n            <sw-textarea-field v-model:value="item.description" label="Description"></sw-textarea-field>\n            \n            <sw-media-field\n                label="Select Media"\n                v-model:value="item.mediaId"\n                :allowMultiSelect="false"\n            />\n\n            <sw-switch-field v-model:value="item.active" label="Active"></sw-switch-field>\n\n        </sw-card>\n\n    </template>\n        \n</sw-page>\n\n{% endblock %}',mixins:[i.getByName("notification"),i.getByName("placeholder")],inject:["repositoryFactory","acl"],data(){return{item:{id:null,name:"",description:"",active:!1,mediaId:null},toastTitle:"",toastMessage:"",repository:"gdn_blog_author"}},created(){},methods:{async loadItem(){let t=this.item.id,e=new s;e.setIds([t]),this.itemRepository().search(e).then(t=>{console.log(t),this.item=t[0]})},async onSave(){console.log("save call"),await this.updateTask(),console.log("save call 2")},async updateTask(){console.log("update item call");let t=this.itemRepository(),e=t.create();e.name=this.item.name,e.description=this.item.description,e.active=this.item.active,e.mediaId=this.item.mediaId;try{this.item.id?await t.get(this.item.id).then(e=>{e&&(e.name=this.item.name,e.description=this.item.description,e.active=this.item.active,e.mediaId=this.item.mediaId,t.save(e).then(()=>{this.toastTitle="Success",this.toastMessage="Author updated successfully"}).catch(t=>{this.toastTitle="Error",this.toastMessage="Error updating item:"}))}):(await t.save(e),this.toastTitle="Success",this.toastMessage="Author addedd successfully"),this.createNotificationError({title:this.toastTitle,message:this.toastMessage}),this.$router.push({name:"blog.author.list"})}catch(t){console.error("Error updating item"),console.log(t),console.error("Error updating item")}}},computed:{itemRepository(){return this.repositoryFactory.create(this.repository)}},mounted(){let t=this.$route.params.id;t&&(this.item.id=t,this.loadItem())}});var n=JSON.parse('{"blog-author":{"general":{"title":"Blog Author","description":"Blog Author Details","new":"Add New","save":"Save"}},"blog-category":{"general":{"title":"Blog Category","description":"Blog Category Details","new":"Add New","save":"Save"}},"blog-post":{"general":{"title":"Blog ","description":"Blog Details","new":"Add New","save":"Save"}}}'),l=JSON.parse('{"blog-author":{"general":{"title":"Blog Author","description":"Blog Author Details","new":"Add New","save":"Save"}},"blog-category":{"general":{"title":"Blog Category","description":"Blog Category Details","new":"Add New","save":"Save"}},"blog-post":{"general":{"title":"Blog ","description":"Blog Details","new":"Add New","save":"Save"}}}');Shopware.Module.register("blog-author",{type:"plugin",name:"blog-author",title:"blog-author.general.title",description:"blog-author.general.description",color:"#ff3d58",entity:"gdn_blog_author",snippets:{"de-DE":n,"en-GB":l},routes:{list:{component:"blog-author-list",path:"list"},create:{component:"blog-author-create",path:"create/:id?",meta:{parentPath:"blog.author.list"}}}});let{Component:r,Mixin:c}=Shopware,{Criteria:m}=Shopware.Data;r.register("blog-category-list",{template:'{% block blog_category_list %}\n\n<sw-page class="blog-category-list">\n\n    {% block blog_category_smart_bar_actions %}\n        <template #smart-bar-actions>\n            <sw-button\n                variant="primary"\n                :routerLink="{ name: \'blog.category.create\' }"\n                > + New Author\n            </sw-button>\n        </template>\n    {% endblock %}\n\n    <template #content>\n        <sw-data-grid\n            :dataSource="items"\n            :columns="columns">\n\n            <template #actions="{ item }">\n                <sw-context-menu-item @click="onEditTask(item)">Edit</sw-context-menu-item>\n                <sw-context-menu-item @click="onDeleteTask(item)">Delete</sw-context-menu-item>\n            </template>\n        </sw-data-grid>\n    </template>\n        \n</sw-page>\n\n{% endblock %}',mixins:[c.getByName("notification")],inject:["repositoryFactory"],data(){return{items:[],total:0,limit:10,page:1,sortBy:"createdAt",sortDirection:"DESC",naturalSorting:!1,columns:[{property:"name",label:"Title"},{property:"description",label:"Description"},{property:"active",label:"Status"}],repository:"gdn_blog_category"}},created(){this.loadItems()},methods:{loadTasks(){let t=new m(this.page,this.limit);t.addSorting(m.sort(this.sortBy,this.sortDirection,this.naturalSorting)),t.addAssociation("media"),this.repository=this.repositoryFactory.create(this.repository),this.repository.search(t).then(t=>{console.log("category called"),console.log(t),console.log("category called"),this.items=t,this.total=t.total})},onEditItem(t){let e=t.id;this.$router.push({name:"blog.category.create",params:{id:e}})}}});let{Component:d,Mixin:p}=Shopware,{Criteria:g}=Shopware.Data;d.register("blog-category-create",{template:'{% block blog_category_list %}\n\n<sw-page class="blog-category-create">\n\n    {% block blog_category_smart_bar_actions %}\n        <template #smart-bar-actions>\n            <sw-button\n                variant="primary"\n                @click="onSave"\n                > + Save\n            </sw-button>\n        </template>\n    {% endblock %}\n\n    <template #content> \n\n        <sw-card title="New Todo">\n\n            <sw-text-field v-model:value="item.name" label="Title"></sw-text-field>\n            \n            <sw-textarea-field v-model:value="item.description" label="Description"></sw-textarea-field>\n            \n            <sw-media-field\n                label="Select Media"\n                v-model:value="item.mediaId"\n                :allowMultiSelect="false"\n            />\n\n            <sw-switch-field v-model:value="item.active" label="Active"></sw-switch-field>\n\n        </sw-card>\n\n    </template>\n        \n</sw-page>\n\n{% endblock %}',mixins:[p.getByName("notification"),p.getByName("placeholder")],inject:["repositoryFactory","acl"],data(){return{item:{id:null,name:"",description:"",active:!1,mediaId:null},repository:"gdn_blog_category"}},created(){},methods:{async loadItem(){let t=this.item.id,e=new g;e.setIds([t]),this.itemRepository().search(e).then(t=>{console.log(t),this.item=t[0]})},async onSave(){console.log("save call"),await this.updateTask(),console.log("save call 2")},async updateTask(){console.log("update task call");let t=this.itemRepository(),e=t.create();e.name=this.item.name,e.description=this.item.description,e.active=this.item.active,e.mediaId=this.item.mediaId;try{this.item.id?await t.get(this.item.id).then(o=>{o&&(item.name=this.item.name,item.description=this.item.description,item.active=this.item.active,e.mediaId=this.item.mediaId,t.save(o).then(()=>{console.log("Task updated successfully")}).catch(t=>{console.error("Error updating task:",t)}))}):await t.save(e),this.$router.push({name:"blog.author.list"})}catch(t){console.error("Error updating task"),console.log(t),console.error("Error updating task")}console.log("update task call 2")}},computed:{itemRepository(){return this.repositoryFactory.create(this.repository)}},mounted(){let t=this.$route.params.id;t&&(this.item.id=t,this.loadItem())}}),Shopware.Module.register("blog-category",{type:"plugin",name:"blog-category",title:"blog-category.general.title",description:"blog-category.general.description",color:"#ff3d58",snippets:{"de-DE":n,"en-GB":l},routes:{list:{component:"blog-category-list",path:"list"},create:{component:"blog-category-create",path:"create/:id?",meta:{parentPath:"blog.category.list"}}}});let{Component:h,Mixin:u}=Shopware,{Criteria:b}=Shopware.Data;h.register("blog-post-list",{template:'{% block blog_post_list %}\n\n<sw-page class="blog-post-list">\n\n    {% block blog_post_list_smart_bar_actions %}\n        <template #smart-bar-actions>\n            <sw-button\n                variant="primary"\n                :routerLink="{ name: \'blog.author.list\' }"\n                > Author list\n            </sw-button>\n            <sw-button\n                variant="primary"\n                :routerLink="{ name: \'blog.post.create\' }"\n                > + New Blog\n            </sw-button>\n        </template>\n    {% endblock %}\n\n    <template #content>\n        <sw-data-grid\n            :dataSource="items"\n            :columns="columns">\n\n            <template #actions="{ item }">\n                <sw-context-menu-item @click="onEditTask(item)">Edit</sw-context-menu-item>\n                <sw-context-menu-item @click="onDeleteTask(item)">Delete</sw-context-menu-item>\n            </template>\n        </sw-data-grid>\n    </template>\n        \n</sw-page>\n\n{% endblock %}',mixins:[u.getByName("notification")],inject:["repositoryFactory"],data(){return{items:[],total:0,limit:10,page:1,sortBy:"createdAt",sortDirection:"DESC",naturalSorting:!1,columns:[{property:"name",label:"Title"},{property:"description",label:"Description"},{property:"active",label:"Status"}],repository:"gdn_blog_post"}},created(){this.loadItems()},methods:{loadItems(){let t=new b(this.page,this.limit);t.addSorting(b.sort(this.sortBy,this.sortDirection,this.naturalSorting)),t.addAssociation("media"),this.repository=this.repositoryFactory.create(this.repository),this.repository.search(t).then(t=>{console.log("post called"),console.log(t),console.log("post called"),this.items=t,this.total=t.total})},onEditItem(t){let e=t.id;this.$router.push({name:"blog.post.create",params:{id:e}})}}});let{Component:w,Mixin:y}=Shopware,{Criteria:v}=Shopware.Data;w.register("blog-post-create",{template:'{% block blog_post_list %}\n\n<sw-page class="blog-post-create">\n\n    {% block blog_post_smart_bar_actions %}\n        <template #smart-bar-actions>\n            <sw-button\n                variant="primary"\n                @click="onSave"\n                > + Save\n            </sw-button>\n        </template>\n    {% endblock %}\n\n    <template #content> \n\n        <sw-card title="New Todo">\n\n            <sw-text-field v-model:value="item.name" label="Title"></sw-text-field>\n            \n            <sw-textarea-field v-model:value="item.description" label="Description"></sw-textarea-field>\n            \n            <sw-media-field\n                label="Select Media"\n                v-model:value="task.mediaId"\n                :allowMultiSelect="false"\n            />\n\n            <sw-switch-field v-model:value="item.active" label="Active"></sw-switch-field>\n\n        </sw-card>\n\n    </template>\n        \n</sw-page>\n\n{% endblock %}',mixins:[y.getByName("notification"),y.getByName("placeholder")],inject:["repositoryFactory","acl"],data(){return{item:{id:null,name:"",description:"",active:!1,mediaId:null},repository:"gdn_blog_post"}},created(){},methods:{async loadItem(){let t=this.item.id,e=new v;e.setIds([t]),this.itemRepository().search(e).then(t=>{console.log(t),this.item=t[0]})},async onSave(){console.log("save call"),await this.updateTask(),console.log("save call 2")},async updateTask(){console.log("update item. call");let t=this.itemRepository(),e=t.create();e.name=this.item.name,e.description=this.item.description,e.active=this.item.active,e.mediaId=this.item.mediaId;try{this.item.id?await t.get(this.item.id).then(o=>{o&&(o.name=this.item.name,o.description=this.item.description,o.active=this.item.active,e.mediaId=this.item.mediaId,t.save(o).then(()=>{console.log("Task updated successfully")}).catch(t=>{console.error("Error updating item.:",t)}))}):await t.save(e),this.$router.push({name:"blog.author.list"})}catch(t){console.error("Error updating item."),console.log(t),console.error("Error updating item.")}console.log("update item. call 2")}},computed:{itemRepository(){return this.repositoryFactory.create(this.repository)}},mounted(){let t=this.$route.params.id;t&&(this.item.id=t,this.loadItem())}});let{Module:_}=Shopware;_.register("blog-post",{type:"plugin",name:"blog-post",title:"blog.post.list",description:"blog.post.description",color:"#ff3d58",entity:"gdn_blog_post",routes:{list:{component:"blog-post-list",path:"list"},create:{component:"blog-post-create",path:"create",meta:{parentPath:"blog.post.list"}}},navigation:[{id:"blog-post-list",label:"blog-post.general.title",color:"#ff3d58",path:"blog.post.list",icon:"default-shopping-paper-bag-product",parent:"sw-content",position:100}]})}()})();