import { StationDoc } from "./types";

export function bfsRoute(
  graph: StationDoc[],
  src: number,
  dest: number
) {
  const visited = new Set<number>();
  const parent: Record<number, number> = {};

  const queue: number[] = [src];
  visited.add(src);
  parent[src] = -1;

  while (queue.length > 0) {
    const x = queue.shift()!;
    if (x === dest) break;

    for (const edge of graph[x].nextStations) {
      const y = edge.stationIndex;
      if (!visited.has(y)) {
        visited.add(y);
        parent[y] = x;
        queue.push(y);
      }
    }
  }

  // reconstruct path
  const path = [];
  let cur = dest;

  while (cur !== -1) {
    path.push(cur);
    cur = parent[cur] ?? -1;
  }

  return path.reverse();
}
