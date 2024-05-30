namespace my.library;

using {cuid} from '@sap/cds/common';


entity Books : cuid {
  title    : String;
  author   : String;
  ISBN     : String;
  quantity : Integer;
  Aquantity : Integer;
  bookloans : Composition of many Bookloans on bookloans.book =$self;
}
 
entity Bookloans : cuid {
 
  issuedate  : Date;
  returndate : Date;
  book : Association to  one  Books;
  user : Association to   one users;
}
 
entity users : cuid {
  name     : String;
  username : String;
  password : String;
  usertype : String;
  bookloan : Association to many Bookloans on bookloan.user =$self;
 
}