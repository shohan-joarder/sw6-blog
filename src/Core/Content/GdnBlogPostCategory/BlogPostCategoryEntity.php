<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Core\Content\GdnBlogPostCategory;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;

class BlogPostCategoryEntity extends Entity
{
    protected string $blogId;
    protected string $categoryId;

    public function getBlogId(): string
    {
        return $this->blogId;
    }

    public function setBlogId(string $blogId): void
    {
        $this->blogId = $blogId;
    }

    public function getCategoryId(): string
    {
        return $this->categoryId;
    }

    public function setCategoryId(string $categoryId): void
    {
        $this->categoryId = $categoryId;
    }
}
