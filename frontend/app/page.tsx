"use client";
import { useState } from "react";

export default function Home() {
  const [smiles, setSmiles] = useState("");
  const [pKa, setPka] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPka = async () => {
    setPka(null);
    setError(null);

    if (!smiles) {
      setError("SMILES を入力してください");
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/predict_pka/?smiles=${encodeURIComponent(smiles)}`);
      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setPka(data.pKa);
      }
    } catch (err) {
      setError("APIリクエストに失敗しました");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">SMILES から pKa を予測</h1>
      
      <input
        type="text"
        placeholder="SMILES を入力"
        value={smiles}
        onChange={(e) => setSmiles(e.target.value)}
        className="p-2 border border-gray-300 rounded w-80 mb-2"
      />
      
      <button
        onClick={fetchPka}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        予測
      </button>

      {pKa !== null && (
        <p className="mt-4 text-lg font-semibold">pKa: {pKa}</p>
      )}

      {error && (
        <p className="mt-4 text-red-500">{error}</p>
      )}
    </div>
  );
}
