'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Shops', [
      {
        id:1,
        name: 'Artis Kraken',
        phone: '+541126790610',
        email: 'info@artiskraken.com.ar',
        avatar: 'default-shop.jpg',
        ranking: 10,
        status: 'active',
        sales: 0,
        bio: 'Tienda administradora de sitio',
        facebook: 'https://www.facebook.com/',
        instagram: 'https://www.instagram.com/',
        twitter: 'https://www.twitter.com/',
        createdAt: '2021-01-23 20:52:27',
        updatedAt: '2021-01-23 20:52:27'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Shops', null, {});
  }
};