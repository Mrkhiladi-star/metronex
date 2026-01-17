import "dotenv/config";

import { connectDB } from "../lib/db.ts";
import Station from "../models/Station.ts";
import Tourist from "../models/Tourist.ts";
import Card from "../models/Card.ts";

interface NextStation {
  stationIndex: number;
  weight: number;
  line: string;
}

interface StationDoc {
  name: string;
  index: number;
  nextStations: NextStation[];
}

async function seed() {
  await connectDB();

  console.log("Connected to DB.");

  await Station.deleteMany({});
  await Tourist.deleteMany({});
  await Card.deleteMany({});

  const stations = [
    "CCS International Airport",
    "Amausi",
    "Transport Nagar",
    "Krishna Nagar",
    "Singar Nagar",
    "Alambagh",
    "Alambagh Bus Stand",
    "Mawaiya",
    "Durgapuri",
    "Charbagh Railway Station",
    "Hussain Ganj",
    "Sachivalaya",
    "Hazratganj",
    "KD Singh Babu Stadium",
    "Vishwavidyalaya",
    "IT Chauraha",
    "Badshahnagar",
    "Lekhraj Market",
    "Bhootnath Market",
    "Indira Nagar",
    "Munshipulia"
  ];

  const stationDocs: any[] = [];

  for (let i = 0; i < stations.length; i++) {
    stationDocs.push({
      name: stations[i],
      index: i,
      nextStations: [] as NextStation[],
    });
  }

  for (let i = 0; i < stations.length - 1; i++) {
    stationDocs[i].nextStations.push({
      stationIndex: i + 1,
      weight: 1,
      line: "red",
    });

    stationDocs[i + 1].nextStations.push({
      stationIndex: i,
      weight: 1,
      line: "red",
    });
  }

  await Station.insertMany(stationDocs as any[]);

  await Tourist.insertMany([
    { place: "Bara Imambara", nearest: "Charbagh Railway Station" },
    { place: "Chota Imambara", nearest: "Charbagh Railway Station" },
    { place: "Rumi Darwaza", nearest: "Charbagh Railway Station" },
    { place: "Hazratganj Market", nearest: "Hazratganj" },
    { place: "Lucknow Zoological Garden", nearest: "Mawaiya" },
    { place: "Gomti Riverfront Park", nearest: "KD Singh Babu Stadium" },
    { place: "Dr. Ram Manohar Lohia Park", nearest: "Indira Nagar" }
  ]);

  await Card.insertMany([
    { cardId: "100001", balance: 700 },
    { cardId: "100002", balance: 450 },
    { cardId: "100003", balance: 150 }
  ]);

  console.log("Seeding complete.");
  process.exit();
}

seed();
