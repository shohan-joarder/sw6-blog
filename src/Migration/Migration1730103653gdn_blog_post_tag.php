<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Log\Package;
use Shopware\Core\Framework\Migration\MigrationStep;

/**
 * @internal
 */
#[Package('core')]
class Migration1730103653gdn_blog_post_tag extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1730103653;
    }

    public function update(Connection $connection): void
    {
        $sql = <<<SQL
            CREATE TABLE `gdn_blog_post_gdn_blog_category` (
                `blog_id` BINARY(16) NOT NULL,
                `category_id` BINARY(16) NOT NULL,
                PRIMARY KEY (`blog_id`, `category_id`),
                CONSTRAINT `fk_blog_id` FOREIGN KEY (`blog_id`) REFERENCES `gdn_blog_post` (`id`) ON DELETE CASCADE,
                CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `gdn_blog_category` (`id`) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        SQL;

        $connection->executeStatement($sql);
    }

    public function updateDestructive(Connection $connection): void
    {
        $connection->executeStatement('DROP TABLE IF EXISTS `gdn_blog_post`');
        $connection->executeStatement('DROP TABLE IF EXISTS `gdn_blog_category`');
    }
}
