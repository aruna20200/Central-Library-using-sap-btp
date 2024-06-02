// const cds = require('@sap/cds');

// module.exports = cds.service.impl(async function() {
//   const { Books, users, Reservations, Issuances } = this.entities;

//   this.on('reserveBook', async (req) => {
//     const { bookID, userID } = req.data;

//     // Check if the book is already issued
//     const issuedBook = await SELECT.one.from(Issuances).where({ book_ID: bookID });
//     if (issuedBook) return req.error(400, 'Book is already issued.');

//     // Create a new reservation
//     const reservation = await INSERT.into(Reservations).entries({
//       ID: cds.utils.uuid(),
//       user_ID: userID,
//       book_ID: bookID,
//       reservationDate: new Date().toISOString().split('T')[0] // Current date
//     });

//     return reservation;
//   });

//   this.on('issueBook', async (req) => {
//     const { bookID, userID } = req.data;

//     // Check if the book is already issued
//     const issuedBook = await SELECT.one.from(Issuances).where({ book_ID: bookID });
//     if (issuedBook) return req.error(400, 'Book is already issued.');

//     // Create a new issuance
//     const issuance = await INSERT.into(Issuances).entries({
//       ID: cds.utils.uuid(),
//       user_ID: userID,
//       book_ID: bookID,
//       issueDate: new Date().toISOString().split('T')[0], // Current date
//       returnDate: null
//     });

//     // Optionally, delete the reservation
//     await DELETE.from(Reservations).where({ book_ID: bookID });

//     return issuance;
//   });

//   this.on('returnBook', async (req) => {
//     const { bookID, userID } = req.data;

//     // Check if the book is issued to the user
//     const issuedBook = await SELECT.one.from(Issuances).where({ book_ID: bookID, user_ID: userID });
//     if (!issuedBook) return req.error(400, 'Book is not issued to this user.');

//     // Update the return date
//     const returnDate = new Date().toISOString().split('T')[0]; // Current date
//     await UPDATE(Issuances).set({ returnDate }).where({ book_ID: bookID, user_ID: userID });

//     return { bookID, userID, returnDate };
//   });
// });
