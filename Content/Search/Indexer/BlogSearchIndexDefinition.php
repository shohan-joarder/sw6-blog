<?php
namespace Gdn\GdnBlog\Content\Search\Indexer;
use Shopware\Core\Content\Search\Indexer\SearchIndexDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;

class BlogSearchIndexDefinition extends SearchIndexDefinition
{
    public function getIndex(): string
    {
        return 'gdn_blog_post';
    }

    public function getProperties(): array
    {
        return [
            'title' => [
                'type' => 'text',
                'boost' => 2,
            ],
            'short_description' => [
                'type' => 'text',
            ],
            // Add other properties as needed
        ];
    }

    public function getDataSource(): string
    {
        return 'gdn_blog_post'; // Name of your blog post data source
    }
}
