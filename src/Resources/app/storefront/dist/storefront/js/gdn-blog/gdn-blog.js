(()=>{let t=document.querySelectorAll(".table_content_area > ul > li");t.forEach(e=>{e.addEventListener("click",function(){t.forEach(t=>{t.classList.remove("active_content")}),this.classList.add("active_content")})})})();