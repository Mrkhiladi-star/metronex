import Fuse from "fuse.js";
export function createFuzzySearch(list: string[]) {
  return new Fuse(list, {
    includeScore: true,
    threshold: 0.4, 
  });
}
export function fuzzyCorrect(fuse: Fuse<string>, input: string) {
  const result = fuse.search(input);
  if (result.length > 0) return result[0].item;
  return null;
}
