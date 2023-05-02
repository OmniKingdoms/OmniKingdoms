import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  EnterMagic,
  EnterMain,
  EnterSecond,
  MagicLoss,
  MagicWin,
  MainLoss,
  MainWin,
  SecondLoss,
  SecondWin,
  ItemCrafted,
  DiamondCut,
  ItemEquiped,
  ItemUnequiped,
  List,
  Purchase,
  OwnershipTransferred,
  Mint,
  NameChange,
  BeginQuesting,
  EndQuesting,
  BeginTrainingCombat,
  BeginTrainingMana,
  EndTrainingCombat,
  EndTrainingMana,
  DiamondCut1,
  DiamondCut2,
  OwnershipTransferred1,
  DiamondCut3,
  OwnershipTransferred2
} from "../generated/Sk/Sk"

export function createEnterMagicEvent(_playerId: BigInt): EnterMagic {
  let enterMagicEvent = changetype<EnterMagic>(newMockEvent())

  enterMagicEvent.parameters = new Array()

  enterMagicEvent.parameters.push(
    new ethereum.EventParam(
      "_playerId",
      ethereum.Value.fromUnsignedBigInt(_playerId)
    )
  )

  return enterMagicEvent
}

export function createEnterMainEvent(_playerId: BigInt): EnterMain {
  let enterMainEvent = changetype<EnterMain>(newMockEvent())

  enterMainEvent.parameters = new Array()

  enterMainEvent.parameters.push(
    new ethereum.EventParam(
      "_playerId",
      ethereum.Value.fromUnsignedBigInt(_playerId)
    )
  )

  return enterMainEvent
}

export function createEnterSecondEvent(_playerId: BigInt): EnterSecond {
  let enterSecondEvent = changetype<EnterSecond>(newMockEvent())

  enterSecondEvent.parameters = new Array()

  enterSecondEvent.parameters.push(
    new ethereum.EventParam(
      "_playerId",
      ethereum.Value.fromUnsignedBigInt(_playerId)
    )
  )

  return enterSecondEvent
}

export function createMagicLossEvent(_playerId: BigInt): MagicLoss {
  let magicLossEvent = changetype<MagicLoss>(newMockEvent())

  magicLossEvent.parameters = new Array()

  magicLossEvent.parameters.push(
    new ethereum.EventParam(
      "_playerId",
      ethereum.Value.fromUnsignedBigInt(_playerId)
    )
  )

  return magicLossEvent
}

export function createMagicWinEvent(_playerId: BigInt): MagicWin {
  let magicWinEvent = changetype<MagicWin>(newMockEvent())

  magicWinEvent.parameters = new Array()

  magicWinEvent.parameters.push(
    new ethereum.EventParam(
      "_playerId",
      ethereum.Value.fromUnsignedBigInt(_playerId)
    )
  )

  return magicWinEvent
}

export function createMainLossEvent(_playerId: BigInt): MainLoss {
  let mainLossEvent = changetype<MainLoss>(newMockEvent())

  mainLossEvent.parameters = new Array()

  mainLossEvent.parameters.push(
    new ethereum.EventParam(
      "_playerId",
      ethereum.Value.fromUnsignedBigInt(_playerId)
    )
  )

  return mainLossEvent
}

export function createMainWinEvent(_playerId: BigInt): MainWin {
  let mainWinEvent = changetype<MainWin>(newMockEvent())

  mainWinEvent.parameters = new Array()

  mainWinEvent.parameters.push(
    new ethereum.EventParam(
      "_playerId",
      ethereum.Value.fromUnsignedBigInt(_playerId)
    )
  )

  return mainWinEvent
}

export function createSecondLossEvent(_playerId: BigInt): SecondLoss {
  let secondLossEvent = changetype<SecondLoss>(newMockEvent())

  secondLossEvent.parameters = new Array()

  secondLossEvent.parameters.push(
    new ethereum.EventParam(
      "_playerId",
      ethereum.Value.fromUnsignedBigInt(_playerId)
    )
  )

  return secondLossEvent
}

export function createSecondWinEvent(_playerId: BigInt): SecondWin {
  let secondWinEvent = changetype<SecondWin>(newMockEvent())

  secondWinEvent.parameters = new Array()

  secondWinEvent.parameters.push(
    new ethereum.EventParam(
      "_playerId",
      ethereum.Value.fromUnsignedBigInt(_playerId)
    )
  )

  return secondWinEvent
}

export function createItemCraftedEvent(
  _owner: Address,
  _player: BigInt
): ItemCrafted {
  let itemCraftedEvent = changetype<ItemCrafted>(newMockEvent())

  itemCraftedEvent.parameters = new Array()

  itemCraftedEvent.parameters.push(
    new ethereum.EventParam("_owner", ethereum.Value.fromAddress(_owner))
  )
  itemCraftedEvent.parameters.push(
    new ethereum.EventParam(
      "_player",
      ethereum.Value.fromUnsignedBigInt(_player)
    )
  )

  return itemCraftedEvent
}

export function createDiamondCutEvent(
  _init: Address,
  _calldata: Bytes
): DiamondCut {
  let diamondCutEvent = changetype<DiamondCut>(newMockEvent())

  diamondCutEvent.parameters = new Array()

  diamondCutEvent.parameters.push(
    new ethereum.EventParam("_init", ethereum.Value.fromAddress(_init))
  )
  diamondCutEvent.parameters.push(
    new ethereum.EventParam("_calldata", ethereum.Value.fromBytes(_calldata))
  )

  return diamondCutEvent
}

export function createItemEquipedEvent(
  _owner: Address,
  _playerId: BigInt,
  _itemId: BigInt
): ItemEquiped {
  let itemEquipedEvent = changetype<ItemEquiped>(newMockEvent())

  itemEquipedEvent.parameters = new Array()

  itemEquipedEvent.parameters.push(
    new ethereum.EventParam("_owner", ethereum.Value.fromAddress(_owner))
  )
  itemEquipedEvent.parameters.push(
    new ethereum.EventParam(
      "_playerId",
      ethereum.Value.fromUnsignedBigInt(_playerId)
    )
  )
  itemEquipedEvent.parameters.push(
    new ethereum.EventParam(
      "_itemId",
      ethereum.Value.fromUnsignedBigInt(_itemId)
    )
  )

  return itemEquipedEvent
}

export function createItemUnequipedEvent(
  _owner: Address,
  _playerId: BigInt,
  _itemId: BigInt
): ItemUnequiped {
  let itemUnequipedEvent = changetype<ItemUnequiped>(newMockEvent())

  itemUnequipedEvent.parameters = new Array()

  itemUnequipedEvent.parameters.push(
    new ethereum.EventParam("_owner", ethereum.Value.fromAddress(_owner))
  )
  itemUnequipedEvent.parameters.push(
    new ethereum.EventParam(
      "_playerId",
      ethereum.Value.fromUnsignedBigInt(_playerId)
    )
  )
  itemUnequipedEvent.parameters.push(
    new ethereum.EventParam(
      "_itemId",
      ethereum.Value.fromUnsignedBigInt(_itemId)
    )
  )

  return itemUnequipedEvent
}

export function createListEvent(
  _from: Address,
  _playerId: BigInt,
  _price: BigInt
): List {
  let listEvent = changetype<List>(newMockEvent())

  listEvent.parameters = new Array()

  listEvent.parameters.push(
    new ethereum.EventParam("_from", ethereum.Value.fromAddress(_from))
  )
  listEvent.parameters.push(
    new ethereum.EventParam(
      "_playerId",
      ethereum.Value.fromUnsignedBigInt(_playerId)
    )
  )
  listEvent.parameters.push(
    new ethereum.EventParam("_price", ethereum.Value.fromUnsignedBigInt(_price))
  )

  return listEvent
}

export function createPurchaseEvent(_to: Address, _id: BigInt): Purchase {
  let purchaseEvent = changetype<Purchase>(newMockEvent())

  purchaseEvent.parameters = new Array()

  purchaseEvent.parameters.push(
    new ethereum.EventParam("_to", ethereum.Value.fromAddress(_to))
  )
  purchaseEvent.parameters.push(
    new ethereum.EventParam("_id", ethereum.Value.fromUnsignedBigInt(_id))
  )

  return purchaseEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createMintEvent(
  id: BigInt,
  owner: Address,
  name: string,
  uri: string
): Mint {
  let mintEvent = changetype<Mint>(newMockEvent())

  mintEvent.parameters = new Array()

  mintEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("uri", ethereum.Value.fromString(uri))
  )

  return mintEvent
}

export function createNameChangeEvent(
  owner: Address,
  id: BigInt,
  newName: string
): NameChange {
  let nameChangeEvent = changetype<NameChange>(newMockEvent())

  nameChangeEvent.parameters = new Array()

  nameChangeEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  nameChangeEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  nameChangeEvent.parameters.push(
    new ethereum.EventParam("newName", ethereum.Value.fromString(newName))
  )

  return nameChangeEvent
}

export function createBeginQuestingEvent(
  _playerAddress: Address,
  _id: BigInt
): BeginQuesting {
  let beginQuestingEvent = changetype<BeginQuesting>(newMockEvent())

  beginQuestingEvent.parameters = new Array()

  beginQuestingEvent.parameters.push(
    new ethereum.EventParam(
      "_playerAddress",
      ethereum.Value.fromAddress(_playerAddress)
    )
  )
  beginQuestingEvent.parameters.push(
    new ethereum.EventParam("_id", ethereum.Value.fromUnsignedBigInt(_id))
  )

  return beginQuestingEvent
}

export function createEndQuestingEvent(
  _playerAddress: Address,
  _id: BigInt
): EndQuesting {
  let endQuestingEvent = changetype<EndQuesting>(newMockEvent())

  endQuestingEvent.parameters = new Array()

  endQuestingEvent.parameters.push(
    new ethereum.EventParam(
      "_playerAddress",
      ethereum.Value.fromAddress(_playerAddress)
    )
  )
  endQuestingEvent.parameters.push(
    new ethereum.EventParam("_id", ethereum.Value.fromUnsignedBigInt(_id))
  )

  return endQuestingEvent
}

export function createBeginTrainingCombatEvent(
  _playerAddress: Address,
  _id: BigInt
): BeginTrainingCombat {
  let beginTrainingCombatEvent = changetype<BeginTrainingCombat>(newMockEvent())

  beginTrainingCombatEvent.parameters = new Array()

  beginTrainingCombatEvent.parameters.push(
    new ethereum.EventParam(
      "_playerAddress",
      ethereum.Value.fromAddress(_playerAddress)
    )
  )
  beginTrainingCombatEvent.parameters.push(
    new ethereum.EventParam("_id", ethereum.Value.fromUnsignedBigInt(_id))
  )

  return beginTrainingCombatEvent
}

export function createBeginTrainingManaEvent(
  _playerAddress: Address,
  _id: BigInt
): BeginTrainingMana {
  let beginTrainingManaEvent = changetype<BeginTrainingMana>(newMockEvent())

  beginTrainingManaEvent.parameters = new Array()

  beginTrainingManaEvent.parameters.push(
    new ethereum.EventParam(
      "_playerAddress",
      ethereum.Value.fromAddress(_playerAddress)
    )
  )
  beginTrainingManaEvent.parameters.push(
    new ethereum.EventParam("_id", ethereum.Value.fromUnsignedBigInt(_id))
  )

  return beginTrainingManaEvent
}

export function createEndTrainingCombatEvent(
  _playerAddress: Address,
  _id: BigInt
): EndTrainingCombat {
  let endTrainingCombatEvent = changetype<EndTrainingCombat>(newMockEvent())

  endTrainingCombatEvent.parameters = new Array()

  endTrainingCombatEvent.parameters.push(
    new ethereum.EventParam(
      "_playerAddress",
      ethereum.Value.fromAddress(_playerAddress)
    )
  )
  endTrainingCombatEvent.parameters.push(
    new ethereum.EventParam("_id", ethereum.Value.fromUnsignedBigInt(_id))
  )

  return endTrainingCombatEvent
}

export function createEndTrainingManaEvent(
  _playerAddress: Address,
  _id: BigInt
): EndTrainingMana {
  let endTrainingManaEvent = changetype<EndTrainingMana>(newMockEvent())

  endTrainingManaEvent.parameters = new Array()

  endTrainingManaEvent.parameters.push(
    new ethereum.EventParam(
      "_playerAddress",
      ethereum.Value.fromAddress(_playerAddress)
    )
  )
  endTrainingManaEvent.parameters.push(
    new ethereum.EventParam("_id", ethereum.Value.fromUnsignedBigInt(_id))
  )

  return endTrainingManaEvent
}

export function createDiamondCut1Event(
  _init: Address,
  _calldata: Bytes
): DiamondCut1 {
  let diamondCut1Event = changetype<DiamondCut1>(newMockEvent())

  diamondCut1Event.parameters = new Array()

  diamondCut1Event.parameters.push(
    new ethereum.EventParam("_init", ethereum.Value.fromAddress(_init))
  )
  diamondCut1Event.parameters.push(
    new ethereum.EventParam("_calldata", ethereum.Value.fromBytes(_calldata))
  )

  return diamondCut1Event
}

export function createDiamondCut2Event(
  _init: Address,
  _calldata: Bytes
): DiamondCut2 {
  let diamondCut2Event = changetype<DiamondCut2>(newMockEvent())

  diamondCut2Event.parameters = new Array()

  diamondCut2Event.parameters.push(
    new ethereum.EventParam("_init", ethereum.Value.fromAddress(_init))
  )
  diamondCut2Event.parameters.push(
    new ethereum.EventParam("_calldata", ethereum.Value.fromBytes(_calldata))
  )

  return diamondCut2Event
}

export function createOwnershipTransferred1Event(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred1 {
  let ownershipTransferred1Event = changetype<OwnershipTransferred1>(
    newMockEvent()
  )

  ownershipTransferred1Event.parameters = new Array()

  ownershipTransferred1Event.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferred1Event.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferred1Event
}

export function createDiamondCut3Event(
  _init: Address,
  _calldata: Bytes
): DiamondCut3 {
  let diamondCut3Event = changetype<DiamondCut3>(newMockEvent())

  diamondCut3Event.parameters = new Array()

  diamondCut3Event.parameters.push(
    new ethereum.EventParam("_init", ethereum.Value.fromAddress(_init))
  )
  diamondCut3Event.parameters.push(
    new ethereum.EventParam("_calldata", ethereum.Value.fromBytes(_calldata))
  )

  return diamondCut3Event
}

export function createOwnershipTransferred2Event(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred2 {
  let ownershipTransferred2Event = changetype<OwnershipTransferred2>(
    newMockEvent()
  )

  ownershipTransferred2Event.parameters = new Array()

  ownershipTransferred2Event.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferred2Event.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferred2Event
}
