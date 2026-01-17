export interface RouteHistoryItem {
  source: string;
  destination: string;
  timestamp: number;
}

const KEY = "metro-history";

export function saveHistory(item: RouteHistoryItem) {
  let list: RouteHistoryItem[] = [];

  try {
    const raw = localStorage.getItem(KEY);
    if (raw) list = JSON.parse(raw);
  } catch {}

  // Remove duplicates (same source + dest)
  list = list.filter(
    (r) => !(r.source === item.source && r.destination === item.destination)
  );

  // Add new item at top
  list.unshift(item);

  // Max 5 history items
  list = list.slice(0, 5);

  localStorage.setItem(KEY, JSON.stringify(list));
}

export function loadHistory(): RouteHistoryItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
