<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Log\Package;
use Shopware\Core\Framework\Migration\MigrationStep;

/**
 * @internal
 */
#[Package('core')]
class Migration1730111154add_created_atgdn_blog_post_tag extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1730111154;
    }

    public function update(Connection $connection): void
    {
            $query = <<<SQL
                SELECT COUNT(*) AS columnExists 
                FROM information_schema.columns 
                WHERE table_schema = DATABASE() 
                AND table_name = 'gdn_blog_post_gdn_blog_category' 
                AND column_name = 'created_at'
            SQL;
            
            $columnExists = $connection->fetchOne($query);
            
            if ($columnExists == 0) {
                $query = <<<SQL
                    ALTER TABLE `gdn_blog_post_gdn_blog_category` ADD COLUMN `created_at` DATETIME(3) NULL
                SQL;
            
                $connection->executeStatement($query);
            }
            $query = <<<SQL
                SELECT COUNT(*) AS columnExists 
                FROM information_schema.columns 
                WHERE table_schema = DATABASE() 
                AND table_name = 'gdn_blog_post_gdn_blog_category' 
                AND column_name = 'updated_at'
            SQL;
            
            $columnExists = $connection->fetchOne($query);
            
            if ($columnExists == 0) {
                $query = <<<SQL
                    ALTER TABLE `gdn_blog_post_gdn_blog_category` ADD COLUMN `updated_at` DATETIME(3) NULL
                SQL;
            
                $connection->executeStatement($query);
            }
    }
}
