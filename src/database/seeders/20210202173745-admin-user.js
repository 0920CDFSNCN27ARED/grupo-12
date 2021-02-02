'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        name: 'Artis Kraken',
        userName: 'artis.kraken',
        phone: '+541126790610',
        email: 'admin@artiskraken.com.ar',
        password: '$2b$10$iVndD6XNtV89tpz.nRx6SuZna8My/PZMPbiXEO9mQ.HZoCmN92BSK',
        avatar: 'default-avatar.png',
        admin: true,
        status: 'active',
        role: 'buyer',
        bio: 'Usuario administrador de sitio',
        facebook: '',
        instagram: '',
        twiter: '',
        shopId: null,
        orderId: null,
        createdAt: '2021-01-23 20:52:27',
        updatedAt: '2021-01-23 20:52:27'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
