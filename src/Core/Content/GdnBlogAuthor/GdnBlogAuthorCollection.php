<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Core\Content\GdnBlogAuthor;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void add(GdnBlogAuthorEntity $entity)
 * @method void set(string $key, GdnBlogAuthorEntity $entity)
 * @method GdnBlogAuthorEntity[] getIterator()
 * @method GdnBlogAuthorEntity[] getElements()
 * @method GdnBlogAuthorEntity|null get(string $key)
 * @method GdnBlogAuthorEntity|null first()
 * @method GdnBlogAuthorEntity|null last()
 */
class GdnBlogAuthorCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return GdnBlogAuthorEntity::class;
    }
}
