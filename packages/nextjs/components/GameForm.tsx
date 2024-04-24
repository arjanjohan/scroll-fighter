// GameForm.tsx
"use client";

import React, { useState } from "react";
import { formatUnits } from "viem";
import { useAccount, useBalance, useWriteContract } from "wagmi";
// import { isAddress } from "web3-validator";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

// GameForm.tsx

// GameForm.tsx

// GameForm.tsx

// GameForm.tsx

// GameForm.tsx

// GameForm.tsx

// GameForm.tsx

// GameForm.tsx

// GameForm.tsx

// GameForm.tsx

// GameForm.tsx

// GameForm.tsx

// GameForm.tsx

// GameForm.tsx

interface Fighter {
  id: number;
  name: string;
  staticImage: string; // Static image URL
  animatedImage: string; // Animated GIF URL
  health: number;
  attack: number;
  defense: number;
  specialMove: string;
}

const fighters: Fighter[] = [
  {
    id: 1,
    name: "Biker",
    staticImage: "/sprites/biker.png",
    animatedImage: "/sprites/biker.gif",
    health: 6,
    attack: 8,
    defense: 5,
    specialMove: "⏩ Speed Burst",
  },
  {
    id: 2,
    name: "Punk",
    staticImage: "/sprites/punk.png",
    animatedImage: "/sprites/punk.gif",
    health: 8,
    attack: 6,
    defense: 5,
    specialMove: "🥊 Fight Dirty",
  },
  {
    id: 3,
    name: "Cyborg",
    staticImage: "/sprites/cyborg.png",
    animatedImage: "/sprites/cyborg.gif",
    health: 6,
    attack: 6,
    defense: 6,
    specialMove: "💥 Spirit Bomb",
  },
];

interface GameFormProps {
  mode: "create" | "join";
  initialOpponentAddress?: string;
  initialAmount?: string;
}

const moves = ["Attack", "Defend", "Special"] as const;
type Move = (typeof moves)[number];

export const GameForm = ({ mode, initialOpponentAddress, initialAmount }: GameFormProps) => {
  const [amount, setAmount] = useState<string>(initialAmount || "0");
  const [opponent, setOpponent] = useState<string>(initialOpponentAddress || "");
  const { address } = useAccount();
  const contractName = "ScrollFighter";
  const { data: deployedContractData } = useDeployedContractInfo(contractName);

  const tokenContractAddress = "0x64CDeB6CD5ecfB002bdaFabc98B5C883C5C06B27";
  const ethBalance = useBalance({ address: address, token: tokenContractAddress }) || 0;
  const data = ethBalance.data;
  const formattedEthBalance = formatUnits(BigInt(data?.value ?? 0), data?.decimals ?? 18);

  const [selectedFighter, setSelectedFighter] = useState<Fighter | null>(null);
  const [selectedMoves, setSelectedMoves] = useState<Move[]>(["Attack", "Attack", "Attack"]);

  const handleMoveChange = (index: number, move: Move): void => {
    const newMoves = [...selectedMoves];
    newMoves[index] = move;
    setSelectedMoves(newMoves);
  };

  const { writeContract } = useWriteContract();

  // When a fighter is clicked, update the selectedFighter state
  const handleFighterSelect = (fighter: Fighter) => {
    setSelectedFighter(fighter);
  };

  const proposeGame = async () => {
    if (!deployedContractData?.abi || !deployedContractData?.address) {
      console.error("Contract data is not loaded.");
      return;
    }

    try {
      await writeContract({
        abi: deployedContractData.abi,
        address: deployedContractData.address,
        functionName: "proposeGame",
        args: [opponent, amount],
      });
      console.log("Game proposed successfully!");
    } catch (error) {
      console.error("Failed to propose game:", error);
    }
  };

  const joinGame = async () => {
    // Assuming there's a similar function in your contract for joining a game
    if (!deployedContractData?.abi || !deployedContractData?.address) {
      console.error("Contract data is not loaded.");
      return;
    }

    try {
      //   await writeContract({
      //     abi: deployedContractData.abi,
      //     address: deployedContractData.address,
      //     functionName: "joinGame",
      //     args: [opponent, amount], // Your contract's joinGame function might require different parameters.
      //   });
      console.log("Game joined successfully!");
    } catch (error) {
      console.error("Failed to join game:", error);
    }
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-6 px-6 lg:px-10 lg:gap-12 w-full max-w-7xl my-0 `}>
      <div className="col-span-5 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
          <div className="z-10">
            <div className="bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-10 relative">
              <div className="h-[5rem] w-[5.5rem] bg-base-300 absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-base-300">
                <div className="flex items-center justify-center space-x-2">
                  <p className="my-0 text-sm">Start game</p>
                </div>
              </div>
              <div className="p-5 divide-y divide-base-300">
                <h1 className="text-xl font-bold">Game Setup</h1>
                <label className="block">
                  Opponent Address:
                  <input
                    type="text"
                    value={opponent}
                    onChange={e => setOpponent(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Enter ERC20 address"
                  />
                </label>
                <label className="block">
                  <div className="flex justify-between mt-2">Amount to Stake: {amount} FT</div>
                  <input
                    type="range"
                    min="0"
                    max={formattedEthBalance.toString()}
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="range range-primary w-full"
                  />
                  <div className="flex justify-between">
                    <div className="text-left">0</div>
                    <div className="text-right">{formattedEthBalance}</div>
                  </div>
                </label>
                <h1 className="text-xl font-bold">Select Your Fighter</h1>
                <div className="flex space-x-4">
                  {fighters.map(fighter => (
                    <div
                      key={fighter.id}
                      className="text-center cursor-pointer"
                      onClick={() => handleFighterSelect(fighter)}
                    >
                      <img
                        src={selectedFighter?.id === fighter.id ? fighter.animatedImage : fighter.staticImage}
                        alt={fighter.name}
                        className={`h-40 w-40 inline-block ${
                          selectedFighter?.id === fighter.id ? "ring-4 ring-primary" : ""
                        }`}
                      />
                      <div className="mt-1 font-semibold">{fighter.name}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="my-2">
                    Health:
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-primary h-4 rounded-full bg-red-400"
                        style={{ width: `${selectedFighter ? selectedFighter.health * 10 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="my-2">
                    Attack:
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-primary h-4 rounded-full bg-green-400"
                        style={{ width: `${selectedFighter ? selectedFighter.attack * 10 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="my-2">
                    Defense:
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-primary h-4 rounded-full bg-blue-400"
                        style={{ width: `${selectedFighter ? selectedFighter.defense * 10 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <p>Special Move: {selectedFighter ? selectedFighter.specialMove : "None"} </p>
                </div>
                <div>
                  <p>Select moves for each round:</p>
                  <div className="flex flex-col gap-4">
                    {Array.from({ length: 3 }).map((_, roundIndex) => (
                      <div key={roundIndex} className="flex flex-col items-center">
                        <p>Round {roundIndex + 1}</p>
                        <div className="grid grid-cols-3 gap-2">
                          {moves.map(move => (
                            <button
                              key={move}
                              className={`btn ${selectedMoves[roundIndex] === move ? "btn-active" : "btn-outline"}`}
                              onClick={() => handleMoveChange(roundIndex, move)}
                            >
                              {move}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => (mode === "create" ? proposeGame() : joinGame())}
                >
                  {mode === "create" ? "Propose game" : "Join game"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
