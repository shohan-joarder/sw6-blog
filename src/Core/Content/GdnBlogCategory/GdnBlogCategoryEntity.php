<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Core\Content\GdnBlogCategory;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;

class GdnBlogCategoryEntity extends Entity
{
    use EntityIdTrait;

    protected ?string $name;

    protected ?string $slug;

    protected ?string $shortDescription;

    protected ?string $description;

    protected bool $active;

    protected ?string $metaTitle;

    protected ?string $metaDescription;

    protected ?string $metaKeywords;

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(?string $slug): void
    {
        $this->slug = $slug;
    }

    public function getShortDescription(): ?string
    {
        return $this->shortDescription;
    }

    public function setShortDescription(?string $shortDescription): void
    {
        $this->short_description = $shortDescription;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
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
}
