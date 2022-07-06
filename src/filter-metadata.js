/*
type Metadata = {
  url: string | null;
  siteName: string | null;
  title: string | null;
  description: string | null;
  keywords: string[] | null;
  author: string | null;
};
*/

/**
 * Filters the given Metadata array to only include the objects that match the given search query.
 * If the search query has multiple words,
 * treat each word as a separate search term to filter by,
 * in addition to gathering results from the overall query.
 * If the search query has special characters,
 * run the query filter with the special characters removed.
 * Can return an empty array if no Metadata objects match the search query.
 * @param {Metadata[]} metadata - An array of Metadata objects
 * @param {string} query - The search query string
 * @returns {Metadata[]} - An array of Metadata objects that match the given search query
 */

function noSpecial(arr) {
  return arr.filter(item => item).map(item => {
    const str = Array.isArray(item) ? item.join(",") : item;
    return str.replace(/[^A-z\s\d][\\\^]?/g, "").toLowerCase();
  });
}

export default function filterMetadata(metadata, query) {
  // If metadata isn't array, it's not correct value or empty value, so return []
  if (!Array.isArray(metadata)) {
    return [];
  }
  // If query is empty, return all metadata
  if (!query) {
    return metadata;
  }

  // Break multiple words and remove special chars
  const noSpecialQuery = noSpecial(query.replace(/-/g, " ").split(" "));

  let filteredData = metadata.filter(dataItem => {
    const strDataItemValues = noSpecial(Object.values(dataItem)).join(" ");
    return noSpecialQuery.some(queryItem => strDataItemValues.indexOf(queryItem) > -1);
  });

  return filteredData;
}
