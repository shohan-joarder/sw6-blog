<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Core\Content\GdnBlogPost;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;

class GdnBlogPostEntity extends Entity
{
    use EntityIdTrait;

    protected ?string $title;

    protected ?string $slug;

    protected ?string $shortDescription;

    protected ?string $description;

    protected ?\DateTimeInterface $publishedAt;

    protected bool $active;

    protected ?string $metaTitle;

    protected ?string $metaDescription;

    protected ?string $metaKeywords;

    protected ?array $tags = null;

    protected ?array $tagsName = null;

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): void
    {
        $this->title = $title;
    }

    public function getslug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(?string $slug): void
    {
        $this->slug = $slug;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function getShortDescription(): ?string
    {
        return $this->shortDescription;
    }

    public function setShortDescription(?string $shortDescription): void
    {
        $this->short_description = $shortDescription;
    }

    public function getPublishedAt(): ?string
    {
        return $this->published_at;
    }

    public function setPublishedAt(?string $publishedAt): void
    {
        $this->published_at = $publishedAt;
    }

    public function isActive(): bool
    {
        return $this->active;
    }

    public function setActive(bool $active): void
    {
        $this->active = $active;
    }

    public function getMetaTitle(): ?string
    {
        return $this->meta_title;
    }

    public function setMetaTitle(?string $metaTitle): void
    {
        $this->meta_title = $metaTitle;
    }

    public function getMetaDescription(): ?string
    {
        return $this->meta_description;
    }

    public function setMetaDescription(?string $metaDescription): void
    {
        $this->meta_description = $metaDescription;
    }
    public function getMetaKeywords(): ?string
    {
        return $this->meta_keywords;
    }

    public function setMetaKeywords(?string $metaKeywords): void
    {
        $this->meta_keywords = $metaKeywords;
    }

    public function getTags(): ?array
    {
        return $this->tags;
    }

    public function setTags(?array $tags): void
    {
        $this->tags = $tags;
    }
    public function getTagsName(): ?array
    {
        return $this->tags_name;
    }

    public function setTagsName(?array $tagsName): void
    {
        $this->tags_name = $tagsName;
    }
}
