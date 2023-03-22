export default function Stats({ player }: any) {
  if (player) {
    const playerStats = [
      {
        name: "level",
        value: player.level.toNumber(),
      },
      {
        name: "xp",
        value: player.xp.toNumber(),
      },
      {
        name: "status",
        value: player.status.toNumber(),
      },
      {
        name: "strength",
        value: player.strength.toNumber(),
      },
      {
        name: "health",
        value: player.health.toNumber(),
      },
      {
        name: "stamina",
        value: player.stamina.toNumber(),
      },
      {
        name: "mana",
        value: player.mana.toNumber(),
      },
      {
        name: "agility",
        value: player.agility.toNumber(),
      },
      {
        name: "luck",
        value: player.luck.toNumber(),
      },
      {
        name: "wisdom",
        value: player.luck.toNumber(),
      },
      {
        name: "haki",
        value: player.haki.toNumber(),
      },
      {
        name: "perception",
        value: player.perception.toNumber(),
      },
    ];
    return (
      <>
        <div className="grid grid-cols-2 h-full p-4 gap-4">
          {playerStats.map((item: any) => (
            <div
              key={item.name}
              className="flex flex-col items-center justify-center w-full h-full bg-secondary rounded-lg hover:bg-blue-700"
            >
              {item.name}: {item.value}
            </div>
          ))}
        </div>
      </>
    );
  }
}
