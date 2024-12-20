<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Core\Content\GdnBlogCategory;

use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Field\BoolField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\LongTextField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Gdn\GdnBlog\Core\Content\GdnBlogPost\GdnBlogPostDefinition;
class GdnBlogCategoryDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'gdn_blog_category';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string
    {
        return GdnBlogCategoryEntity::class;
    }

    public function getCollectionClass(): string
    {
        return GdnBlogCategoryCollection::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new Required(), new PrimaryKey()),
            (new StringField('name', 'name')),
            (new StringField('slug', 'slug')),
            (new LongTextField('short_description', 'shortDescription')),
            (new LongTextField('description', 'description')),
            (new BoolField('active', 'active')),
            (new StringField('meta_title', 'meta_title')),
            (new StringField('meta_description', 'meta_description')),
            (new StringField('meta_keywords', 'meta_keywords')),
            (new FkField('media_id', 'mediaId', MediaDefinition::class)),
            (new ManyToOneAssociationField('media', 'media_id', MediaDefinition::class, 'id', false)),
        ]);
    }
}
