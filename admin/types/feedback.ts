interface IFeedback {
    id: number;
    type: FeedbackType;
    fullName: string;
    gender: Gender;
    email: string;
    mobileNumber: string;
    feedback: string;
    status: string;
    rating: number;
    experience: string;
    feedbackTypeData: IDineIn | IDelivery;
    created: string;
  }
  
  interface IDineIn {
      dateOfVisit: string;
      timeOfVisit: string;
      visitAmount: VisitAmount;
  }
  interface IDelivery {
      dateOfOrder: string;
      timeOfOrder: string;
      feedbackOn: FeedbackOn;
      feedbackOnChoice: string;
  }
  
  
  enum FeedbackOn {
    HYGIENE="HYGIENE",
    HOSPITALITY="HOSPITALITY",
    ACCURACY="ACCURACY",
    SPEED="SPEED",
    CALL_CENTRE="CALL_CENTRE",
    PRODUCT_QUALITY="PRODUCT_QUALITY",
    ONLINE_ORDER="ONLINE_ORDER"
  }
  
  enum VisitAmount {
      WEEKLY="WEEKLY",
      MONTHLY="MONTHLY",
      OCCASIONALY="OCCASIONALY",
      FIRST_TIME="FIRST_TIME"
  }
  
  enum FeedbackType {
      DINE_INE="DINE_IN",
      DELIVERY="DELIVERY"
  }
  
  enum FeedbackStatus {
      NOT_EXAMINED="NOT_EXAMINED",
      EXAMINED="EXAMINED"
  }
  
  enum Gender {
      MALE="MALE",
      FEMALE="FEMALE"
  }
  
  export {
      IFeedback,
      Gender,
      FeedbackStatus,
      FeedbackOn,
      VisitAmount
  }