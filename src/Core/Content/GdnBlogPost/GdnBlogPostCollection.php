<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Core\Content\GdnBlogPost;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void add(GdnBlogPostEntity $entity)
 * @method void set(string $key, GdnBlogPostEntity $entity)
 * @method GdnBlogPostEntity[] getIterator()
 * @method GdnBlogPostEntity[] getElements()
 * @method GdnBlogPostEntity|null get(string $key)
 * @method GdnBlogPostEntity|null first()
 * @method GdnBlogPostEntity|null last()
 */
class GdnBlogPostCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return GdnBlogPostEntity::class;
    }
}
