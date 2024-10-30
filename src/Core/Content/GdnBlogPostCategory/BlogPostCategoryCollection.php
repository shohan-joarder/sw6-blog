<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Core\Content\GdnBlogPostCategory;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

class BlogPostCategoryCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return BlogPostCategoryEntity::class;
    }
}
