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
        // if (link) {
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

const searchElements = document.getElementsByName("search");
let typingTimer;                // Timer identifier
const doneTypingInterval = 500; // Time in milliseconds (1 second)

searchElements.forEach(element => {
    element.addEventListener("keyup", function() {
       
        clearTimeout(typingTimer);  // Clear the previous timer on each keystroke
        typingTimer = setTimeout(async () => {
            
            const searchValue = this.value;

            const response = await fetch(`/search-blog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    searchTerm: searchValue
                })
            });

            const {count,sarch_url} = await response.json();

            count > 0 && document.querySelectorAll('.search-suggest-no-result').forEach(element => {
                element.remove();
            });
            document.querySelectorAll('.blogResult').forEach(element => element.remove());
            const searchSuggestionContainer = document.querySelector(".search-suggest-container");
            
            if (count > 0 && searchSuggestionContainer) {
                searchSuggestionContainer.insertAdjacentHTML('beforeend', `
                    <li class="js-result search-suggest-total blogResult">
                        <div class="row align-items-center g-0">
                            <div class="col">
                                <a href="${count > 0 ? sarch_url : "#"}" title="Show all search results" class="search-suggest-total-link">
                                <span class="icon icon-arrow-head-right icon-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24"><defs><path id="icons-default-arrow-head-right" d="m11.5 7.9142 10.2929 10.293c.3905.3904 1.0237.3904 1.4142 0 .3905-.3906.3905-1.0238 0-1.4143l-11-11c-.3905-.3905-1.0237-.3905-1.4142 0l-11 11c-.3905.3905-.3905 1.0237 0 1.4142.3905.3905 1.0237.3905 1.4142 0L11.5 7.9142z"></path></defs><use transform="rotate(90 11.5 12)" xlink:href="#icons-default-arrow-head-right" fill="#758CA3" fill-rule="evenodd"></use></svg>
                                </span>
                                    ${count > 0 ? "Show blog search result" : "No blog found"} 
                                </a>
                            </div>
                            <div class="col-auto search-suggest-total-count">
                                ${count} Result
                            </div>
                        </div>
                    </li>
                `);
            }

        }, doneTypingInterval);
    });

    element.addEventListener("keydown", function() {
        clearTimeout(typingTimer); // Clear the timer on key down to reset the delay
    });
});


const relatedProducts = document.querySelectorAll(".product_img_primary");

relatedProducts.forEach(item => {
    item.addEventListener("mouseover", function() {
      let primaryImage = this.getAttribute("src");
      let secondaryImage = this.getAttribute("data-src");
  
      if (secondaryImage) {
          // Set the src to the secondary image
          this.setAttribute("src", secondaryImage);
      }
  
      // Optionally, add an event listener to revert the image on mouseout
      item.addEventListener("mouseout", function() {
        this.setAttribute("src", primaryImage);
      });
    });
});
  