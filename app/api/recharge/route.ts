"use server";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Card from "@/models/Card";
export async function POST(req: NextRequest) {
  const { cardId, amount } = await req.json();
  await connectDB();
  const card = await Card.findOne({ cardId });
  if (!card) {
    return Response.json(
      { success: false, error: "Card not found" },
      { status: 404 }
    );
  }
  const oldBalance = card.balance;
  const newBalance = oldBalance + amount;
  card.balance = newBalance;
  await card.save();
  return Response.json({
    success: true,
    cardId,
    oldBalance,
    amount,
    newBalance,
  });
}
