namespace my.library;

using {cuid} from '@sap/cds/common';

entity Books : cuid {
  title    : String;
  author   : String;
  ISBN     : String;
  quantity : Integer;
  Aquantity : Integer;
  bookloans : Composition of many Bookloans on bookloans.book =$self;
  reservedBy : Association to many Reservations on reservedBy.book = $self;
  issuedTo : Association to one Issuances on issuedTo.book = $self;
}
 
entity Bookloans : cuid {
 
  issuedate  : Date;
  returndate : Date;
  notify      : String;
  book : Association to  one  Books;
  user : Association to   one users;
}
 
entity users : cuid {
  name     : String;
  username : String;
  password : String;
  usertype : String;
  bookloan : Association to many Bookloans on bookloan.user =$self;
  reservations : Association to many Reservations on reservations.user = $self;
  issuances    : Association to many Issuances on issuances.user = $self;
 
}
entity Reservations : cuid {
    user : Association to users;
    book : Association to Books;
    reservationDate : Date;
}
entity Issuances : cuid{
    user : Association to users;
    book : Association to Books;
    reservedDate : Date;
}