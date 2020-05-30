/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Requests',
      [
        {
          from: 'Kigali, Rwanda',
          travelDate: ['2020-10-01'],
          returnDate: '2020-12-12',
          reason: 'Business Travel',
          status: 'Pending',
          userId: 1,
          passportNumber: '121HU3H3U32',
          passportName: 'Donald Trump',
          gender: 'MALE',
          role: 'Requester',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          from: 'Lagos, Nigeria',
          travelDate: ['2020-10-01'],
          returnDate: '2020-12-12',
          reason: 'Business Travel',
          status: 'Approved',
          userId: 3,
          passportNumber: '121HU3H3U32',
          passportName: 'Robin Hood',
          gender: 'MALE',
          role: 'Requester',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          from: 'Accra, Ghana',
          travelDate: ['2020-08-01'],
          returnDate: '2020-12-12',
          reason: 'Important meeting in lagos',
          status: 'Approved',
          userId: 5,
          passportNumber: '121HU3H3U32',
          passportName: 'Kluas Schwab',
          gender: 'MALE',
          role: 'Requester',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          from: 'Manilla, Philippines',
          travelDate: ['2020-07-01'],
          returnDate: '2020-07-12',
          reason: 'Business Travel',
          status: 'Pending',
          userId: 2,
          passportNumber: '121HU3H3U32',
          passportName: 'Seth Oche',
          gender: 'MALE',
          role: 'Requester',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          from: 'Nairobi, Kenya',
          travelDate: ['2020-04-01', '2020-05-21'],
          returnDate: '2020-07-12',
          reason: 'Still figuring this out',
          status: 'Approved',
          userId: 3,
          passportNumber: '121HU3H3U32',
          passportName: 'Noro Grace',
          gender: 'FEMALE',
          role: 'Requester',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          from: 'Johannesburg, South Africa',
          travelDate: ['2020-09-01', '2020-10-01'],
          returnDate: '2020-11-12',
          reason: 'I want to checkout the nile crocodiles',
          status: 'Approved',
          userId: 3,
          passportNumber: '121HU3H3U32',
          passportName: 'Nelson Mandela',
          gender: 'MALE',
          role: 'Requester',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          from: 'Lagos, Nigeria',
          travelDate: ['2020-06-21'],
          returnDate: '2020-09-12',
          reason: "This is confidential you don't wanna know",
          status: 'Approved',
          userId: 4,
          passportNumber: '121HU3H3U32',
          passportName: 'Victor Aiyeola',
          gender: 'MALE',
          role: 'Requester',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Requests', null, {})
};
