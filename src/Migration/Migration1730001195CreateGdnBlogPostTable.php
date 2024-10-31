<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1730001195CreateGdnBlogPostTable extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1730001195;
    }

    public function update(Connection $connection): void
    {
        $sql = <<<SQL
        CREATE TABLE IF NOT EXISTS `gdn_blog_post` (
            `id` BINARY(16) NOT NULL,
            `media_id` BINARY(16) NULL,
            `author_id` BINARY(16) NULL,
            `title` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
            `slug` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
            `short_description` MEDIUMTEXT COLLATE utf8mb4_unicode_ci NULL,
            `description` MEDIUMTEXT COLLATE utf8mb4_unicode_ci NULL,
            `active` TINYINT(1) NOT NULL,
            `published_at` TIMESTAMP NULL,
            `meta_title` VARCHAR(255) COLLATE utf8mb4_unicode_ci NULL,
            `meta_description` MEDIUMTEXT COLLATE utf8mb4_unicode_ci NULL,
            `meta_keywords` MEDIUMTEXT COLLATE utf8mb4_unicode_ci NULL,
            `created_at` DATETIME(3) NOT NULL,
            `updated_at` DATETIME(3) NULL,
            PRIMARY KEY (`id`)
        )
        ENGINE = InnoDB
        DEFAULT CHARSET = utf8mb4
        COLLATE = utf8mb4_unicode_ci;
        SQL;

        $connection->executeStatement($sql);
    }

    public function updateDestructive(Connection $connection): void
    {
    }
}
