import { Mint as MintEvent, MainWin as MainWinEvent } from "../generated/Sk/Sk";
import { Player, Total } from "../generated/schema";

export function handleMint(event: MintEvent): void {
  let player_id = event.params.id.toString();
  let entity = new Player(player_id);
  entity.Player_id = event.params.id;
  entity.owner = event.params.owner;
  entity.name = event.params.name;
  entity.Mainwins = 0;
  entity.wins = 0;

  let total = Total.load("total");
  if (total == null) {
    total = new Total("total");
    total.count = 1;
    total.save();
  } else {
    total.count = total.count + 1;
    total.save();
  }
  entity.save();
}

export function handleMainWin(event: MainWinEvent): void {
  let player_id = event.params._playerId.toString();

  let player = Player.load(player_id);
  if (player) {
    player.Mainwins = player.Mainwins + 1;
    player.wins = player.wins + 1;
    player.save();
  }
}
