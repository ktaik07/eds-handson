// Function to fetch and return the title of a given URL.
const getPageTitle = async (url) => {
  // Fetch the content of the URL.
  const resp = await fetch(url);
  // If the response is successful (status code in the 200-299 range).
  if (resp.ok) {
    // Create a new <div> element.
    const html = document.createElement("div");
    // Insert the fetched content into the <div>.
    html.innerHTML = await resp.text();
    // Return the text inside the <title> element from the fetched content.
    return html.querySelector("title").innerText;
  }
  // If fetching was not successful, return an empty string.
  return "";
};

// Function to fetch all paths of the current URL except the current one.
const getAllPathsExceptCurrent = async (paths) => {
  const result = [];
  // remove first and last slash characters
  const pathsList = paths.replace(/^\/|\/$/g, "").split("/");
  for (let i = 0; i < pathsList.length - 1; i += 1) {
    const pathPart = pathsList[i];
    const prevPath = result[i - 1] ? result[i - 1].path : "";
    const path = `${prevPath}/${pathPart}`;
    const url = `${window.location.origin}${path}`;
    // Fetch the title of the path.
    /* eslint-disable-next-line no-await-in-loop */
    const name = await getPageTitle(url);
    // If the title exists, push the path data to the result.
    if (name) {
      result.push({ path, name, url });
    }
  }
  return result;
};

// Function to create an anchor element for a given path.
const createLink = (path) => {
  const pathLink = document.createElement("a");
  pathLink.href = path.url;
  pathLink.innerText = path.name;
  return pathLink;
};

// Main function to decorate a given block with a breadcrumb.
export default async function decorate(block) {
  // Create a <nav> element for the breadcrumb.
  const breadcrumb = document.createElement("nav", "", {
    "aria-label": "Breadcrumb",
  });
  // Clear the inner HTML of the given block.
  block.innerHTML = "";
  // Create a link for the home page.
  const HomeLink = createLink({
    path: "",
    name: "Home",
    url: window.location.origin,
  });
  // Initialize an array for breadcrumb links starting with the home link
  const breadcrumbLinks = [HomeLink.outerHTML];

  // Delay the execution by 1000ms (1 second).
  window.setTimeout(async () => {
    // Get the current path from the window location.
    const path = window.location.pathname;
    // Get all paths except the current one.
    const paths = await getAllPathsExceptCurrent(path);

    // Loop through each path and create a link for it.
    paths.forEach((pathPart) =>
      breadcrumbLinks.push(createLink(pathPart).outerHTML)
    );
    // Create a <span> for the current path using the page's title.
    const currentPath = document.createElement("span");
    currentPath.innerText = document.querySelector("title").innerText;
    // Add the current path to the breadcrumb links.
    breadcrumbLinks.push(currentPath.outerHTML);

    // Set the inner HTML of the breadcrumb element by joining the links with a separator.
    breadcrumb.innerHTML = breadcrumbLinks.join(
      '<span class="breadcrumb-separator">&#10095;</span>'
    );
    block.append(breadcrumb);
  }, 1000);
}
