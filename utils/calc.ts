export function calcFare(stops: number, interchanges: number) {
  // Convert stops into approx km
  const km = stops * 1;

  let fare = 0;

  if (km <= 2) fare = 10;
  else if (km <= 5) fare = 15;
  else if (km <= 10) fare = 20;
  else if (km <= 15) fare = 30;
  else fare = 40;

  // ₹5 extra for interchange
  fare += interchanges * 5;

  return fare;
}

export function calcTime(stops: number, interchanges: number) {
  // 1 station ≈ 2 minutes
  let minutes = stops * 2;

  // interchange adds 3 min
  minutes += interchanges * 3;

  return minutes;
}
