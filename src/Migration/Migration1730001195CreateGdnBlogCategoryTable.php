<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1730001195CreateGdnBlogCategoryTable extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1730001195;
    }

    public function update(Connection $connection): void
    {
        $sql = <<<SQL
CREATE TABLE IF NOT EXISTS `gdn_blog_category` (
    `id` BINARY(16) NOT NULL,
    `media_id` BINARY(16) NULL,
    `name` VARCHAR(255) COLLATE utf8mb4_unicode_ci,
    `slug` VARCHAR(255) NULL,
    `short_description` LONGTEXT NULL,
    `description` LONGTEXT NULL,
    `active` TINYINT(1) COLLATE utf8mb4_unicode_ci,
    `meta_title`        VARCHAR(255)  NULL,
    `meta_description`  LONGTEXT  NULL,
    `meta_keywords`     LONGTEXT  NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3),
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
