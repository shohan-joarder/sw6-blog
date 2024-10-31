<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Storefront\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Shopware\Storefront\Page\GenericPageLoaderInterface;
use Shopware\Storefront\Controller\StorefrontController;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Core\System\SystemConfig\SystemConfigService;

use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;

use Shopware\Core\Content\Media\MediaService;


#[Route(defaults: ['_routeScope' => ['storefront']])]
class BlogController extends StorefrontController
{
    private GenericPageLoaderInterface $genericPageLoader;
    private SystemConfigService $systemConfigService;
    private EntityRepository $blogRepository;
    private EntityRepository $categoryRepository;
    private EntityRepository $authorRepository;
    private MediaService $mediaService;

    public function __construct(GenericPageLoaderInterface $genericPageLoader,SystemConfigService $systemConfigService,EntityRepository $blogRepository,EntityRepository $categoryRepository,EntityRepository $authorRepository,MediaService $mediaService)
    {
        $this->genericPageLoader = $genericPageLoader;
        $this->systemConfigService = $systemConfigService;
        $this->blogRepository = $blogRepository;
        $this->categoryRepository = $categoryRepository;
        $this->authorRepository = $authorRepository;
        $this->mediaService = $mediaService;
    }

    #[Route(
        path: '/blog',
        name: 'frontend.blog',
        methods: ['GET']
    )]
    public function allBlogs(Request $request, SalesChannelContext $context): Response
    {
        // dd($this->systemConfigService);

        // $pluginConfig = $this->systemConfigService->get('GdnBlog.config.Banner');
        // if (!$pluginConfig) {
        //     return null;
        // }
    
        // $criteria2 = new Criteria([$pluginConfig]);
        // $banner = $this->mediaService->search($criteria2, $context)->first();

        // dd($banner);

        $pageTitle = $this->systemConfigService->get("GdnBlog.config.pagetitle");
        $itemPerPage = $this->systemConfigService->get('GdnGdnBlog.config.itemPerPage');
        $shortDescription = $this->systemConfigService->get('GdnBlog.config.shortDescription');
        $description = $this->systemConfigService->get('GdnBlog.config.description');

        $metaTitle = $this->systemConfigService->get('GdnGdnBlog.config.metaTitle');
        $metaDescription = $this->systemConfigService->get('GdnGdnBlog.config.metaDescription');
        $metaKeywards = $this->systemConfigService->get('GdnGdnBlog.config.metaKeywards');


        $page = $this->genericPageLoader->load($request, $context,1);
        // Get page and limit from request parameters
        $page = (int) $request->query->get('page', 1); // Default to page 1
        $limit = (int) $request->query->get('limit', 12); // Default limit to 12

        // Create criteria to fetch all blog entries
        $criteria = new Criteria();
        $criteria->addAssociation('media'); // Assuming 'media' is the correct association for blog posts
        $criteria->addAssociation('postAuthor.media'); // Include media for postAuthor
        $criteria->setLimit($limit); // Limit results
        $criteria->setOffset(($page - 1) * $limit); // Calculate offset based on page number

        // Fetch all blog entries from the repository
        $blogEntities = $this->blogRepository->search($criteria, $context->getContext());

        // Create a criteria for fetching categories
        $categoryCriteria = new Criteria();
        $categoryCriteria->setLimit(100); // Adjust this limit if needed
        $categories = $this->categoryRepository->search($categoryCriteria, $context->getContext());

        // Extract unique categories
        $uniqueCategories = [];
        foreach ($categories->getEntities() as $category) {
            if (!isset($uniqueCategories[$category->getId()])) {
                $uniqueCategories[$category->getId()] = [
                    'id' => $category->getId(),
                    'name' => $category->getName(),
                    'slug' => $category->getSlug(),
                ];
            }
        }
        
        // Prepare blog data
        $blogs = [];
        foreach ($blogEntities->getEntities() as $blog) {
            // dd($blog->getShortDescription());
            $blogs[] = [
                'id' => $blog->getId(),
                'title' => $blog->getTitle(),
                'slug' => $blog->getSlug(),
                'publishedAt' => $blog->getPublishedAt(),
                'media' => $blog->media ? [
                        'id' => $blog->media->getId(),
                        'url' => $blog->media->getUrl(),
                    ] : null,
                'short_description' => $blog->getShortDescription(),
                'postAuthor' => [
                    'name' => $blog->postAuthor->getName(),
                    'media' => $blog->postAuthor->media ? [
                        'id' => $blog->postAuthor->media->getId(),
                        'url' => $blog->postAuthor->media->getUrl(),
                    ] : null,
                ],
            ];
        }

        return $this->renderStorefront('@GdnGdnblog/storefront/page/blogs.html.twig', [
            'title' => $pageTitle,
            'page' =>$page,
            'blogs'=>$blogs,
            'page_info'=>[
                "shortDescription"=>$shortDescription,
                "description"=>$description
            ],
            'categories'=>$uniqueCategories
        ]);

        // Return the results with unique categories and blog data
        // return new JsonResponse([
        //     'blogs' => $blogs,
        //     'uniqueCategories' => array_values($uniqueCategories),
        //     'currentPage' => $page,
        //     'totalBlogs' => $blogEntities->getTotal(),
        //     'totalPages' => ceil($blogEntities->getTotal() / $limit), // Calculate total pages
        // ]);

    }

}