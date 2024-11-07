
const tableOfContentSelection = document.querySelectorAll(".table_content_area > ul > li");

// Iterate over each list item
tableOfContentSelection.forEach(item => {
    // Add a click event listener
    item.addEventListener('click', function() {
        // Remove 'active_content' class from all items
        tableOfContentSelection.forEach(i => {
            i.classList.remove('active_content');
        });

        // Find the anchor tag within the clicked item and get its href attribute
        // const link = this.querySelector("a");
        // if (link) {
        //     const hrefValue = link.getAttribute("href");
        //     console.log(hrefValue); // Log the href value
        // }

        // Add 'active_content' class to the clicked item
        this.classList.add('active_content');
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const latestBlogsSelector = document.querySelectorAll(".latestBlogItems");
    const loadLatestBlog = async () => {
        try {
            const response = await fetch(`/latest-blog`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}` // Uncomment this if you need to send a token
                },
            });
    
            const statusCode = response.status;
    
            if (response.ok) {
                // Parse the response body as JSON
                const data = await response.json();
    
                // Optionally handle the data further (e.g., display it on the page)
                if (data.latest_blogs) {
                    let blogItem = "<div class='row'>";
                    // Do something with the data
                    data.latest_blogs.map(blog=>{
                        blogItem +=`
                            <div class="col-lg-4 col-md-6 ">

                                <a href="${blog.details_url}" style="text-decoration: none;">

                                    <div class="blog-card">
                                        <div class="cardImage">
                                            <img src="${blog.media != null? blog.media.url :'https://placehold.co/1000x670'}" class="card-img-top" alt="${blog.title}">
                                        </div>
                                        <div >
                                            <div class="date_area d-flex align-items-center flex-wrap">

                                                <div class="d-flex align-items-center flex-wrap gap-2">
                                                ${blog.postAuthor.media != null ? `<img src="${blog.postAuthor.media.url}"   class="user_icon"></img>` : ""}
                                                <h5> ${ blog.postAuthor.name }</h5>
                                            </div>
                                                <div class="d-flex align-items-center flex-wrap gap-2">
                                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" currentColor="#B30505">
                                                        <path d="M19.5 3.95679H4.5C4.08579 3.95679 3.75 4.29257 3.75 4.70679V19.7068C3.75 20.121 4.08579 20.4568 4.5 20.4568H19.5C19.9142 20.4568 20.25 20.121 20.25 19.7068V4.70679C20.25 4.29257 19.9142 3.95679 19.5 3.95679Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M16.5 2.45679V5.45679" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M7.5 2.45679V5.45679" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path d="M3.75 8.45679H20.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>

                                                    <h5>${blog.publishedAt }</h5>
                                                </div>

                                            </div>
                                            <div class="content_area">
                                                <h3>${ blog.title }</h3>
                                                <p >
                                                    ${ blog.short_description }
                                                </p>
                                            </div>

                                        </div>                            
                                        <button class="red_more_btn"> <span>READ MORE</span> <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" currentColor="#B30505">
                                                <path d="M3.125 10.2068H16.875" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M11.25 4.58179L16.875 10.2068L11.25 15.8318" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                </a>
                            </div>` 
                    });

                    blogItem +="</div>";
                    latestBlogsSelector.forEach(element => {
                        element.innerHTML = blogItem;
                    });
                }
            } else {
                console.error(`Failed to fetch latest blogs. Status: ${statusCode}`);
            }
        } catch (error) {
            console.error('Error fetching latest blogs:', error);
        }
    }
    
    if(latestBlogsSelector.length > 0){

        loadLatestBlog();
    }

});