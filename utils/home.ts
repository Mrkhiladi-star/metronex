const KEY = "home-station";

export function saveHomeStation(station: string) {
  localStorage.setItem(KEY, station);
}

export function loadHomeStation(): string | null {
  return localStorage.getItem(KEY);
}
