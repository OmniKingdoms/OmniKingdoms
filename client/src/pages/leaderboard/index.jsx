import { useEffect } from "react";

const Leaderboard = () => {

    useEffect(() => {
        try {
            fetch(process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3001/leaderboard")
            .then((response) => {
                return response.json();
            })
            .then((parsedData) => {
                console.log(`parsedData`, parsedData);
            })
            .catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div>Leaderboard</div>
    )
}

export default Leaderboard