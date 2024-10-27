<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Core\Content\GdnBlogCategory;

use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Field\BoolField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;

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
            (new StringField('description', 'description')),
            (new BoolField('active', 'active'))
        ]);
    }
}
