
class CardType {
  static SUITS = ["spades", "hearts", "clubs", "diamonds"];
  static RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  
  suit: string;
  rank: string;

  constructor(rank: string, suit: string) {
      if (!CardType.RANKS.includes(rank)) {
          throw new Error("Invalid rank");
      }
      if (!CardType.SUITS.includes(suit)) {
          throw new Error("Invalid suit");
      }
      this.rank = rank;
      this.suit = suit;
  }

  equals(otherCard: CardType) {
      return this.rank === otherCard.rank && this.suit === otherCard.suit;
  }

  compare(otherCard: CardType, sortBy = "rank") {
      if (sortBy === "rank") {
          const thisRankIndex = CardType.RANKS.indexOf(this.rank);
          const otherRankIndex = CardType.RANKS.indexOf(otherCard.rank);

          if (thisRankIndex > otherRankIndex) {
              return 1;
          } else if (thisRankIndex < otherRankIndex) {
              return -1;
          } else {
              const thisSuitIndex = CardType.SUITS.indexOf(this.suit);
              const otherSuitIndex = CardType.SUITS.indexOf(otherCard.suit);
              if (thisSuitIndex > otherSuitIndex) {
                  return 1;
              } else if (thisSuitIndex < otherSuitIndex) {
                  return -1;
              } else {
                  return 0;
              }
          }
      } else if (sortBy === "suit") {
          const thisSuitIndex = CardType.SUITS.indexOf(this.suit);
          const otherSuitIndex = CardType.SUITS.indexOf(otherCard.suit);

          if (thisSuitIndex > otherSuitIndex) {
              return 1;
          } else if (thisSuitIndex < otherSuitIndex) {
              return -1;
          } else {
              const thisRankIndex = CardType.RANKS.indexOf(this.rank);
              const otherRankIndex = CardType.RANKS.indexOf(otherCard.rank);
              if (thisRankIndex > otherRankIndex) {
                  return 1;
              } else if (thisRankIndex < otherRankIndex) {
                  return -1;
              } else {
                  return 0;
              }
          }
      } else {
          throw new Error("Invalid sort option");
      }
  }

  toString() {
      return `${this.rank} of ${this.suit}`;
  }
}

export default CardType;