import { useEffect, useState } from "react";
import LeaderboardTable from "../../components/leaderboardTable";

const Leaderboard = ({ players }) => {
  //   const [players, setPlayers] = useState({});

  //   useEffect(() => {
  //     try {
  //       fetch(
  //         process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  //           "http://localhost:3001/leaderboard"
  //       )
  //         .then((response) => {
  //           return response.json();
  //         })
  //         .then((parsedData) => {
  //           console.log(`parsedData`, parsedData);

  //           // modify image url before setting data - because infura-ipfs.io images not loading
  //           const modifiedData = {
  //             ...parsedData,
  //             players: parsedData.players.map((player) => {
  //               const modifiedPlayer = { ...player };
  //               modifiedPlayer.image = modifiedPlayer.image.replace(
  //                 "https://infura-ipfs.io",
  //                 "https://cloudflare-ipfs.com"
  //               );
  //               return modifiedPlayer;
  //             }),
  //           };

  //           console.log(`modifiedData`, modifiedData);
  //           console.log(`modifiedData.players`, modifiedData.players);
  //           setPlayers(modifiedData.players);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, []);
  console.log(`players`, players);
  return (
    <div className="w-full">
      {/* <h1 className="text-white">Leaderboard</h1> */}
      <div className=" m-auto w-fit">
        {players && <LeaderboardTable players={players} />}
      </div>
    </div>
  );
};

export default Leaderboard;

export async function getStaticProps() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_API_URL ||
      "http://localhost:3001/leaderboard"
  );
  const parsedData = await res.json();
  const modifiedData = {
    ...parsedData,
    players: parsedData.players.map((player) => {
      const modifiedPlayer = { ...player };
      modifiedPlayer.image = modifiedPlayer.image.replace(
        "https://infura-ipfs.io",
        "https://cloudflare-ipfs.com"
      );
      return modifiedPlayer;
    }),
  };

  console.log(`modifiedData`, modifiedData);
  console.log(`modifiedData.players`, modifiedData.players);
  // });
  return {
    props: {
      players: modifiedData.players,
    },
    revalidate: 60, // In Seconds
  };
}
