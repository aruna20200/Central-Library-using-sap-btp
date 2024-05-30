
using my.library as my from '../db/data-model';

service CatalogService {
     entity Books as projection on my.Books;
     entity bookloans as projection on my.Bookloans;
     entity users as projection on my.users;
}