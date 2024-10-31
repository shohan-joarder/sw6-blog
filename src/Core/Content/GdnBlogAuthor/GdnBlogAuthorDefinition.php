<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Core\Content\GdnBlogAuthor;

use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Field\BoolField;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\LongTextField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;

use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;

class GdnBlogAuthorDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'gdn_blog_author';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string
    {
        return GdnBlogAuthorEntity::class;
    }

    public function getCollectionClass(): string
    {
        return GdnBlogAuthorCollection::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new Required(), new PrimaryKey()),
            (new StringField('name', 'name')),
            (new LongTextField('description', 'description')),
            (new BoolField('active', 'active')),
            (new FkField('media_id', 'mediaId', MediaDefinition::class)),
            (new ManyToOneAssociationField('media', 'media_id', MediaDefinition::class, 'id', false))
        ]);
    }
}
