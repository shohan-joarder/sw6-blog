<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Core\Content\Example\SalesChannel;

use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\Routing\Annotation\RouteScope;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Shopware\Core\Framework\Api\Controller\ApiController;

#[Route(defaults: ['_routeScope' => ['api']])]
class CustomApiRoute extends ApiController
{

    #[Route(
        path: 'api/gdn-blog-post-gdn',
        name: 'api.blog-post-category',
        methods: ["DELETE"]
    )]
    public function getCustomData()
    {
        // dd($blog_category_id);
        $data = [
            'id' => 1,
            'name' => 'Sample Data',
            'description' => 'This is sample data returned by the API'
        ];

        return new JsonResponse($data);
    }

}