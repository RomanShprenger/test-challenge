// Note: Please do not use JSDOM or any other external library/package (sorry)
/*
type Metadata = {
  url: string;
  siteName: string;
  title: string;
  description: string;
  keywords: string[];
  author: string;
};
*/

/**
 * Gets the URL, site name, title, description, keywords, and author info out of the <head> meta tags from a given html string.
 * 1. Get the URL from the <meta property="og:url"> tag.
 * 2. Get the site name from the <meta property="og:site_name"> tag.
 * 3. Get the title from the the <title> tag.
 * 4. Get the description from the <meta property="og:description"> tag or the <meta name="description"> tag.
 * 5. Get the keywords from the <meta name="keywords"> tag and split them into an array.
 * 6. Get the author from the <meta name="author"> tag.
 * If any of the above tags are missing or if the values are empty, then the corresponding value will be null.
 * @param html The complete HTML document text to parse
 * @returns A Metadata object with data from the HTML <head>
 */
export default function getMetadata(html) {
  const htmlElement = new DOMParser().parseFromString(html, "text/html");

  const elements = {
    url: htmlElement.querySelector("meta[property='og:url']"),
    siteName: htmlElement.querySelector("meta[property='og:site_name']"),
    title: htmlElement.querySelector("title"),
    description: htmlElement.querySelector("meta[property='og:description']") || htmlElement.querySelector("meta[name='description']"),
    keywords: htmlElement.querySelector("meta[name='keywords']"),
    author: htmlElement.querySelector("meta[name='author']"),
  }

  return {
    url: elements.url ? (elements.url.content || "") : null,
    siteName: elements.siteName ? (elements.siteName.content || "") : null,
    title: elements.title ? (elements.title.text || "") : null,
    description: elements.description ? (elements.description.content || "") : null,
    keywords: elements.keywords ? (elements.keywords.content ? elements.keywords.content.split(",") : []) : null,
    author: elements.author ? (elements.author.content || "") : null,
  };
}
