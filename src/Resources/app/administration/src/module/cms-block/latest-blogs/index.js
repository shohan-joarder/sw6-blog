import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'latest-blogs',
    category: 'text-image',
    label: 'Latest Blogs',
    component: 'sw-cms-block-latest-blogs',
    previewComponent: 'sw-cms-preview-latest-blogs',
    configComponent: 'sw-cms-block-latest-blogs',
    defaultConfig: {
        numberOfPosts: {
            source: 'static',
            value: 5
        }
    },
    slots: {
        content: {
            type: 'sw-cms-block-latest-blogs',
        },
    },
});