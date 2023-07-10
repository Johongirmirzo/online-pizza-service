export interface IReview {
    reviewSubject: ReviewSubject;
    message: string;
    stars: number;      
}

export enum ReviewSubject {
    DRIVER="DRIVER",
    STUFF="STUFF",
    MANAGER="MANAGER",
    RESTAURANT="RESTAURANT",
    FOOD="FOOD",
    OTHER="OTHER"
  }
  
export enum ReviewStatus {
    PUBLIC="PUBLIC",
    PRIVATE="PRIVATE"
  }
  