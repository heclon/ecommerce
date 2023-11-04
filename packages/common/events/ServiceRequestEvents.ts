export enum ProviderServiceRequestEventCategory {
  Invite = 'Provider App Invite',
  Request = 'Provider App Request',
  Offer = 'Provider App Offer',
}

export enum ProviderInviteEvent {
  NewRequestsMenuItemClicked = 'New Requests Menu Item Clicked',
  RecommendedForYouTabClicked = 'Recommended For You Tab Clicked',
  SortBySubmittedDateClicked = 'Sort By Submitted Date Clicked',
  InviteDetailsClicked = 'Invite Details Clicked',
  InviteInterestedClicked = 'Invite Interested Clicked',
  InviteNotInterestedClicked = 'Invite Not Interested Clicked',
  InviteInterestedContinueClicked = 'Invite Interested Continue Clicked',
  InviteInterestedCancelClicked = 'Invite Interested Cancel Clicked',
  InviteInterestedSubmitClicked = 'Invite Interested Submit Clicked',
  ContactecommerceClicked = 'Contact ecommerce Clicked',
}

export enum ProviderRequestEvent {
  AllOpenRequestsTabClicked = 'All Open Requests Tab Clicked',
  RequestQueried = 'Requests Queried',
  SortBySubmittedDateClicked = 'Sort By Submitted Date Clicked',
  RequestDetailsClicked = 'Request Details Clicked',
  RequestInterestedClicked = 'Request Interested Clicked',
  RequestInterestedContinueClicked = 'Request Interested Continue Clicked',
  RequestInterestedCancelClicked = 'Request Interested Cancel Clicked',
  RequestInterestedSubmitClicked = 'Request Interested Submit Clicked',
  ContactecommerceClicked = 'Contact ecommerce Clicked',
}

export enum ServiceRequestEmailSentEvents {
  ecommerceServiceRequestP1EmailSent = 'ecommerce Service Request P1 Email Sent',
  ecommerceServiceRequestP2EmailSent = 'ecommerce Service Request P2 Email Sent',
  ecommerceServiceRequestP25EmailSent = 'ecommerce Service Request P2.5 Email Sent',
  ecommerceServiceRequestP3EmailSent = 'ecommerce Service Request P3 Email Sent',
  ecommerceServiceRequestP4EmailSent = 'ecommerce Service Request P4 Email Sent',
  ecommerceServiceRequestP5EmailSent = 'ecommerce Service Request P5 Email Sent',
  ecommerceServiceRequestP6EmailSent = 'ecommerce Service Request P6 Email Sent',
  ecommerceServiceRequestP7EmailSent = 'ecommerce Service Request P7 Email Sent',
}

export enum ProviderOfferEvent {
  PendingOffersMenuItemClicked = 'Pending Offers Menu Item Clicked',
  AwaitingOutcomeTabClicked = 'Awaiting Outcome Tab Clicked',
  AcceptedOffersTabClicked = 'Accepted Offers Tab Clicked',
  OfferDetailsClicked = 'Offer Details Clicked',
  OfferBookedClicked = 'Offer Booked Clicked',
  OfferNotBookedClicked = 'Offer Not Booked Clicked',
  OfferBookedCancelClicked = 'Offer Booked Cancel Clicked',
  OfferBookedSubmitClicked = 'Offer Booked Submit Clicked',
  OfferBookingDetailsCancelClicked = 'Offer Booking Details Cancel Clicked',
  OfferBookingDetailsSubmitClicked = 'Offer Booking Details Clicked',
  OfferNotBookedDropdownReasonClicked = 'Offer Not Booked Dropdown Reason Clicked',
  OfferNotBookedSubmitClicked = 'Offer Not Booked Submit Clicked',
  OfferNotBookedCancelClicked = 'Offer Not Booked Cancel Closed',
  CompletedOffersMenuItemClicked = 'Completed Offers Menu Item Clicked',
  BookedOffersTabClicked = 'Booked Offers Tab Clicked',
  DidNotGoAheadTabClicked = 'Did Not Go Ahead Tab Clicked',
  DeleteOfferClicked = 'Delete Offer Clicked',
  DeleteOfferCancelClicked = 'Delete Offer Cancel Clicked',
  DeleteOfferSubmitClicked = 'Delete Offer Submit Clicked',
}
