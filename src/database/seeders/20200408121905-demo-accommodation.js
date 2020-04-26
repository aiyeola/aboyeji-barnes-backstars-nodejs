/* eslint-disable no-unused-vars */
/* eslint-disable implicit-arrow-linebreak */
export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Accommodations',
      [
        {
          name: 'HOTEL',
          status: 'Available',
          imageUrl: [
            'https://res.cloudinary.com/dkabisw/image/upload/v1574765143/apl2muykitqk5kf6pnjg.jpg',
            'https://res.cloudinary.com/dkabisw/image/upload/v1574961322/xr4b5emlpudqh1l9yrpa.jpg',
            'https://res.cloudinary.com/dkabisw/image/upload/v1574765130/eqjambzo4x2qcyxs3cyi.jpg',
            'https://res.cloudinary.com/dkabisw/image/upload/v1574765136/o7mslrt3aukrgrqrekyz.jpg'
          ],
          locationId: 1,
          owner: 9,
          amenities: ['Gym', 'Sauna', 'Steam bath', 'Spa', 'Free Wifi'],
          services: [
            'Free breakfast',
            'Room Delivery',
            'Free parking',
            'Snart Rooms'
          ],
          mapLocations: JSON.stringify({
            lat: -1.9705786,
            lng: 30.10442880000005
          }),
          description:
            'The space will be entirely yours. It is in a compound of similar apartments where people mind their own business. There is a gateman at the place 24 hours and you can go in and out at any point. You do not share facilities with anyone.',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Accommodations', null, {})
};
