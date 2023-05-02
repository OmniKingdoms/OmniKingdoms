import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { EnterMagic } from "../generated/schema"
import { EnterMagic as EnterMagicEvent } from "../generated/Sk/Sk"
import { handleEnterMagic } from "../src/sk"
import { createEnterMagicEvent } from "./sk-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _playerId = BigInt.fromI32(234)
    let newEnterMagicEvent = createEnterMagicEvent(_playerId)
    handleEnterMagic(newEnterMagicEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("EnterMagic created and stored", () => {
    assert.entityCount("EnterMagic", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "EnterMagic",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_playerId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
