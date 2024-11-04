// // // Import all necessary Storefront plugins
// // import ExamplePlugin from './example-plugin/example-plugin.plugin';

// // // Register your plugin via the existing PluginManager
// // const PluginManager = window.PluginManager;

// // PluginManager.register('ExamplePlugin', ExamplePlugin, '[data-example-plugin]');
// const editorContent = document.getElementById('content').innerHTML; // Get the content from the editor

// // Create a temporary element to parse the HTML
// const tempDiv = document.createElement('div');
// tempDiv.innerHTML = editorContent;

// // Select all headings
// const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
// const toc = [];

// headings.forEach((heading) => {
//     const id = heading.textContent.toLowerCase().replace(/\s+/g, '-'); // Create an ID for the heading
//     heading.setAttribute('id', id); // Set the ID on the heading for linking
//     toc.push({ text: heading.textContent, id });
// });

// const tocContainer = document.getElementById('toc'); // Assuming you have a div with this ID in your HTML
// tocContainer.innerHTML = ''; // Clear previous TOC content

// console.log(toc);

// toc.forEach((item) => {
//     const link = document.createElement('a');
//     link.href = `#${item.id}`;
//     link.textContent = item.text;
//     tocContainer.appendChild(link);
// });