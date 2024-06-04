
using my.library as my from '../db/data-model';

service CatalogService {
     entity Books as projection on my.Books;
     entity Bookloans as projection on my.Bookloans;
     entity users as projection on my.users;
     entity Reservations as projection on my.Reservations;
     entity Issuances as projection on my.Issuances;
}