(function(){var e={116:function(){},837:function(){},558:function(){},456:function(){},27:function(e,t,i){var a=i(116);a.__esModule&&(a=a.default),"string"==typeof a&&(a=[[e.id,a,""]]),a.locals&&(e.exports=a.locals),i(346).Z("5ff04f6e",a,!0,{})},43:function(e,t,i){var a=i(837);a.__esModule&&(a=a.default),"string"==typeof a&&(a=[[e.id,a,""]]),a.locals&&(e.exports=a.locals),i(346).Z("282b4d2b",a,!0,{})},941:function(e,t,i){var a=i(558);a.__esModule&&(a=a.default),"string"==typeof a&&(a=[[e.id,a,""]]),a.locals&&(e.exports=a.locals),i(346).Z("0815b140",a,!0,{})},250:function(e,t,i){var a=i(456);a.__esModule&&(a=a.default),"string"==typeof a&&(a=[[e.id,a,""]]),a.locals&&(e.exports=a.locals),i(346).Z("5ad7c774",a,!0,{})},346:function(e,t,i){"use strict";function a(e,t){for(var i=[],a={},n=0;n<t.length;n++){var r=t[n],s=r[0],o={id:e+":"+n,css:r[1],media:r[2],sourceMap:r[3]};a[s]?a[s].parts.push(o):i.push(a[s]={id:s,parts:[o]})}return i}i.d(t,{Z:function(){return h}});var n="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!n)throw Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var r={},s=n&&(document.head||document.getElementsByTagName("head")[0]),o=null,l=0,c=!1,d=function(){},m=null,u="data-vue-ssr-id",p="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function h(e,t,i,n){c=i,m=n||{};var s=a(e,t);return g(s),function(t){for(var i=[],n=0;n<s.length;n++){var o=r[s[n].id];o.refs--,i.push(o)}t?g(s=a(e,t)):s=[];for(var n=0;n<i.length;n++){var o=i[n];if(0===o.refs){for(var l=0;l<o.parts.length;l++)o.parts[l]();delete r[o.id]}}}}function g(e){for(var t=0;t<e.length;t++){var i=e[t],a=r[i.id];if(a){a.refs++;for(var n=0;n<a.parts.length;n++)a.parts[n](i.parts[n]);for(;n<i.parts.length;n++)a.parts.push(w(i.parts[n]));a.parts.length>i.parts.length&&(a.parts.length=i.parts.length)}else{for(var s=[],n=0;n<i.parts.length;n++)s.push(w(i.parts[n]));r[i.id]={id:i.id,refs:1,parts:s}}}}function y(){var e=document.createElement("style");return e.type="text/css",s.appendChild(e),e}function w(e){var t,i,a=document.querySelector("style["+u+'~="'+e.id+'"]');if(a){if(c)return d;a.parentNode.removeChild(a)}if(p){var n=l++;t=f.bind(null,a=o||(o=y()),n,!1),i=f.bind(null,a,n,!0)}else t=v.bind(null,a=y()),i=function(){a.parentNode.removeChild(a)};return t(e),function(a){a?(a.css!==e.css||a.media!==e.media||a.sourceMap!==e.sourceMap)&&t(e=a):i()}}var b=function(){var e=[];return function(t,i){return e[t]=i,e.filter(Boolean).join("\n")}}();function f(e,t,i,a){var n=i?"":a.css;if(e.styleSheet)e.styleSheet.cssText=b(t,n);else{var r=document.createTextNode(n),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(r,s[t]):e.appendChild(r)}}function v(e,t){var i=t.css,a=t.media,n=t.sourceMap;if(a&&e.setAttribute("media",a),m.ssrId&&e.setAttribute(u,t.id),n&&(i+="\n/*# sourceURL="+n.sources[0]+" */\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */"),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}}},t={};function i(a){var n=t[a];if(void 0!==n)return n.exports;var r=t[a]={id:a,exports:{}};return e[a](r,r.exports,i),r.exports}i.d=function(e,t){for(var a in t)i.o(t,a)&&!i.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="bundles/gdnblog/",window?.__sw__?.assetPath&&(i.p=window.__sw__.assetPath+"/bundles/gdnblog/"),function(){"use strict";i(250);let{Component:e,Mixin:t}=Shopware,{Criteria:a}=Shopware.Data;e.register("blog-author-list",{template:'{% block blog_author_list %}\n\n<sw-page class="blog-author-list">\n\n    {% block blog_author_list_smart_bar_actions %}\n        <template #smart-bar-actions>\n            <sw-button\n                variant="primary"\n                :routerLink="{ name: \'blog.author.create\' }"\n                > {{ $tc(\'global.default.new\') }}\n            </sw-button>\n        </template>\n    {% endblock %}\n\n    <template #content>\n        <div class="item_row">\n            <div class="side_nav">\n                <ul>\n                    <li><a class="link" href="#/blog/post/list">Blog</a></li>\n                    <li><a class="activeLink" href="#/blog/author/list">Autor</a></li>\n                    <li><a class="link" href="#/blog/category/list">Category</a></li>\n                </ul>\n                </div>\n                <div class="col-10">\n\n                    <sw-data-grid\n                        :dataSource="items"\n                        :columns="columns"\n                        :showSelection="false"\n                        >\n\n                        <template #actions="{ item }">\n                            <sw-context-menu-item @click="onEditItem(item)">Edit</sw-context-menu-item>\n                            <sw-context-menu-item @click="itemId = item.id; confirmModal = !confirmModal">Delete</sw-context-menu-item>\n                        </template>\n                    </sw-data-grid>\n                    \n                    <sw-pagination\n                        :currentPage="page"\n                        :total="total"\n                        :limit="limit"\n                        @page-change="onPageChange"\n                    />\n\n                </div>\n            </div>\n        </template>\n        \n</sw-page>\n\n<sw-confirm-modal\n    v-if="confirmModal"\n    class="sw-my-component__confirm-delete-modal"\n    type="delete"\n    :text="\'Are you sure you want to delete this?\'"\n    @confirm="onDeleteItem()"\n    @close="confirmModal = !confirmModal"\n    @cancel="confirmModal = !confirmModal">\n</sw-confirm-modal>\n\n{% endblock %}',mixins:[t.getByName("notification")],inject:["repositoryFactory"],data(){return{items:[],total:0,limit:10,page:1,sortBy:"createdAt",sortDirection:"DESC",naturalSorting:!1,columns:[{property:"name",label:"Title",routerLink:"blog.author.create"},{property:"description",label:"Description"}],entity:"gdn_blog_author",itemId:null,confirmModal:!1}},methods:{loadItems(){let e=new a(this.page,this.limit);e.addSorting(a.sort(this.sortBy,this.sortDirection,this.naturalSorting)),this.repository=this.repositoryFactory.create(this.entity),this.repository.search(e).then(e=>{this.items=e,this.total=e.total})},onEditItem(e){let t=e.id;this.$router.push({name:"blog.author.create",params:{id:t}})},onPageChange(e){let{page:t,limit:i}=e;this.limit=i,this.page=t,this.loadItems()},async onDeleteItem(){let e=this.itemId;if(!e){console.error("Item ID is undefined or null.");return}try{let t=this.repositoryFactory.create(this.entity);if(!t){console.error("Repository for 'blog_post' could not be created.");return}await t.delete(e,Shopware.Context.api),this.confirmModal=!1,this.createNotificationSuccess({title:"Success",message:"Item deleted successfully"}),this.loadItems()}catch(e){console.error("Error deleting item:",e.message||e),this.createNotificationError({title:"Error",message:"Something went wrong, Please try again later"})}}},created(){this.loadItems()},itemRepository(){return this.repositoryFactory.create(this.entity)}});var n=JSON.parse('{"global":{"default":{"success":"Erfolg","save":"Speichern","update":"Aktualisieren","deleteSuccess":"Erfolgreich gel\xf6scht","error":"Fehler","new":"+ Neu hinzuf\xfcgen"}},"blog-author":{"general":{"title":"Blog-Autor","description":"Details zum Blog-Autor"},"list":{"labelTitle":"Name","descriptionTitle":"Beschreibung","statusTitle":"Status"}},"blog-category":{"general":{"title":"Blog Category","description":"Blog Category Details"}},"blog-post":{"general":{"title":"Blog ","description":"Blog Details"}}}'),r=JSON.parse('{"global":{"default":{"success":"Success","save":"Save","update":"Update","deleteSuccess":"Deleted successfully","error":"Error","new":"+ Add New"}},"blog-author":{"general":{"title":"Blog Author","description":"Blog Author Details"},"list":{"labelTitle":"Name","descriptionTitle":"Description","statusTitle":"Status"}},"blog-category":{"general":{"title":"Blog Category","description":"Blog Category Details"}},"blog-post":{"general":{"title":"Blog ","description":"Blog Details"}}}');let{Component:s,Mixin:o}=Shopware,{Criteria:l}=Shopware.Data;s.register("blog-author-create",{template:'{% block blog_author_list %}\n\n<sw-page class="blog-author-create">\n\n    {% block blog_author_list_smart_bar_actions %}\n        <template #smart-bar-actions>\n\n            <sw-button \n                :disabled="true" \n                :square="false" \n                :block="false"  \n                variant="primary" \n                :isLoading="true" \n                v-if="loading"\n                >\n                Processing...\n            </sw-button>\n\n            <sw-button\n                v-else\n                variant="primary"\n                @click="onSave"\n                >\n                <span v-if="item.id">{{ $tc(\'global.default.update\') }}</span>\n                <span v-else>{{ $tc(\'global.default.save\') }}</span>\n            </sw-button>\n        </template>\n    {% endblock %}\n\n    <template #content> \n\n        <sw-card :title="cardTitle">\n\n            <sw-text-field \n                v-model:value="item.name" \n                :required="true" \n                :error="errors.name"\n                label="Name" \n            />\n            \n            <sw-textarea-field \n                v-model:value="item.description" \n                label="Description"\n            />\n            \n            <sw-media-field\n                label="Select Media"\n                v-model:value="item.mediaId"\n                :allowMultiSelect="false"\n            />\n\n            <sw-switch-field v-model:value="item.active" label="Active"></sw-switch-field>\n\n        </sw-card>\n\n    </template>\n        \n</sw-page>\n\n{% endblock %}',mixins:[o.getByName("notification"),o.getByName("placeholder")],snippets:{"de-DE":n,"en-GB":r},inject:["repositoryFactory","acl"],data(){return{item:{id:null,name:"",description:"",active:!1,mediaId:null},errors:{name:null},toastTitle:"",toastMessage:"",repository:"gdn_blog_author",loading:!1}},methods:{async loadItem(){let e=this.item.id,t=new l;t.setIds([e]),this.itemRepository.search(t).then(e=>{this.item=e[0]})},async onSave(){if(this.loading=!0,!await this.validateRequiredFields()){this.loading=!1;return}await this.updateItem()},async updateItem(){let e=this.itemRepository,t=!!this.item.id,i=t?await e.get(this.item.id):e.create();i.name=this.item.name,i.description=this.item.description,i.active=this.item.active,i.mediaId=this.item.mediaId;try{await e.save(i,Shopware.Context.api),this.createNotificationSuccess({title:"Success",message:t?"Author updated successfully":"Author created successfully"}),this.$router.push({name:"blog.author.list"})}catch(e){this.createNotificationError({title:"Error",message:"Error creating or updating author, please try again later"})}finally{this.loading=!1}},async validateRequiredFields(){let e=!0;return this.item.name?this.errors.name=null:(this.errors.name="Name is required",e=!1),e},checkIfId(){let e=this.$route.params.id;e&&(this.item.id=e,this.loadItem())}},computed:{itemRepository(){return this.repositoryFactory.create(this.repository)},cardTitle(){return this.item.id?"Update Author":"New Author"}},mounted(){this.checkIfId()}}),Shopware.Module.register("blog-author",{type:"plugin",name:"blog-author",title:"blog-author.general.title",description:"blog-author.general.description",color:"#ff3d58",entity:"gdn_blog_author",snippets:{"de-DE":n,"en-GB":r},routes:{list:{component:"blog-author-list",path:"list"},create:{component:"blog-author-create",path:"create/:id?",meta:{parentPath:"blog.author.list"}}}});let{Component:c,Mixin:d}=Shopware,{Criteria:m}=Shopware.Data;c.register("blog-category-list",{template:'{% block blog_category_list %}\n\n<sw-page class="blog-category-list">\n\n    {% block blog_author_list_smart_bar_actions %}\n        <template #smart-bar-actions>\n            <sw-button\n                variant="primary"\n                :routerLink="{ name: \'blog.category.create\' }">\n                {{ $tc(\'global.default.new\') }}\n            </sw-button>\n        </template>\n    {% endblock %}\n\n    <template #content>\n\n        <div class="item_row">\n\n            <div class="side_nav">\n                <ul>\n                    <li><a class="link" href="#/blog/post/list">Blog</a></li>\n                    <li><a class="link" href="#/blog/author/list">Autor</a></li>\n                    <li><a class="activeLink" href="#/blog/category/list">Category</a></li>\n                </ul>\n            </div>\n            <div class="col-10">\n                <sw-data-grid\n                    :dataSource="items"\n                    :columns="columns"\n                    :showSelection="false"\n                    >\n\n                    <template #actions="{ item }">\n                        <sw-context-menu-item @click="onEditItem(item)">Edit</sw-context-menu-item>\n                        <sw-context-menu-item @click="categoryId = item.id; confirmModal = !confirmModal">Delete</sw-context-menu-item>\n                    </template>\n                </sw-data-grid>\n                \n                <sw-pagination\n                    :currentPage="page"\n                    :total="total"\n                    :limit="limit"\n                    @page-change="onPageChange"\n                />\n            </div>\n        </div>\n    </template>\n        \n</sw-page>\n<sw-confirm-modal\n    v-if="confirmModal"\n    class="sw-my-component__confirm-delete-modal"\n    type="delete"\n    :text="\'Are you sure you want to delete this?\'"\n    @confirm="onDeleteItem()"\n    @close="confirmModal = !confirmModal"\n    @cancel="confirmModal = !confirmModal">\n</sw-confirm-modal>\n{% endblock %}',mixins:[d.getByName("notification")],inject:["repositoryFactory"],data(){return{items:[],total:0,limit:10,page:1,sortBy:"createdAt",sortDirection:"DESC",naturalSorting:!1,columns:[{property:"name",label:"Title",routerLink:"blog.category.create"},{property:"slug",label:"Slug"},{property:"meta_title",label:"Meta Title"}],entity:"gdn_blog_category",categoryId:null,confirmModal:!1}},methods:{loadItems(){let e=new m(this.page,this.limit);e.addSorting(m.sort(this.sortBy,this.sortDirection,this.naturalSorting)),e.addAssociation("media"),this.repository=this.repositoryFactory.create(this.entity),this.repository.search(e).then(e=>{this.items=e,this.total=e.total})},onEditItem(e){let t=e.id;this.$router.push({name:"blog.category.create",params:{id:t}})},onPageChange(e){let{page:t,limit:i}=e;this.limit=i,this.page=t,this.loadItems()},async onDeleteItem(){let e=this.categoryId;if(!e){this.createNotificationError({title:"Error",message:"Item ID is undefined or null."});return}try{let t=this.repositoryFactory.create(this.entity);if(!t){this.createNotificationError({title:"Error",message:"Repository for 'blog_author' could not be created."});return}await t.delete(e,Shopware.Context.api),this.confirmModal=!1,this.createNotificationSuccess({title:"Success",message:"Item deleted successfully."}),this.loadItems()}catch(e){this.createNotificationError({title:"Error",message:"Something went wrong, Please try again later."})}}},created(){this.loadItems()},itemRepository(){return this.repositoryFactory.create(this.entity)}});let{Component:u,Mixin:p}=Shopware,{Criteria:h}=Shopware.Data;u.register("blog-category-create",{template:'{% block blog_category_list %}\n\n<sw-page class="blog-category-create">\n\n    {% block blog_category_list_smart_bar_actions %}\n        <template #smart-bar-actions>\n            <sw-button \n                :disabled="true" \n                :square="false" \n                :block="false"  \n                variant="primary" \n                :isLoading="true" \n                v-if="loading"\n                >\n                Processing...\n            </sw-button>\n\n            <sw-button\n                v-else\n                variant="primary"\n                @click="onSave"\n                >\n                <span v-if="item.id">{{ $tc(\'global.default.update\') }}</span>\n                <span v-else>{{ $tc(\'global.default.save\') }}</span>\n            </sw-button>\n        </template>\n    {% endblock %}\n\n    <template #content> \n\n        <sw-card :title="cardTitle">\n\n            <sw-text-field \n                v-model:value="item.name" \n                :required="true" \n                :error="errors.name"\n                label="Name"\n            />\n            <sw-text-field \n                v-model:value="item.slug" \n                :required="true" \n                :error="errors.slug"\n                label="Slug" \n            />\n            \n            <sw-textarea-field \n                v-model:value="item.shortDescription" \n                label="Short Description"\n                :required="true"\n                :error="errors.short_description"\n            />\n\n            <sw-textarea-field \n                v-model:value="item.description" \n                label="Description"\n            />\n            \n            <sw-media-field\n                label="Select Media"\n                v-model:value="item.mediaId"\n                :allowMultiSelect="false"\n            />\n\n            <sw-switch-field v-model:value="item.active" label="Active"></sw-switch-field>\n\n            <sw-text-field \n                v-model:value="item.meta_title"\n                :error="errors.meta_title"\n                label="Meta Title" \n            />\n\n            <sw-textarea-field \n                v-model:value="item.meta_description" \n                label="Meta Description"\n            />\n\n            <sw-textarea-field \n                v-model:value="item.meta_keywords" \n                label="Meta Keywords"\n            />\n\n\n        </sw-card>\n\n    </template>\n        \n</sw-page>\n\n{% endblock %}',mixins:[p.getByName("notification"),p.getByName("placeholder")],inject:["repositoryFactory","acl"],data(){return{item:{id:null,name:"",slug:"",description:"",shortDescription:"",active:!0,mediaId:null,meta_title:"",meta_description:"",meta_keywords:""},errors:{name:null,slug:null,short_description:null},toastTitle:"",toastMessage:"",repository:"gdn_blog_category",loading:!1}},methods:{async loadItem(){let e=this.item.id,t=new h;t.setIds([e]),this.itemRepository.search(t).then(e=>{this.item=e[0]})},async onSave(){if(!await this.validateRequiredFields()){this.loading=!1;return}if(this.loading=!0,!await this.validateUniqueSlug()){this.createNotificationError({title:"Duplicate Slug",message:"The slug you entered already exists. Please choose a unique slug."});return}await this.updateItem()},async updateItem(){let e=this.itemRepository,t=!!this.item.id,i=t?await e.get(this.item.id):e.create();i.name=this.item.name,i.slug=this.item.slug,i.shortDescription=this.item.shortDescription,i.description=this.item.description,i.active=this.item.active,i.meta_title=this.item.meta_title,i.meta_description=this.item.meta_description,i.meta_keywords=this.item.meta_keywords,i.mediaId=this.item.mediaId;try{await e.save(i,Shopware.Context.api),this.createNotificationSuccess({title:"Success",message:t?"Category updated successfully":"Category added successfully"}),this.$router.push({name:"blog.category.list"})}catch(e){this.createNotificationError({title:"Error",message:t?"Error updating category, please try again later":"Error creating category, please try again later"})}finally{this.loading=!1}},generateSlug(){let e=this.item.name.toString().toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9 ]/g,"").replace(/\s+/g,"-");this.item.slug=e},async validateRequiredFields(){let e=!0;return this.item.name?this.errors.name=null:(this.errors.name="Name is required",e=!1),this.item.slug?this.errors.slug=null:(this.errors.slug="Slug is required",e=!1),this.item.shortDescription?this.errors.short_description=null:(this.errors.short_description="Short description is required",e=!1),e},async validateUniqueSlug(){let e=new Shopware.Data.Criteria;e.addFilter(Shopware.Data.Criteria.equals("slug",this.item.slug)),this.item.id&&e.addFilter(Shopware.Data.Criteria.not("AND",[Shopware.Data.Criteria.equals("id",this.item.id)]));let t=this.itemRepository,i=await t.search(e,Shopware.Context.api);return i.total>0?this.errors.slug="The slug you entered already exists":this.errors.slug=null,this.loading=!1,0===i.total}},watch:{"item.name":function(e,t){t&&e!==t&&this.generateSlug()}},computed:{itemRepository(){return this.repositoryFactory.create(this.repository)},cardTitle(){return this.item.id?"Update Category":"New Category"}},mounted(){let e=this.$route.params.id;e&&(this.item.id=e,this.loadItem())}}),Shopware.Module.register("blog-category",{type:"plugin",name:"blog-category",title:"blog-category.general.title",description:"blog-category.general.description",color:"#ff3d58",snippets:{"de-DE":n,"en-GB":r},routes:{list:{component:"blog-category-list",path:"list"},create:{component:"blog-category-create",path:"create/:id?",meta:{parentPath:"blog.category.list"}}}});let{Component:g,Mixin:y}=Shopware,{Criteria:w}=Shopware.Data;g.register("blog-post-list",{template:'{% block blog_post_list %}\n\n<sw-page class="blog-post-list">\n\n    {% block blog_post_list_smart_bar_actions %}\n        <template #smart-bar-actions>\n            <sw-button\n                variant="primary"\n                :routerLink="{ name: \'blog.post.create\' }"\n                > {{ $tc(\'global.default.new\') }}\n            </sw-button>\n        </template>\n    {% endblock %}\n\n    <template #content>\n\n        <div class="item_row">\n\n            <div class="side_nav">\n                <ul>\n                    <li><a class="activeLink" href="#/blog/post/list">Blog</a></li>\n                    <li><a class="link" href="#/blog/author/list">Autor</a></li>\n                    <li><a class="link" href="#/blog/category/list">Category</a></li>\n                </ul>\n            </div>\n\n            <div class="col-10">\n\n                <sw-data-grid\n                    :dataSource="items"\n                    :columns="columns"\n                    :showSelection="false"\n                    >\n\n                    <template #actions="{ item }">\n                        <sw-context-menu-item @click="onEditItem(item)">Edit</sw-context-menu-item>\n                        <sw-context-menu-item @click="postId = item.id; confirmModal = !confirmModal">Delete</sw-context-menu-item>\n                    </template>\n                </sw-data-grid>\n\n                 \n                <sw-pagination\n                    :currentPage="page"\n                    :total="total"\n                    :limit="limit"\n                    @page-change="onPageChange"\n                />\n            \n            </div>\n\n        </div>\n\n    </template>\n\n</sw-page>\n\n<sw-confirm-modal\n    v-if="confirmModal"\n    class="sw-my-component__confirm-delete-modal"\n    type="delete"\n    :text="\'Are you sure you want to delete this?\'"\n    @confirm="onDeleteItem()"\n    @close="confirmModal = !confirmModal"\n    @cancel="confirmModal = !confirmModal">\n</sw-confirm-modal>\n\n{% endblock %}',mixins:[y.getByName("notification")],snippets:{"de-DE":n,"en-GB":r},inject:["repositoryFactory"],data(){return{postId:null,items:[],total:0,limit:10,page:1,sortBy:"createdAt",sortDirection:"DESC",naturalSorting:!1,columns:[{property:"title",label:"Title",routerLink:"blog.post.create",width:"200px"},{property:"postAuthor.name",label:"Author",width:"100px"}],entity:"gdn_blog_post",confirmModal:!1}},methods:{loadItems(){let e=new w(this.page,this.limit);e.addSorting(w.sort(this.sortBy,this.sortDirection,this.naturalSorting)),e.addAssociation("postAuthor"),this.repository=this.repositoryFactory.create(this.entity),this.repository.search(e).then(e=>{this.items=e,this.total=e.total})},onEditItem(e){let t=e.id;this.$router.push({name:"blog.post.create",params:{id:t}})},onPageChange(e){let{page:t,limit:i}=e;this.limit=i,this.page=t,this.loadItems()},async onDeleteItem(){let e=this.postId;if(e)try{let t=this.repositoryFactory.create(this.entity);if(!t)return;await t.delete(e,Shopware.Context.api),this.confirmModal=!1,this.createNotificationSuccess({title:"Success",message:"Blog deleted successfully"}),this.loadItems()}catch(e){this.createNotificationError({title:"Errir",message:"Something went wrong, please try again later"})}}},created(){this.loadItems()},itemRepository(){return this.repositoryFactory.create(this.entity)}}),i(27);let{Component:b,Mixin:f,Context:v}=Shopware,{Criteria:_}=Shopware.Data;b.register("blog-post-create",{template:'{% block blog_post_list %}\n\n<sw-page class="blog-post-create">\n\n    {% block blog_post_smart_bar_actions %}\n        <template #smart-bar-actions>\n            <sw-button \n                :disabled="true" \n                :square="false" \n                :block="false"  \n                variant="primary" \n                :isLoading="true" \n                v-if="loading"\n                >\n                Processing...\n            </sw-button>\n\n            <sw-button\n                v-else\n                variant="primary"\n                @click="onSave"\n                >\n                <span v-if="item.id">{{ $tc(\'global.default.update\') }}</span>\n                <span v-else>{{ $tc(\'global.default.save\') }}</span>\n            </sw-button>\n        </template>\n    {% endblock %}\n\n    <template #content> \n\n        <sw-card :title="cardTitle">\n\n            <sw-text-field\n                label="Title"\n                v-model:value="item.title"\n                :required="true" \n                :placeholder="\'Enter blog title...\'"\n                :error="errors.title"\n                >\n            </sw-text-field>\n            \n            <sw-text-field\n                label="Slug"\n                v-model:value="item.slug"\n                :required="true" \n                :error="errors.slug"\n                :placeholder="\'Enter slug...\'"\n                >\n            </sw-text-field>\n\n            <sw-multi-select\n                label="Select category"\n                :options="categories"\n                v-model:value="item.categoryIds"\n                :allow-new="true"\n                :allow-new-items="true"\n                :addItem="newCategory"\n                :label-property="\'name\'"\n                :value-property="\'id\'"\n                placeholder="Select category"\n                >\n            </sw-multi-select>   \n\n            <sw-select-field\n                label="Select an author"\n                placeholder="Choose an author..."\n                v-model:value="item.authorId"\n                :options="authors"\n                :searchable="true"\n                :allow-clear="true"\n                :label-property="\'name\'"\n                :value-property="\'id\'"\n                :required="true" \n                :error="errors.authorId"\n            >\n            </sw-select-field>\n\n            <sw-datepicker\n                v-model:value="item.publishedAt"\n                label="Publish Date"\n                placeholder="Select publish date and time"\n                dateType="datetime"\n                :timePicker="true"\n                :datePicker="true"\n                :allowInput="true"\n                :clearable="true"\n                :required="true"\n                :error="errors.publishedAt"\n            />\n\n            <sw-textarea-field \n                v-model:value="item.shortDescription" \n                label="Short Description"\n                validation="required"\n                :required="true"\n                :error="errors.short_description"\n            />\n\n            <sw-text-editor\n                sanitize-input\n                v-model:value="item.description" \n                :placeholder="\'Enter blog description...\'"\n                label="Description"\n            />\n\n            <div class="inputLabel">\n                <h6>Tags</h6>\n                <sw-button\n                    variant="primary"\n                    title="New tag"\n                    @click="newTag"\n                    >\n                    <sw-icon name="regular-plus-xxs" />\n                </sw-button>\n            </div>\n\n            <sw-multi-select\n                :options="tags"\n                v-model:value="item.tags"\n                :allow-new="true"\n                :allow-new-items="true"\n                :label-property="\'name\'"\n                :value-property="\'id\'"\n                placeholder="Select tags"\n                >\n            </sw-multi-select>\n            \n            <sw-media-field\n                v-model:value="item.mediaId"\n                label="Select or upload an image"\n                :media-upload-tag="\'blog-post-media\'"\n                :allow-multi-select="false"\n                type="button"\n            />\n            \n            <sw-switch-field v-model:value="item.active" label="Active"></sw-switch-field>\n\n            <h5> Meta Info </h5>\n            \n            <sw-text-field\n                label="Meta Title"\n                v-model:value="item.meta_title"\n                :placeholder="\'Enter meta title...\'"\n            >\n            </sw-text-field>\n\n            <sw-textarea-field\n                label="Meta Description"\n                v-model:value="item.meta_description"\n                :placeholder="\'Enter meta descriiption...\'"\n                >\n            </sw-textarea-field>\n\n            <sw-textarea-field\n                label="Meta keywords"\n                v-model:value="item.meta_keywords"\n                :placeholder="\'Enter meta keywords\'"\n            >\n            </sw-textarea-field>\n\n        </sw-card>\n\n    </template>\n        \n</sw-page>\n\n{% endblock %}',mixins:[f.getByName("notification"),f.getByName("placeholder")],snippets:{"de-DE":n,"en-GB":r},inject:["repositoryFactory","acl"],data(){return{item:{id:null,title:"",slug:"",shortDescription:"",description:"",publishedAt:"",active:!0,mediaId:null,authorId:null,categoryIds:[],meta_title:"",meta_description:"",meta_keywords:"",tags:[]},errors:{title:null,slug:null,short_description:null,categoryIds:null,authorId:null,publishedAt:null},loading:!1,createdId:null,entity:"gdn_blog_post",authors:[],categories:[],tags:[]}},methods:{async loadItem(){let e=this.item.id,t=new _;t.addAssociation("postCategories"),t.setIds([e]),this.itemRepository.search(t).then(e=>{this.item=e[0],0==Object.keys(e[0].tags).length&&(this.item.tags=[]),this.item.categoryIds=this.item.postCategories.map(e=>e.id)})},async onSave(){if(!await this.validateRequiredFields()){this.loading=!1;return}if(this.loading=!0,!await this.validateUniqueSlug()){this.createNotificationError({title:"Duplicate Slug",message:"The slug you entered already exists. Please choose a unique slug."});return}await this.updateItem()},async updateItem(){let e=this.itemRepository,t=!!this.item.id,i=t?await e.get(this.item.id):e.create();i.title=this.item.title,i.slug=this.item.slug,i.shortDescription=this.item.shortDescription,i.description=this.item.description,i.active=this.item.active,i.publishedAt=this.item.publishedAt,i.meta_title=this.item.meta_title,i.meta_description=this.item.meta_description,i.meta_keywords=this.item.meta_keywords,i.mediaId=this.item.mediaId,i.authorId=this.item.authorId,i.tags=this.item.tags,this.item.tags?i.tags_name=this.tags.filter(e=>this.item.tags.includes(e.id)).map(e=>e.name):i.tags_name=[];try{if(t)await e.save(i,Shopware.Context.api),this.createdId=this.item.id,await this.manageCategoryBlog();else{let t=Shopware.Utils.createId();i.id=t,await e.save(i,Shopware.Context.api),this.createdId=t,await this.manageCategoryBlog()}this.createNotificationSuccess({title:"Success",message:t?"Post updated successfully":"Post added successfully"}),this.$router.push({name:"blog.post.list"})}catch(e){this.createNotificationError({title:"Error",message:t?"Error updating post":"Error creating post"})}finally{this.loading=!1}},checkIfId(){let e=this.$route.params.id;e&&(this.item.id=e,this.loadItem())},getAllAuthors(){let e=new _(1,500);return this.repositoryFactory.create("gdn_blog_author").search(e,Shopware.Context.api).then(e=>{this.authors=e}).catch(e=>{})},getAllTags(){let e=new _(1,500);return this.repositoryFactory.create("tag").search(e,Shopware.Context.api).then(e=>{this.tags=e}).catch(e=>{})},newTag(){this.$router.push({name:"sw.settings.tag.index"})},getAllCategories(){let e=new _(1,500);return this.repositoryFactory.create("gdn_blog_category").search(e,Shopware.Context.api).then(e=>{this.categories=e}).catch(e=>{})},async manageCategoryBlog(){let e=this.item.categoryIds;if(e){let t=this.item.id;if(t)try{let e=this.repositoryFactory.create("gdn_blog_post_gdn_blog_category"),i=new _;i.addFilter(_.equals("blogId",t));let a=await e.search(i,Shopware.Context.api);if(console.log(a),a.total>0)for(let t of a)await e.delete([t.blogId,t.categoryId],Shopware.Context.api)}catch(e){console.log("Bulk delete error "+e)}for(let t of e){let e=this.repositoryFactory.create("gdn_blog_post_gdn_blog_category"),i=e.create();i.categoryId=t,i.blogId=this.createdId,e.save(i,Shopware.Context.api).then(()=>{}).catch(e=>{})}}},async validateRequiredFields(){let e=!0;return this.item.title?this.errors.title=null:(this.errors.title="Title is required",e=!1),this.item.slug?this.errors.slug=null:(this.errors.slug="Slug is required",e=!1),this.item.shortDescription?this.errors.short_description=null:(this.errors.short_description="Short description is required",e=!1),this.item.authorId?this.errors.slug=null:(this.errors.authorId="Author is required",e=!1),this.item.publishedAt?this.errors.publishedAt=null:(this.errors.publishedAt="Published date is required",e=!1),e},async validateUniqueSlug(){let e=new Shopware.Data.Criteria;e.addFilter(Shopware.Data.Criteria.equals("slug",this.item.slug)),this.item.id&&e.addFilter(Shopware.Data.Criteria.not("AND",[Shopware.Data.Criteria.equals("id",this.item.id)]));let t=this.itemRepository,i=await t.search(e,Shopware.Context.api);return i.total>0?this.errors.slug="The slug you entered already exists":this.errors.slug=null,this.loading=!1,0===i.total},generateSlug(){let e=this.item.title.toString().toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9 ]/g,"").replace(/\s+/g,"-");this.item.slug=e}},watch:{"item.title":function(e,t){t&&e!==t&&this.generateSlug()}},computed:{itemRepository(){return this.repositoryFactory.create(this.entity)},cardTitle(){return this.item.id?"Update Blog":"New Blog"}},mounted(){this.checkIfId(),this.getAllAuthors(),this.getAllCategories(),this.getAllTags()}});let{Module:S}=Shopware;S.register("blog-post",{type:"plugin",name:"blog-post",title:"blog-post.general.title",description:"blog-post.general.description",color:"#ff3d58",entity:"gdn_blog_post",routes:{list:{component:"blog-post-list",path:"list"},create:{component:"blog-post-create",path:"create/:id?",meta:{parentPath:"blog.post.list"}}},navigation:[{id:"blog-post-list",label:"blog-post.general.title",color:"#ff3d58",path:"blog.post.list",parent:"sw-content",position:100}]}),i(43);let{Criteria:I}=Shopware.Data;Shopware.Component.register("sw-cms-block-latest-blogs",{template:'{% block sw_cms_block_latest_blogs %}\n    <div class="sw-cms-block-latest-blogs" v-if="items.length > 0">\n        <div class="blog-item" v-for="item in items" :key="item.id">\n            <div class="card">\n                <img :src="item.media && item.media.url ? item.media.url : assetFilter(\'/administration/static/img/cms/preview_mountain_small.jpg\')" alt="Blog Image">\n                <div class="card-details">\n                    <div class="d-flex">\n                        <p>{{ item.title }}</p>\n                        <p>{{ item.content }}</p>\n                    </div>\n                    <h6 class="blog-title">{{ item.title }}</h6>\n                    <p class="blog-short-description">{{ item.content }}</p>\n                </div>\n            </div>\n        </div>\n    </div>\n    <p v-else>No latest blogs available at the moment.</p>\n{% endblock %}',inject:["repositoryFactory"],data(){return{items:[]}},created(){this.getLatestBlogs()},computed:{assetFilter(){return Shopware.Filter.getByName("asset")}},methods:{getLatestBlogs(){repository.search(criteria,Shopware.Context.api).then(e=>{e.map(e=>{let t={id:e.id,title:e.title,slug:e.slug,author:e.postAuthor.name,media:{url:e.media?e.media.url:null}};this.items.push(t)})}).catch(e=>{console.error("Error fetching latest blogs:",e)})}}}),i(941),Shopware.Component.register("sw-cms-preview-latest-blogs",{template:'{% block sw_cms_preview_latest_blogs_preview %}\n    <div class="latest_blog_container d-flex">\n        {% for i in 0..2 %}\n            <div class="">\n                <div class="card">\n                    <img :src="assetFilter(\'/administration/static/img/cms/preview_mountain_small.jpg\')">\n                    <div class="card-details">\n                        <div class="d-flex">\n                            <p>John Doe</p>\n                            <p>17 Oct,2024</p>\n                        </div>\n                        <h6 class="blog-title">What is Lorem Ipsum?</h6>\n                        <p class="blog-short-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>\n                    </div>\n                </div>\n            </div>\n        {% endfor %}\n    </div>\n{% endblock %}',computed:{assetFilter(){return Shopware.Filter.getByName("asset")}}}),Shopware.Service("cmsService").registerCmsBlock({name:"latest-blogs",category:"text",label:"Latest Blogs",component:"sw-cms-block-latest-blogs",previewComponent:"sw-cms-preview-latest-blogs",config:{selectedBlogs:{source:"static",value:null,type:"entity",entity:{name:"gdn_blog_post",labelProperty:"title",valueProperty:"id",multiple:!0}}},slots:[]})}()})();