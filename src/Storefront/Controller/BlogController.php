<?php declare(strict_types=1);

namespace Gdn\GdnBlog\Storefront\Controller;

use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Storefront\Controller\StorefrontController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Symfony\Component\HttpFoundation\JsonResponse;

#[Route(defaults: ['_routeScope' => ['storefront']])]
class BlogController extends StorefrontController
{
    private EntityRepository $blogRepository;
    private EntityRepository $categoryRepository;
    private EntityRepository $authorRepository;

    public function __construct(EntityRepository $blogRepository,EntityRepository $categoryRepository,EntityRepository $authorRepository)
    {
        $this->blogRepository = $blogRepository;
        $this->categoryRepository = $categoryRepository;
        $this->authorRepository = $authorRepository;
    }

    #[Route(
        path: '/blog',
        name: 'frontend.blog',
        methods: ['GET']
    )]
    public function allBlogs(Request $request, SalesChannelContext $context): Response
    {
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

        // Return the results with unique categories and blog data
        return new JsonResponse([
            'blogs' => $blogs,
            'uniqueCategories' => array_values($uniqueCategories),
            'currentPage' => $page,
            'totalBlogs' => $blogEntities->getTotal(),
            'totalPages' => ceil($blogEntities->getTotal() / $limit), // Calculate total pages
        ]);

    }

}