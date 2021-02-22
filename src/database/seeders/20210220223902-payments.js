'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Payments', [{
      id:1,
      name:"Efectivo",
      description:"Consiste en pagar un bien o servicio con dinero físico, con un cheque bancario al portador o con algún otro medio físico similar."
      },
      {
        id:2,
        name:"Tarjeta de débito",
        description:"Con la tarjeta de débito el dinero sale de tu cuenta en el momento en que realizás el pago. "
      },
      {
        id:3,
        name:"Tarjeta de crédito",
        description:"La tarjeta de crédito es un préstamo, por lo que podés gastar hoy y pagar al mes siguiente, o en cuotas a lo largo de varios meses. Como todos los préstamos, esta forma de pagar tiene costos (intereses y comisiones) que aumentan el precio de lo que compraste."
      },
      {
        id:4,
        name:"Mercado Pago",
        description:"A través de Mercado Pago, tus clientes pueden pagar con tarjetas de crédito, con transferencia bancaria e incluso en efectivo. A su vez, además de simplificar tus cobros, facilita a tus clientes el acceso a promociones y servicios financieros sin comisiones ni gastos extras y sin riesgos de ningún tipo."
      }], {});
    },
    
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Payments', null, {});
  }
};
