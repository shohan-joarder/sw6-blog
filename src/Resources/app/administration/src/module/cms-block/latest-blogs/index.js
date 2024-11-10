import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'latest-blogs',
    category: 'text',
    label: 'Latest Blogs',
    component: 'sw-cms-block-latest-blogs',
    previewComponent: 'sw-cms-preview-latest-blogs',
    config: {
        selectedBlogs: {
            source: "static",
            value: null,
            type: "entity",
            entity: {
                name: "gdn_blog_post",
                labelProperty: "title",
                valueProperty: "id",
                multiple: true
            }
        }
    },
    slots: []
});