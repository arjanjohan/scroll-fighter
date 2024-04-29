import {
  FightersRevealed as FightersRevealedEvent,
  GameAccepted as GameAcceptedEvent,
  GameEnded as GameEndedEvent,
  GameEndedByTimeout as GameEndedByTimeoutEvent,
  GameProposed as GameProposedEvent
} from "../generated/ScrollFighter/ScrollFighter"
import {
  FightersRevealed,
  GameAccepted,
  GameEnded,
  GameEndedByTimeout,
  GameProposed
} from "../generated/schema"

export function handleFightersRevealed(event: FightersRevealedEvent): void {
  let entity = new FightersRevealed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameId = event.params.gameId
  entity.player1 = event.params.player1
  entity.player2 = event.params.player2
  entity.fighter1 = event.params.fighter1
  entity.fighter2 = event.params.fighter2
  entity.moves1 = event.params.moves1
  entity.moves2 = event.params.moves2

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGameAccepted(event: GameAcceptedEvent): void {
  let entity = new GameAccepted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameId = event.params.gameId
  entity.player1 = event.params.player1
  entity.player2 = event.params.player2
  entity.wageredAmount = event.params.wageredAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGameEnded(event: GameEndedEvent): void {
  let entity = new GameEnded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameId = event.params.gameId
  entity.player1 = event.params.player1
  entity.player2 = event.params.player2
  entity.winner = event.params.winner
  entity.pain1 = event.params.pain1
  entity.pain2 = event.params.pain2
  entity.wageredAmount = event.params.wageredAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGameEndedByTimeout(event: GameEndedByTimeoutEvent): void {
  let entity = new GameEndedByTimeout(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameId = event.params.gameId
  entity.player1 = event.params.player1
  entity.player2 = event.params.player2
  entity.winner = event.params.winner
  entity.wageredAmount = event.params.wageredAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleGameProposed(event: GameProposedEvent): void {
  let entity = new GameProposed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameId = event.params.gameId
  entity.player1 = event.params.player1
  entity.player2 = event.params.player2
  entity.wageredAmount = event.params.wageredAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}