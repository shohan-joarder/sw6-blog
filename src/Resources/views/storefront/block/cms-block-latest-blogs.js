import template from './__cms-block-latest-blogs.html.twig';

Shopware.Component.register('cms-block-latest-blogs', {
    template,
    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    }
});