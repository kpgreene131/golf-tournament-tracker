import Head from "next/head";
import { useState } from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, onClick } = props;

  return (
    <button className="rounded-xl bg-slate-500 p-3" onClick={onClick}>
      {children}
    </button>
  );
};

export default function Home() {
  const [players, setPlayers] = useState<number | null>(null);

  const onPlayerClick = (numPlayers: number) => {
    return () => {
      console.log("PLAYERS: ", players);
      setPlayers(numPlayers);
    };
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-800">
        <div className="container flex flex-col items-center justify-center bg-slate-700 px-4 py-16 text-slate-200 gap-4">
          <div className="mb-10 text-xl">Set Up Game</div>
          <div className="mb-2 text-xl">Number of Players</div>
          <div className="flex flex-row gap-4">
            <Button onClick={onPlayerClick(2)}>2</Button>
            <Button onClick={onPlayerClick(4)}>4</Button>
          </div>
          {players && (
            <div className="flex flex-col gap-4">
              {Array.from({ length: players / 2 }).map((_, index) => (
                <div key={index} className="flex flex-row gap-4 text-slate-800">
                  <input
                    type="text"
                    placeholder={`Player ${index * 2 + 1} Name`}
                  />
                  <input
                    type="text"
                    placeholder={`Player ${index * 2 + 2} Name`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
