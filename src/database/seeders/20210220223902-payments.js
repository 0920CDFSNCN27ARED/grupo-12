'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Payments', [{
      id:1,
      name:"Efectivo",
      description:"Consiste en pagar un bien o servicio con dinero físico, con un cheque bancario al portador o con algún otro medio físico similar.",
      createdAt: '2021-01-23 20:52:27',
      updatedAt: '2021-01-23 20:52:27'
      },
      {
        id:2,
        name:"Tarjeta de débito",
        description:"Con la tarjeta de débito el dinero sale de tu cuenta en el momento en que realizás el pago.",
        createdAt: '2021-01-23 20:52:27',
        updatedAt: '2021-01-23 20:52:27'
      },
      {
        id:3,
        name:"Tarjeta de crédito",
        description:"La tarjeta de crédito es un préstamo, por lo que podés gastar hoy y pagar al mes siguiente, o en cuotas a lo largo de varios meses.",
        createdAt: '2021-01-23 20:52:27',
        updatedAt: '2021-01-23 20:52:27'
      },
      {
        id:4,
        name:"Mercado Pago",
        description:"A través de Mercado Pago, tus clientes pueden pagar con tarjetas de crédito, con transferencia bancaria e incluso en efectivo.",
        createdAt: '2021-01-23 20:52:27',
        updatedAt: '2021-01-23 20:52:27'
      }], {});
    },
    
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Payments', null, {});
  }
};
