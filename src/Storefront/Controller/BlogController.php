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
use Shopware\Core\Content\Product\ProductRepository;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter; 
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\NotFilter;  
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\InFilter; 
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\NotInFilter; 
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\RangeFilter;

use Shopware\Core\Framework\Context; 
use Symfony\Component\HttpFoundation\RedirectResponse;

use Shopware\Core\Content\Media\MediaService;
use Shopware\Core\Content\Product\ProductEntity;


#[Route(defaults: ['_routeScope' => ['storefront']])]
class BlogController extends StorefrontController
{
    private GenericPageLoaderInterface $genericPageLoader;
    private SystemConfigService $systemConfigService;
    private EntityRepository $blogRepository;
    private EntityRepository $categoryRepository;
    private EntityRepository $authorRepository;
    private MediaService $mediaService;
    private EntityRepository $productRepository;
    private EntityRepository $mediaRepository;

    public function __construct(GenericPageLoaderInterface $genericPageLoader,SystemConfigService $systemConfigService,EntityRepository $blogRepository,EntityRepository $categoryRepository,EntityRepository $authorRepository,MediaService $mediaService,EntityRepository $productRepository,EntityRepository $mediaRepository)
    {
        $this->genericPageLoader = $genericPageLoader;
        $this->systemConfigService = $systemConfigService;
        $this->blogRepository = $blogRepository;
        $this->categoryRepository = $categoryRepository;
        $this->authorRepository = $authorRepository;
        $this->mediaService = $mediaService;
        $this->productRepository = $productRepository;
        $this->mediaRepository = $mediaRepository;
    }

    #[Route(
        path: '/blogs/{category?}', 
        name: 'frontend.blog',
        methods: ['GET']
    )]
    public function allBlogs(Request $request, SalesChannelContext $context, ?string $category = null): Response
    {
        // Fetch configuration values
        $pageTitle = $this->systemConfigService->get("GdnBlog.config.pagetitle");
        $itemPerPage = (int) $this->systemConfigService->get('GdnBlog.config.itemPerPage');
        $shortDescription = $this->systemConfigService->get('GdnBlog.config.shortDescription');
        $description = $this->systemConfigService->get('GdnBlog.config.description');

        $metaTitle = $this->systemConfigService->get('GdnBlog.config.metaTitle');
        $metaDescription = $this->systemConfigService->get('GdnBlog.config.metaDescription');
        $metaKeywards = $this->systemConfigService->get('GdnBlog.config.metaKeywards');

        $pageInfo =  $this->genericPageLoader->load($request, $context);
        $meta =  $pageInfo->getMetaInformation();

        $banner = null;

        $mediaId = $this->systemConfigService->get('GdnBlog.config.Banner');

        if ($mediaId) {
            $mediaCriteria = new Criteria([$mediaId]);
            $media = $this->mediaRepository->search($mediaCriteria, $context->getContext())->first();
            if ($media) {
                // Get the media URL
                $banner = $media->getUrl();

            }
        }

        if($category){
            $findCategory = new Criteria();
            $findCategory->addAssociation('media');
            $findCategory->addFilter(new EqualsFilter('slug', $category));

            $getCategoryData = $this->categoryRepository->search($findCategory, $context->getContext())->first();

            // Redirect if no category data is found
            if (!$getCategoryData) {
                return $this->redirectToRoute('frontend.blog');
            }
            // dd($getCategoryData);
            // Retrieve the banner URL if media is associated
            $banner = $getCategoryData->media ? $getCategoryData->media->getUrl() : null;
            $metaTitle = $getCategoryData->getMetaTitle();
            $metaDescription = $getCategoryData->getMetaDescription();
            $metaKeywards = $getCategoryData->getMetaKeywords();

        }
        
        // meta info
        $metaTitle && $meta->setMetaTitle($metaTitle);
        $metaDescription && $meta->setMetaDescription($metaDescription);
        $metaKeywards && $meta->setMetaKeywords($metaKeywards);

        // Get current page number from request parameters
        $page = (int) $request->query->get('page', 1); // Default to page 1

        $itemPerPage = $itemPerPage ?? 9; // Default to 9 if not set

        // Calculate the offset for pagination
        $offset = ($page - 1) * $itemPerPage;

        // Create criteria to fetch all blog entries
        $criteria = new Criteria();
        $criteria->addAssociation('media');
        $criteria->addAssociation('postCategories');
        $criteria->addAssociation('postAuthor.media');
        $criteria->setLimit($itemPerPage);
        $criteria->setOffset($offset);
        $criteria->addFilter(new EqualsFilter('active', true)); 
        // Get the current date
        $currentDate = (new \DateTime())->format('Y-m-d H:i:s'); // Current date and time

        // Create a range filter for publishedAt
        $rangeFilter = new RangeFilter('publishedAt', [
            'lte' => $currentDate // 'lte' means less than or equal to
        ]);

        // Add the filter to criteria
        $criteria->addFilter($rangeFilter);

        // If a category is specified, filter blog posts by the selected category
        if ($category) {
            $criteria->addFilter(new EqualsFilter('postCategories.slug', $category));
        }

        // Fetch blog entries
        $blogEntities = $this->blogRepository->search($criteria, $context->getContext());


        // Create a separate criteria to count total blogs matching the category slug
        $countCriteria = new Criteria();
        if ($category) {
            $countCriteria->addFilter(new EqualsFilter('postCategories.slug', $category));
        }
        
        // Fetch total count of matching blogs
        $totalBlogs = $this->blogRepository->search($countCriteria, $context->getContext())->getTotal();

        // Calculate total pages and prepare pagination data
        $totalPages = (int) ceil($totalBlogs / $itemPerPage); // Calculate based on actual total blogs
        $paginationPages = array_fill(1, $totalPages, true); // Create an array for pagination

        // Fetch categories
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

        // Render the blog page with all the data
        return $this->renderStorefront('@GdnGdnblog/storefront/page/blogs.html.twig', [
            'title' => $pageTitle,
            'page' => $pageInfo,
            'blogs' => $blogs,
            'paginationPages' => $paginationPages,
            'page_info' => [
                "shortDescription" => $shortDescription,
                "description" => $description,
            ],
            'categories' => $uniqueCategories,
            'banner'=>$banner,
            'category_slug'=>$category
        ]);
    }

    #[Route(
        path: '/blog/{slug}', 
        name: 'frontend.blog.details',
        methods: ['GET']
    )]
    public function blogDetails(Request $request, SalesChannelContext $context, ?string $slug = null): Response
    {
        // Return a 404 response if no slug is provided
        if (!$slug) {
            return new RedirectResponse($this->generateUrl('frontend.blog'));
        }
        $pageInfo =  $this->genericPageLoader->load($request, $context,1);
        // Create criteria to fetch the blog post by slug
        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('slug', $slug));
        $criteria->addAssociation('media'); // Fetch associated media
        $criteria->addAssociation('postAuthor.media'); // Fetch author media
        $criteria->addAssociation('postCategories'); // Fetch associated categories
    
        // Fetch the blog entity based on the criteria
        $blogPost = $this->blogRepository->search($criteria, $context->getContext())->first();
    
        // Check if the blog post exists
        if (!$blogPost) {
            return new Response('Blog post not found.', Response::HTTP_NOT_FOUND);
        }

        // handle meta info
        $meta =  $pageInfo->getMetaInformation();
        $metaTitle = $blogPost->getMetaTitle();
        $metaDescription = $blogPost->getMetaDescription();
        $metaKeywards = $blogPost->getMetaKeywords();
        $metaTitle && $meta->setMetaTitle($metaTitle);
        $metaDescription && $meta->setMetaDescription($metaDescription);
        $metaKeywards && $meta->setMetaKeywords($metaKeywards);

        $relatedProducts =[];

        // Check if the request is secure (HTTPS)
        $scheme = $request->isSecure() ? 'https://' : 'http://';

        $shopUrl =  $request->getHost();
        $port = $request->getPort() != 80 ? $request->getPort() : ""; 
        $appUrl = $scheme .$shopUrl."/" . $port;

        foreach ($blogPost->getTags() as $tag) {
            if(count($relatedProducts) > 2){
                continue;
            }
            // Process each $tag here
            $getRelatedProduct = $this->getProductsByTag($tag,array_keys($relatedProducts),$context,$appUrl);
            // Merge the result into the $relatedProducts array
            $relatedProducts = array_merge($relatedProducts, $getRelatedProduct);
        }

        // Get the category IDs associated with the current blog post
        $categoryIds = $blogPost->postCategories->map(function ($category) {
            return $category->getId();
        });

        // Fetch related blogs for each category
        $relatedBlogs = [];
        foreach ($categoryIds as $categoryId) {
            if (count($relatedBlogs) > 9) {
                continue;
            }
            $relatedBlogs = array_merge($relatedBlogs, $this->getRelatedBlogsByCategory($categoryId, $context));
        }

        if (isset($relatedBlogs[$blogPost->getId()])) {
            unset($relatedBlogs[$blogPost->getId()]);
        }        

        // Prepare the blog details data
        $blogDetails = [
            'id' => $blogPost->getId(),
            'title' => $blogPost->getTitle(),
            'slug' => $blogPost->getSlug(),
            'publishedAt' => $blogPost->getPublishedAt(),
            'short_description' => $blogPost->getShortDescription(),
            'description' => $blogPost->getDescription(),
            'tags'=>$blogPost->getTags(),
            'tagsName'=>$blogPost->getTagsName(),
            'media' => $blogPost->media ? [
                'id' => $blogPost->media->getId(),
                'url' => $blogPost->media->getUrl(),
            ] : null,
            'postAuthor' => [
                'name' => $blogPost->postAuthor->getName(),
                'media' => $blogPost->postAuthor->media ? [
                    'id' => $blogPost->postAuthor->media->getId(),
                    'url' => $blogPost->postAuthor->media->getUrl(),
                ] : null,
            ],
            'categories' => $blogPost->postCategories? array_map(function ($category) {
                return [
                    'id' => $category->getId(),
                    'name' => $category->getName(),
                    'slug' => $category->getSlug(),
                ];
            }, $blogPost->postCategories ->getElements()) : [],

            "relatedProducts"=>$relatedProducts, 
            "relatedBlogs"=>$relatedBlogs
        ];

        // dd($appUrl);

        // Render the blog details template
        return $this->renderStorefront('@GdnGdnblog/storefront/page/blog_detail.html.twig', [
            'blog' => $blogDetails,
            'page' => $pageInfo
        ]);
    }
    
    private function getRelatedBlogsByCategory(string $categoryId, SalesChannelContext $salesChannelContext): array
    {
        $context = $salesChannelContext->getContext();
        $criteria = new Criteria();
    
        // Add associations for categories and media
        $criteria->addAssociation('postCategories');
        $criteria->addAssociation('postAuthor.media');
        $criteria->addAssociation('media');
        $criteria->addFilter(new EqualsFilter('active', true));
        // Get the current date
        $currentDate = (new \DateTime())->format('Y-m-d H:i:s'); // Current date and time

        // Create a range filter for publishedAt
        $rangeFilter = new RangeFilter('publishedAt', [
            'lte' => $currentDate // 'lte' means less than or equal to
        ]);
        // Add the filter to criteria
        $criteria->addFilter($rangeFilter);


        // Filter by the provided category ID
        $criteria->addFilter(new EqualsFilter('postCategories.id', $categoryId));
    
        // Set a limit for the number of blogs retrieved
        $criteria->setLimit(5); // Limit to 5 related blogs
    
        // Fetch the related blog posts from the repository
        $relatedBlogs = $this->blogRepository->search($criteria, $context);
    
        // Map the related blog entities to the desired structure
        return $relatedBlogs->getEntities()->map(function ($blogPost) {
            return [
                'id' => $blogPost->getId(),
                'title' => $blogPost->getTitle(),
                'slug' => $blogPost->getSlug(),
                'publishedAt' => $blogPost->getPublishedAt(),
                'short_description' => $blogPost->getShortDescription(),
                'media' => $blogPost->media ? [
                    'id' => $blogPost->media->getId(),
                    'url' => $blogPost->media->getUrl(),
                ] : null,
                'postAuthor' => [
                    'name' => $blogPost->postAuthor->getName(),
                    'media' => $blogPost->postAuthor->media ? [
                        'id' => $blogPost->postAuthor->media->getId(),
                        'url' => $blogPost->postAuthor->media->getUrl(),
                    ] : null,
                ],
            ];
        });
    }
    

    private function getProductsByTag(string $tagId, array $existingProductIds,SalesChannelContext $salesChannelContext,$appUrl): array
    {   
         // Retrieve the base Context from SalesChannelContext
        $context = $salesChannelContext->getContext();

        $criteria = new Criteria();
        $criteria->addAssociation('tags'); // Load tags association
        $criteria->addAssociation('seoUrls'); // Load SEO URLs association
        $criteria->addAssociation('media'); // Load SEO URLs association

        // Use InFilter to exclude existing products
        // Use NotFilter with InFilter to exclude existing products
        // if (!empty($existingProductIds)) {
        //     $criteria->addFilter(new NotFilter(NotFilter::CONNECTION_OR, [
        //         new NotInFilter('id', $existingProductIds)
        //     ]));
        // }


        $criteria->addFilter(new EqualsFilter('tags.id', $tagId)); // Filter by tag ID
        $criteria->setLimit(3); // Limit to 3 products

        // Use the base Context for the search
        $productEntities = $this->productRepository->search($criteria, $context)->getEntities();

        // Log for debugging
        if ($productEntities->count() === 0) {
            // Log that no products were found
            $this->logger->info('No products found for tag ID: ' . $tagId);
        }

        return $productEntities->map(function (ProductEntity $product) use ($salesChannelContext,$appUrl) {
            // Get the SEO URLs
            $seoUrls = $product->getSeoUrls();

            // Filter the SEO URLs for the current sales channel
            $url = $seoUrls->filter(function ($seoUrl) use ($salesChannelContext) {
                return $seoUrl->getSalesChannelId() === $salesChannelContext->getSalesChannelId();
            })->first();

            // Log for debugging
            if (!$url) {
                $this->logger->info('No SEO URL found for product ID: ' . $product->getId());
            }

            $firstItem = $product->getMedia()->first();
            return [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'media' => $firstItem->getMedia()->getUrl() ?? null,
                'price' => $product->getPrice()->first()->getGross(), // Example for price
                'url' => $url->seoPathInfo ? $appUrl . $url->seoPathInfo : '', // Get the URL if it exists
            ];
        });
    }

   

}