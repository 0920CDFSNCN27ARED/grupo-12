'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [{
      id:1,
      name: "Premium Beer",
      description: "La cerveza artesana belga Delirium Tremens tiene todo lo que una cerveza belga de estilo strong blond necesita. Aunque elevada en contenido alcohólico 8,5%, la Delirium Tremens tiene un sabor suave a malta, algo espaciado. Su gran cantidad de carbónico con grandes burbujas que explotan en la boca la hacen muy refrescante y la espuma es prominente y duradera. Se trata de una cerveza perfectamente equilibrada con un regusto fuerte y duradero algo seco.",
      details: "Esta es una cerveza artesana belga de producción familiar. Delirium Tremens tiene hasta seis tipos más. Cervezas blond, afrutadas, tostadas y negras, que convierten a esta cervecera artesanal en una de las mejores cervecerías artesanas del mundo.",
      brewery: "Delirium, Belgica",
      price: 570,
      discount: 50,
      stock: 4,
      ibu: "7.5",
      og: "1010",
      abv: "1.2",
      avatar: "avatar-1610639734274.png",
      gallery01:"gallery-1610639782549.jpg",
      gallery02:"gallery-1610639782550.jpg",
      gallery03:"gallery-1610639782553.jpg",
      shopId: 1,
      typeId: 1,
      categoryId: 1,
    }], {})
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {}); 
  }
};
