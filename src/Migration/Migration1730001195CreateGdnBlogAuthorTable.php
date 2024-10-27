<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1730001195CreateGdnBlogAuthorTable extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1730001195;
    }

    public function update(Connection $connection): void
    {
        $sql = <<<SQL
CREATE TABLE IF NOT EXISTS `gdn_blog_author` (
    `id` BINARY(16) NOT NULL,
    `media_id` BINARY(16) NULL,
    `name` VARCHAR(255) COLLATE utf8mb4_unicode_ci,
    `description` MEDIUMTEXT NULL,
    `active` TINYINT(1) COLLATE utf8mb4_unicode_ci,
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
