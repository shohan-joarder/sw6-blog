<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Log\Package;
use Shopware\Core\Framework\Migration\MigrationStep;

/**
 * @internal
 */
#[Package('core')]
class Migration1730187231AddTagOnBlog extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1730187231;
    }

    public function update(Connection $connection): void
    {
        $query = <<<SQL
            SELECT COUNT(*) AS columnExists 
            FROM information_schema.columns 
            WHERE table_schema = DATABASE() 
            AND table_name = 'gdn_blog_post' 
            AND column_name = 'tags'
        SQL;
        
        $columnExists = $connection->fetchOne($query);
        
        if ($columnExists == 0) {
            $query = <<<SQL
                ALTER TABLE `gdn_blog_post` ADD COLUMN `tags` JSON NULL
            SQL;
        
            $connection->executeStatement($query);
        }
    }
}
