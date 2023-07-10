interface IReview {
    id: number;
    reviewSubject: ReviewSubject;
    message: string;
    status: ReviewStatus;
    stars: number;
    date: string;
}

enum ReviewSubject {
    DRIVER="DRIVER",
    STUFF="STUFF",
    MANAGER="MANAGER",
    RESTAURANT="RESTAURANT",
    FOOD="FOOD",
    OTHER="OTHER"
  }
  
  enum ReviewStatus {
    PUBLIC="PUBLIC",
    PRIVATE="PRIVATE"
  }

export {
  IReview,
  ReviewStatus
}
  