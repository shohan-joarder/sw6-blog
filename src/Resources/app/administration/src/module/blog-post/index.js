import './page/blog-post-list';
import './page/blog-post-create';

const { Module } = Shopware;

// Register the module for your blog entity
Module.register('blog-post', {
    type: 'plugin',
    name: 'blog-post',
    title: 'blog.post.list', // This refers to the translation key
    description: 'blog.post.description', // This also refers to a translation key
    color: '#ff3d58',
    entity: 'gdn_blog_post', // Ensure this matches your entity definition

    routes: {
        list: {
            component: 'blog-post-list',
            path: 'list'
        },
        create: {
            component: 'blog-post-create',
            path: 'create',
            meta: {
                parentPath: 'blog.post.list'
            }
        }
    },

    navigation: [
        {
            id: 'blog-post-list',
            label: 'blog-post.general.title',
            color: '#ff3d58',
            path: 'blog.post.list',
            icon: 'default-shopping-paper-bag-product',
            parent: 'sw-content',
            position: 100
        }
    ]
});