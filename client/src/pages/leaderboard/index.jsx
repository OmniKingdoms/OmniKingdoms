import { useEffect, useState } from "react";
import LeaderboardTable from "../../components/leaderboardTable";

const Leaderboard = () => {
    const [players, setPlayers] = useState({});

    useEffect(() => {
        try {
            fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3001/leaderboard")
            .then((response) => {
                return response.json();
            })
            .then((parsedData) => {
                console.log(`parsedData`, parsedData);
                
                // modify image url before setting data - because infura-ipfs.io images not loading
                const modifiedData = {
                    ...parsedData,
                    players: parsedData.players.map((player) => {
                        const modifiedPlayer = { ...player };
                        modifiedPlayer.image = modifiedPlayer.image.replace("https://infura-ipfs.io", "https://cloudflare-ipfs.com");
                        return modifiedPlayer;
                    })
                };
                
                console.log(`modifiedData`, modifiedData);
                console.log(`modifiedData.players`, modifiedData.players)
                setPlayers(modifiedData.players);

            })
            .catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div>
            <h1 className="text-white">Leaderboard</h1>
            <div className="mx-[2rem]">
                {players && 
                    <LeaderboardTable 
                        players={players}
                    />
                }
            </div>
        </div>
    )
}

export default Leaderboard