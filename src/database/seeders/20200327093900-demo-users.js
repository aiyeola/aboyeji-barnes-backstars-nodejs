/* eslint-disable no-unused-vars */
/* eslint-disable implicit-arrow-linebreak */
export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'John',
          lastName: 'Doe',
          userEmail: 'johndoe@gmail.com',
          userPassword:
            '$2b$10$oUCucQnBRaYYcZS5kMy7o.ydnOHHA6k/w7sQ9r9L1STDnos6Fw1c2',
          userRoles: 'Super Administrator',
          accountVerified: true,
          emailAllowed: true,
          requestAutofill: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Dean',
          lastName: 'Winchester',
          userEmail: 'marveldev53@gmail.com',
          userPassword:
            '$2b$10$oUCucQnBRaYYcZS5kMy7o.ydnOHHA6k/w7sQ9r9L1STDnos6Fw1c2',
          userRoles: 'Manager',
          accountVerified: true,
          emailAllowed: true,
          requestAutofill: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Jane',
          lastName: 'Doe',
          userEmail: 'janedoe@gmail.com',
          userPassword:
            '$2b$10$oUCucQnBRaYYcZS5kMy7o.ydnOHHA6k/w7sQ9r9L1STDnos6Fw1c2',
          userRoles: 'Travel Administrator',
          accountVerified: 'True',
          emailAllowed: true,
          requestAutofill: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Daniel',
          lastName: 'Doe',
          userEmail: 'danieldoe@gmail.com',
          userPassword:
            '$2b$10$oUCucQnBRaYYcZS5kMy7o.ydnOHHA6k/w7sQ9r9L1STDnos6Fw1c2',
          userRoles: 'Requester',
          accountVerified: 'True',
          emailAllowed: true,
          requestAutofill: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null, {})
};
