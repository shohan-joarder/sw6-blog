import './page/blog-author-list';
import './page/blog-author-create';

import deDE from './../../snippet/de-DE.json';
import enGB from './../../snippet/en-GB.json';

Shopware.Module.register('blog-author', {
    type: 'plugin',
    name: 'blog-author',
    title: 'blog-author.general.title',
    description: 'blog-author.general.description',
    color: '#ff3d58',
    entity: 'gdn_blog_author',
    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },
    routes: {
        list: {
            component: 'blog-author-list',
            path: 'list'
        },
        create: {
            component: 'blog-author-create',
            path: 'create/:id?',
            meta: {
                parentPath: 'blog.author.list'
            }
        }
    }
});
