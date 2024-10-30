<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Log\Package;
use Shopware\Core\Framework\Migration\MigrationStep;

/**
 * @internal
 */
#[Package('core')]
class Migration1730185293AddTagOnBlog extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1730185293;
    }

    public function update(Connection $connection): void
    {
        $sql = <<<SQL
        CREATE TABLE `gdn_blog_post_tag` (
                `blog_id` BINARY(16) NOT NULL,
                `tag_id` BINARY(16) NOT NULL,
                `created_at` DATETIME(3) NULL,
                PRIMARY KEY (`blog_id`, `tag_id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        SQL;

        $connection->executeStatement($sql);
    }
}
