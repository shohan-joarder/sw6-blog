<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Core\Content\GdnBlogCategory;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void add(GdnBlogCategoryEntity $entity)
 * @method void set(string $key, GdnBlogCategoryEntity $entity)
 * @method GdnBlogCategoryEntity[] getIterator()
 * @method GdnBlogCategoryEntity[] getElements()
 * @method GdnBlogCategoryEntity|null get(string $key)
 * @method GdnBlogCategoryEntity|null first()
 * @method GdnBlogCategoryEntity|null last()
 */
class GdnBlogCategoryCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return GdnBlogCategoryEntity::class;
    }
}
