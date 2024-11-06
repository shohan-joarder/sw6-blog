import template from './sw-cms-preview-shop-by-color.html.twig';
import "./../shopby-color.scss"

Shopware.Component.register('sw-cms-preview-shop-by-color', {
    template,
    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    }
});