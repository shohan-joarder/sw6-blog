//table of content list selection

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