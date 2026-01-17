"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, CheckCircle, XCircle } from "lucide-react";

export default function RechargePage() {
  const [cardId, setCardId] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<any>(null);

  const recharge = async () => {
    const res = await fetch("/api/recharge", {
      method: "POST",
      body: JSON.stringify({ cardId, amount: Number(amount) }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="mt-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold">Recharge Smart Card</h1>

      {/* Inputs section */}
      <div className="space-y-4 p-4 border bg-card text-card-foreground rounded-lg">
        <Input
          placeholder="Card ID"
          value={cardId}
          onChange={(e) => setCardId(e.target.value)}
          className="bg-background text-foreground"
        />

        <Input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-background text-foreground"
        />

        <Button onClick={recharge}>Recharge</Button>
      </div>

      {/* SUCCESS */}
      {result && result.success && (
        <div className="p-4 border bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg space-y-3">
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-green-600 dark:text-green-300 w-6 h-6" />
            <h3 className="text-lg font-semibold">Recharge Successful</h3>
          </div>

          <p><strong>Card ID:</strong> {result.cardId}</p>
          <p><strong>Old Balance:</strong> ₹{result.oldBalance}</p>
          <p><strong>Added Amount:</strong> ₹{result.amount}</p>
          <p className="font-semibold text-green-700 dark:text-green-300">
            New Balance: ₹{result.newBalance}
          </p>
        </div>
      )}

      {/* ERROR */}
      {result && result.error && (
        <div className="p-4 border bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg space-y-2">
          <div className="flex items-center space-x-3">
            <XCircle className="text-red-600 dark:text-red-300 w-6 h-6" />
            <h3 className="text-lg font-semibold">Recharge Failed</h3>
          </div>

          <p>{result.error}</p>
        </div>
      )}
    </div>
  );
}
