<?php
namespace Gdn\GdnBlog\Core\Content\GdnBlogPostCategory;


use Shopware\Core\Framework\DataAbstractionLayer\Field\CreatedAtField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\MappingEntityDefinition;

use Gdn\GdnBlog\Core\Content\GdnBlogPost\GdnBlogPostDefinition;
use Gdn\GdnBlog\Core\Content\GdnBlogCategory\GdnBlogCategoryDefinition;

class BlogPostCategoryDefinition extends MappingEntityDefinition
{
    public const ENTITY_NAME = 'gdn_blog_post_gdn_blog_category';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    // public function getCollectionClass(): string
    // {
    //     return BlogPostCategoryCollection::class;
    // }

    // public function getEntityClass(): string
    // {
    //     return BlogPostCategoryEntity::class;
    // }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([

            (new FkField('blog_id', 'blogId', GdnBlogPostDefinition::class))->addFlags(new PrimaryKey(), new Required()),
            (new FkField('category_id', 'categoryId', GdnBlogCategoryDefinition::class))->addFlags(new PrimaryKey(), new Required()),
            new ManyToOneAssociationField('blog', 'blog_id', GdnBlogPostDefinition::class, 'id'),
            new ManyToOneAssociationField('category', 'category_id', GdnBlogCategoryDefinition::class, 'id')

        ]);
    }
}
