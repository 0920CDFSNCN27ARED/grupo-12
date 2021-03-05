'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ShippingMethods', [{
        id: 1,
        name: "Envío a domicilio",
        amount: 300.20,
        description: "Envio al domicilio dl cliente.",
        location: "Dirección del cliente",
        createdAt: '2021-01-23 20:52:27',
        updatedAt: '2021-01-23 20:52:27'
      },
      {
        id: 2,
        name: "Arreglo con el vendedor",
        amount: null,
        description: "Consiste entre en un arreglo privado entre la tienda y el consumidor final.",
        location: "Domicilio del vendedor",
        createdAt: '2021-01-23 20:52:27',
        updatedAt: '2021-01-23 20:52:27'
      },
      {
        id:3,
        name: "Retiro por el correo más cercano",
        amount: 450,
        description: "El cliente debe seleccionar un correo cercano para recibir su pedido. Cuando llegue el pedido al correo será notificado.",
        location: "Correo",
        createdAt: '2021-01-23 20:52:27',
        updatedAt: '2021-01-23 20:52:27'
      }], {});
    },
    
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ShippingMethods', null, {});
  }
};
