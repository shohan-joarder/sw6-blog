<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Core\Content\GdnBlogPost;

use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Field\BoolField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\JsonField;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\DateTimeField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;


use Gdn\GdnBlog\Core\Content\GdnBlogAuthor\GdnBlogAuthorDefinition;
use Gdn\GdnBlog\Core\Content\GdnBlogCategory\GdnBlogCategoryDefinition;
use Gdn\GdnBlog\Core\Content\GdnBlogPostCategory\BlogPostCategoryDefinition;

use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToManyAssociationField;


class GdnBlogPostDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'gdn_blog_post';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string
    {
        return GdnBlogPostEntity::class;
    }

    public function getCollectionClass(): string
    {
        return GdnBlogPostCollection::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new Required(), new PrimaryKey()),
            (new StringField('title', 'title')),
            (new StringField('slug', 'slug')),
            (new DateTimeField('published_at', 'publishedAt')),
            (new StringField('short_description', 'short_description')),
            (new StringField('description', 'description')),
            (new BoolField('active', 'active')),
            (new StringField('meta_title', 'meta_title')),
            (new StringField('meta_description', 'meta_description')),
            (new StringField('meta_keywords', 'meta_keywords')),
            (new JsonField('tags', 'tags')),
            (new JsonField('tags_name', 'tags_name')),
            (new FkField('media_id', 'mediaId', MediaDefinition::class)),
            (new ManyToOneAssociationField('media', 'media_id', MediaDefinition::class, 'id', false)),
            (new FkField('author_id', 'authorId', GdnBlogAuthorDefinition::class)),
            (new ManyToOneAssociationField('postAuthor', 'author_id', GdnBlogAuthorDefinition::class, 'id')),
            (new ManyToManyAssociationField('postCategories', GdnBlogCategoryDefinition::class, BlogPostCategoryDefinition::class, 'blog_id', 'category_id')),
            
        ]);
    }
}
