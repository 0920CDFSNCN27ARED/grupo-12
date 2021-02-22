'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ShippingMethods', [{
      id:1,
      name:"Envío a domicilio",
      amount:450,
      description:"Es una actividad parte de la función logística que tiene por finalidad colocar bienes, servicios, fondos o información directo en el lugar de consumo o uso (al cliente final).",
      location:"Dirección del cliente"
      },
      {
        id:2,
        name:"Arreglo con el vendedor",
        amount:null,
        description:"Consiste entre en un arreglo privado entre la tienda y el consumidor final.",
        location:"Undifined"
      },
      {
        id:3,
        name:"Retiro por el correo más cercano",
        amount:450,
        description:"El cliente debe seleccionar un correo cercano para recibir su pedido. Cuando llegue el pedido al correo será notificado.",
        location:"Undifined"
      }], {});
    },
    
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ShippingMethods', null, {});
  }
};
