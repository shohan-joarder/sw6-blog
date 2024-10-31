import template from './sw-cms-preview-latest-blogs.html.twig';
import './sw-cms-preview-latest-blogs.scss';

Shopware.Component.register('sw-cms-preview-latest-blogs', {
    template,
    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    }
});