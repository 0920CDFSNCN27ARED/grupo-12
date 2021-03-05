'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id:1,
        name: 'Artis Kraken',
        userName: 'artis.kraken',
        phone: '+541126790610',
        email: 'admin@artiskraken.com.ar',
        dni: null,
        password: '$2b$10$iVndD6XNtV89tpz.nRx6SuZna8My/PZMPbiXEO9mQ.HZoCmN92BSK',
        avatar: 'default-avatar.png',
        admin: true,
        status: 'active',
        role: 'seller',
        bio: 'Usuario administrador de sitio',
        facebook: 'https://www.facebook.com/',
        instagram: 'https://www.instagram.com/',
        twitter: 'https://www.twitter.com/',
        shopId: 1,
        createdAt: '2021-01-23 20:52:27',
        updatedAt: '2021-01-23 20:52:27'
      },
      {
        id:2,
        name: 'Test User',
        userName: 'test.user',
        phone: '+541126790610',
        email: 'user@artiskraken.com.ar',
        dni: null,
        password: '$2b$10$iVndD6XNtV89tpz.nRx6SuZna8My/PZMPbiXEO9mQ.HZoCmN92BSK',
        avatar: 'default-avatar.png',
        admin: false,
        status: 'active',
        role: 'buyer',
        bio: 'Usuario de prueba',
        facebook: 'https://www.facebook.com/',
        instagram: 'https://www.instagram.com/',
        twitter: 'https://www.twitter.com/',
        shopId: null,
        createdAt: '2021-01-23 20:52:27',
        updatedAt: '2021-01-23 20:52:27'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
