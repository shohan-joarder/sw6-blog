(()=>{let t;let e=document.querySelectorAll(".table_content_area > ul > li");e.forEach(t=>{t.addEventListener("click",function(){e.forEach(t=>{t.classList.remove("active_content")}),this.classList.add("active_content")})}),document.addEventListener("DOMContentLoaded",function(){let t=document.querySelectorAll(".latestBlogItems"),e=async()=>{try{let e=await fetch("/latest-blog",{method:"GET",headers:{"Content-Type":"application/json"}}),n=e.status;if(e.ok){let n=await e.json();if(n.latest_blogs){let e="<div class='row'>";n.latest_blogs.map(t=>{e+='\n                            <div class="col-lg-4 col-md-6 ">\n\n                                <a href="'.concat(t.details_url,'" style="text-decoration: none;">\n\n                                    <div class="blog-card">\n                                        <div class="cardImage">\n                                            <img src="').concat(null!=t.media?t.media.url:"https://placehold.co/1000x670",'" class="card-img-top" alt="').concat(t.title,'">\n                                        </div>\n                                        <div >\n                                            <div class="date_area d-flex align-items-center flex-wrap">\n\n                                                <div class="d-flex align-items-center flex-wrap gap-2">\n                                                ').concat(null!=t.postAuthor.media?'<img src="'.concat(t.postAuthor.media.url,'"   class="user_icon"></img>'):"","\n                                                <h5> ").concat(t.postAuthor.name,'</h5>\n                                            </div>\n                                                <div class="d-flex align-items-center flex-wrap gap-2">\n                                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" currentColor="#B30505">\n                                                        <path d="M19.5 3.95679H4.5C4.08579 3.95679 3.75 4.29257 3.75 4.70679V19.7068C3.75 20.121 4.08579 20.4568 4.5 20.4568H19.5C19.9142 20.4568 20.25 20.121 20.25 19.7068V4.70679C20.25 4.29257 19.9142 3.95679 19.5 3.95679Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n                                                        <path d="M16.5 2.45679V5.45679" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n                                                        <path d="M7.5 2.45679V5.45679" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n                                                        <path d="M3.75 8.45679H20.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n                                                    </svg>\n\n                                                    <h5>').concat(t.publishedAt,'</h5>\n                                                </div>\n\n                                            </div>\n                                            <div class="content_area">\n                                                <h3>').concat(t.title,"</h3>\n                                                <p >\n                                                    ").concat(t.short_description,'\n                                                </p>\n                                            </div>\n\n                                        </div>                            \n                                        <button class="red_more_btn"> <span>READ MORE</span> <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" currentColor="#B30505">\n                                                <path d="M3.125 10.2068H16.875" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n                                                <path d="M11.25 4.58179L16.875 10.2068L11.25 15.8318" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n                                            </svg>\n                                        </button>\n                                    </div>\n                                </a>\n                            </div>')}),e+="</div>",t.forEach(t=>{t.innerHTML=e})}}else console.error("Failed to fetch latest blogs. Status: ".concat(n))}catch(t){console.error("Error fetching latest blogs:",t)}};t.length>0&&e()}),document.getElementsByName("search").forEach(e=>{e.addEventListener("keyup",function(){clearTimeout(t),t=setTimeout(async()=>{let t=this.value,e=await fetch("/search-blog",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({searchTerm:t})}),{count:n,sarch_url:o}=await e.json();n>0&&document.querySelectorAll(".search-suggest-no-result").forEach(t=>{t.remove()}),document.querySelectorAll(".blogResult").forEach(t=>t.remove());let r=document.querySelector(".search-suggest-container");n>0&&r&&r.insertAdjacentHTML("beforeend",'\n                    <li class="js-result search-suggest-total blogResult">\n                        <div class="row align-items-center g-0">\n                            <div class="col">\n                                <a href="'.concat(n>0?o:"#",'" title="Show all search results" class="search-suggest-total-link">\n                                <span class="icon icon-arrow-head-right icon-sm">\n                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24"><defs><path id="icons-default-arrow-head-right" d="m11.5 7.9142 10.2929 10.293c.3905.3904 1.0237.3904 1.4142 0 .3905-.3906.3905-1.0238 0-1.4143l-11-11c-.3905-.3905-1.0237-.3905-1.4142 0l-11 11c-.3905.3905-.3905 1.0237 0 1.4142.3905.3905 1.0237.3905 1.4142 0L11.5 7.9142z"></path></defs><use transform="rotate(90 11.5 12)" xlink:href="#icons-default-arrow-head-right" fill="#758CA3" fill-rule="evenodd"></use></svg>\n                                </span>\n                                    ').concat(n>0?"Show blog search result":"No blog found",' \n                                </a>\n                            </div>\n                            <div class="col-auto search-suggest-total-count">\n                                ').concat(n," Result\n                            </div>\n                        </div>\n                    </li>\n                "))},500)}),e.addEventListener("keydown",function(){clearTimeout(t)})}),document.querySelectorAll(".product_img_primary").forEach(t=>{t.addEventListener("mouseover",function(){let e=this.getAttribute("src"),n=this.getAttribute("data-src");n&&this.setAttribute("src",n),t.addEventListener("mouseout",function(){this.setAttribute("src",e)})})})})();