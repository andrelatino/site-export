function publishPage(grid) {
  // Clone the grid element
  const clonedGrid = grid.cloneNode(true);

  // Remove all delete buttons from the cloned grid
  const deleteButtons = clonedGrid.querySelectorAll('.admin-buttons');
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].remove();
  }

  // Remove contenteditable attribute from all content
  const contentItems = clonedGrid.querySelectorAll('[contenteditable="true"]');
  for (let i = 0; i < contentItems.length; i++) {
    contentItems[i].removeAttribute('contenteditable');
  }

  // Create the HTML file
  const html = `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Add custom head content here -->
        <link rel="stylesheet" type="text/css" href="https://andrelatino.github.io/gridzy-css/gridzy.css">  
      </head>
      <body style="overflow-x:hidden;">
        <div class="page">      
          ${clonedGrid.innerHTML}
        </div>
        <footer>
            <!-- Footer content here -->
        </footer>
      </body>
    </html>
  `;

  // Generate a unique file name
  const fileName = `html-${generateHtmlId(10)}.html`;

  // Get the current user's username and access token
  const username = "andrelatino";
  const accessToken = "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";

  // Create a new commit with the HTML file
  fetch(`https://api.github.com/repos/${username}/${username}.github.io/contents/${fileName}`, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Added ${fileName}`,
      content: btoa(html),
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(`Created commit ${data.content.sha} for ${fileName} successfully.`);
  })
  .catch(error => {
    console.error(`Error creating commit for ${fileName}: ${error}`);
  });
}

function generateHtmlId() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    id += chars[randomIndex];
  }
  return "ID-" + id;
}
