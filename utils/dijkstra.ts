import { StationDoc } from "./types";

export function dijkstraRoute(
  graph: StationDoc[],
  src: number,
  dest: number
): {
  cost: number;
  path: number[];
  lineChanges: number;
  instructions: any[];
} {

  const dist = Array(graph.length).fill(Infinity);
  const parent = Array(graph.length).fill(-1);
  const visited = new Set<number>();

  dist[src] = 0;

  while (visited.size < graph.length) {
    let u = -1;
    for (let i = 0; i < graph.length; i++) {
      if (!visited.has(i) && (u === -1 || dist[i] < dist[u])) {
        u = i;
      }
    }

    if (u === -1) break;
    visited.add(u);

    for (const edge of graph[u].nextStations) {
      const v = edge.stationIndex;
      const w = edge.weight;

      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        parent[v] = u;
      }
    }
  }

  // Build route path
  const path: number[] = [];
  let node = dest;
  while (node !== -1) {
    path.push(node);
    node = parent[node];
  }
  path.reverse();

  // Detect interchanges
  let lineChanges = 0;
  let instructions: any[] = [];

  let currentLine = null;

  for (let i = 0; i < path.length - 1; i++) {
    const from = path[i];
    const to = path[i + 1];

    const edge = graph[from].nextStations.find(
      (s) => s.stationIndex === to
    );

    if (!edge) continue;

    // initialize first line
    if (currentLine === null) {
      currentLine = edge.line;
      instructions.push({
        type: "board",
        station: graph[from].name,
        line: currentLine,
      });
    }

    // if line changes
    if (edge.line !== currentLine) {
      lineChanges++;
      currentLine = edge.line;
      instructions.push({
        type: "interchange",
        station: graph[from].name,
        toLine: currentLine,
      });
    }
  }

  instructions.push({
    type: "exit",
    station: graph[dest].name,
  });

    return {
    cost: dist[dest],
    path,
    lineChanges,
    instructions,
  };
}

