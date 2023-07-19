"use client";
import { Caveat, VT323 } from "next/font/google";
import { useState } from "react";

const caveat = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
const vt = VT323({ weight: ["400"], subsets: ["latin"] });

export default function SlotMachine() {
  const [firstReel, setFirstReel] = useState(6);
  const [secondReel, setSecondReel] = useState(6);
  const [thirdReel, setThirdReel] = useState(6);
  const [coins, setCoins] = useState(1000);
  const [bet, setBet] = useState(0);
  const [message, setMessage] = useState("Select a wager and spin to play");
  const [isSpinning, setIsSpinning] = useState(false);

  const slotSymbols = ["🍒", "🍓", "🍆", "🍉", "🍋", "🍊", "🌶️"];
  const firstReelSymbols = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 5, 6];
  const secondReelSymbols = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 5, 6];
  const thirdReelSymbols = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 5, 6];
  const validBets = [
    1, 5, 10, 20, 50, 100, 250, 500, 1000, 2500, 5000, 7500, 10000,
  ];

  const resetMachine = () => {
    setFirstReel(6);
    setSecondReel(6);
    setThirdReel(6);
    setCoins(1000);
    setMessage("Select a wager and spin to play");
    setBet(0);
    setIsSpinning(false);
  };

  const increaseBet = () => {
    if (bet === validBets.length - 1) {
      setMessage("Bet is at maximum");
      return;
    }
    console.log(`increasing bet: ${bet}`);

    setBet(bet + 1);
    setMessage(`Bet changed to: ${validBets[bet + 1]}`);
  };

  const decreaseBet = () => {
    if (bet === 0) {
      setMessage("Bet is at minimum");
      return;
    }

    setBet(bet - 1);
    setMessage(`Bet changed to: ${validBets[bet - 1]}`);
  };

  const handleSpin = () => {
    setIsSpinning(true);
    if (validBets[bet] > coins) {
      setMessage("Not enough coins for your current bet");
      setIsSpinning(false);
      return;
    }

    setCoins(coins - validBets[bet]);

    const newFirstSymbol = Math.floor(Math.random() * firstReelSymbols.length);
    const newSecondSymbol = Math.floor(
      Math.random() * secondReelSymbols.length
    );
    const newThirdSymbol = Math.floor(Math.random() * thirdReelSymbols.length);

    setFirstReel(firstReelSymbols[newFirstSymbol]);
    setSecondReel(secondReelSymbols[newSecondSymbol]);
    setThirdReel(thirdReelSymbols[newThirdSymbol]);

    const { winMessage, winAmount } = checkSpin({
      first: firstReelSymbols[newFirstSymbol],
      second: secondReelSymbols[newSecondSymbol],
      third: thirdReelSymbols[newThirdSymbol],
    });
    if (winAmount === 0) {
      setMessage("Not a winner");
    } else {
      setMessage(winMessage);
      setCoins(coins + winAmount);
    }

    setIsSpinning(false);
  };

  const checkSpin = ({
    first,
    second,
    third,
  }: {
    first: number;
    second: number;
    third: number;
  }) => {
    let winMessage = "";
    let winAmount = 0;

    if (first === 6 && second === 6 && third === 6) {
      winAmount = validBets[bet] * 100;
      winMessage = `You won ${winAmount} 🪙`;
      return { winAmount, winMessage };
    }
    if (first === 5 && second === 5 && third === 5) {
      winAmount = validBets[bet] * 50;
      winMessage = `You won ${winAmount} 🪙`;
      return { winAmount, winMessage };
    }
    if (first === 4 && second === 4 && third === 4) {
      winAmount = validBets[bet] * 25;
      winMessage = `You won ${winAmount} 🪙`;
      return { winAmount, winMessage };
    }
    if (first === 3 && second === 3 && third === 3) {
      winAmount = validBets[bet] * 15;
      winMessage = `You won ${winAmount} 🪙`;
      return { winAmount, winMessage };
    }
    if (first === 2 && second === 2 && third === 2) {
      winAmount = validBets[bet] * 12;
      winMessage = `You won ${winAmount} 🪙`;
      return { winAmount, winMessage };
    }
    if (first === 1 && second === 1 && third === 1) {
      winAmount = validBets[bet] * 10;
      winMessage = `You won ${winAmount} 🪙`;
      return { winAmount, winMessage };
    }
    if (first === 0 && second === 0 && third === 0) {
      winAmount = validBets[bet] * 5;
      winMessage = `You won ${winAmount} 🪙`;
      return { winAmount, winMessage };
    }
    if (first === 6 && second === 6) {
      winAmount = validBets[bet] * 15;
      winMessage = `You won ${winAmount} 🪙`;
      return { winAmount, winMessage };
    }
    if (first === 5 && second === 5) {
      winAmount = validBets[bet] * 10;
      winMessage = `You won ${winAmount} 🪙`;
      return { winAmount, winMessage };
    }
    if (first === 4 && second === 4) {
      winAmount = validBets[bet] * 10;
      winMessage = `You won ${winAmount} 🪙`;
      return { winAmount, winMessage };
    }
    if (first === 3 && second === 3) {
      winAmount = validBets[bet] * 5;
      winMessage = `You won ${winAmount} 🪙`;
      return { winAmount, winMessage };
    }
    if (first === 2 && second === 2) {
      winAmount = validBets[bet] * 5;
      winMessage = `You won ${winAmount} 🪙`;
      return { winAmount, winMessage };
    }
    if (first === 0 && second === 0) {
      winAmount = validBets[bet];
      winMessage = `You won ${winAmount} 🪙`;
      return { winAmount, winMessage };
    }

    return { winAmount, winMessage };
  };

  return (
    <div className="w-[1280px] h-[768px] flex flex-col border-2 border-gray-400 bg-zinc-900 rounded-2xl">
      <header className="flex bg-rose-950 rounded-t-2xl h-24 items-center justify-between px-4">
        <div className="w-1/3 flex">
          <div className="bg-emerald-900 rounded-l-2xl text-4xl pr-4 py-2">
            🪙
          </div>
          <div
            className={`${vt.className} bg-zinc-900 rounded-r-2xl text-4xl pl-2 py-2 text-right pr-4 w-[60%] text-gray-300`}
          >
            {coins.toLocaleString()}
          </div>
        </div>
        <div
          className={`w-1/3 ${caveat.className} text-white text-4xl font-bold`}
        >
          🌶️{" "}
          <span className="bg-gradient-to-b from-red-950 via-orange-800 to-red-700 text-transparent bg-clip-text font-extrabold text-5xl whitespace-nowrap">
            Red Hot Peppers
          </span>{" "}
          🌶️
        </div>
        <div className="w-1/3 flex justify-end">
          <button className="text-5xl" onClick={resetMachine}>
            ♻️
          </button>
        </div>
      </header>
      <main className="grow flex items-center justify-center gap-4">
        <div className="bg-gray-400 h-48 w-48 grid place-items-center rounded-2xl border-8 border-red-950">
          <span className="text-8xl">{slotSymbols[firstReel]}</span>
        </div>
        <div className="bg-gray-400 h-48 w-48 grid place-items-center rounded-2xl border-8 border-red-950">
          <span className="text-8xl">{slotSymbols[secondReel]}</span>
        </div>
        <div className="bg-gray-400 h-48 w-48 grid place-items-center rounded-2xl border-8 border-red-950">
          <span className="text-8xl">{slotSymbols[thirdReel]}</span>
        </div>
      </main>
      <footer className="flex bg-rose-950 rounded-b-2xl h-48 items-center justify-between px-4 gap-8">
        <div className="w-[20%] flex justify-between">
          <button
            className="py-2 bg-slate-800 rounded-l-full text-3xl"
            onClick={decreaseBet}
            disabled={isSpinning}
          >
            👈
          </button>
          <span
            className={`${vt.className} text-center grow bg-slate-800 text-gray-200 font-bold text-3xl before:content-['🪙'] px-3 py-2 whitespace-nowrap`}
          >
            {validBets[bet].toLocaleString()}
          </span>
          <button
            className="py-2 bg-slate-800 rounded-r-full text-3xl"
            onClick={increaseBet}
            disabled={isSpinning}
          >
            👉
          </button>
        </div>
        <div className="grow bg-slate-700 text-white font-extrabold tracking-widest text-3xl text-center py-6 rounded-xl border-4 border-gray-200">
          {message}
        </div>
        <div className="w-[20%] flex justify-center">
          <button
            className="grid place-items-center w-32 h-32 bg-red-700 rounded-full border-8 border-red-800 text-6xl hover:bg-red-600 hover:border-red-700"
            onClick={handleSpin}
            disabled={isSpinning}
          >
            🎰
          </button>
        </div>
      </footer>
    </div>
  );
}
