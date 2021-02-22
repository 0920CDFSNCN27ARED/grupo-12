'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [{
      id:1,
      name: "Premium Beer",
      description: "La cerveza artesana belga Delirium Tremens tiene todo lo que una cerveza belga de estilo strong blond necesita.",
      details: "Cervezas blond, afrutadas, tostadas y negras, que convierten a esta cervecera artesanal en una de las mejores cervecerías artesanas del mundo.",
      brewery: "Delirium, Belgica",
      price: 250,
      discount: 0,
      stock: 4,
      ibu: 7.52,
      og: 1010.00,
      abv: 1.23,
      avatar: "product-01.png",
      gallery01:"product-gallery-01.jpg",
      gallery02:"product-gallery-02.jpg",
      gallery03:"product-gallery-03.jpg",
      shopId: 1,
      typeId: 1,
      categoryId: 1,
      createdAt: '2021-01-23 20:52:27',
      updatedAt: '2021-01-23 20:52:27'
    },
    {
      id:2,
      name: "Apa Beer",
      description: "La cerveza artesana belga Delirium Tremens tiene todo lo que una cerveza belga de estilo strong blond necesita.",
      details: "Cervezas blond, afrutadas, tostadas y negras, que convierten a esta cervecera artesanal en una de las mejores cervecerías artesanas del mundo.",
      brewery: "Delirium, Belgica",
      price: 450,
      discount: 50,
      stock: 4,
      ibu: 7.52,
      og: 1010.00,
      abv: 1.23,
      avatar: "product-02.png",
      gallery01:"product-gallery-04.jpg",
      gallery02:"product-gallery-05.jpg",
      gallery03:"product-gallery-06.jpg",
      shopId: 1,
      typeId: 2,
      categoryId: 6,
      createdAt: '2021-01-23 20:52:27',
      updatedAt: '2021-01-23 20:52:27'
    },
    {
      id:3,
      name: "Ipa Beer",
      description: "La cerveza artesana belga Delirium Tremens tiene todo lo que una cerveza belga de estilo strong blond necesita.",
      details: "Cervezas blond, afrutadas, tostadas y negras, que convierten a esta cervecera artesanal en una de las mejores cervecerías artesanas del mundo.",
      brewery: "Delirium, Belgica",
      price: 389,
      discount: 0,
      stock: 4,
      ibu: 7.52,
      og: 1010.00,
      abv: 1.23,
      avatar: "product-03.png",
      gallery01:"product-gallery-07.jpg",
      gallery02:"product-gallery-08.jpg",
      gallery03:"product-gallery-09.jpg",
      shopId: 1,
      typeId: 2,
      categoryId: 7,
      createdAt: '2021-01-23 20:52:27',
      updatedAt: '2021-01-23 20:52:27'
    },
    {
      id:4,
      name: "German Beer",
      description: "La cerveza artesana belga Delirium Tremens tiene todo lo que una cerveza belga de estilo strong blond necesita.",
      details: "Cervezas blond, afrutadas, tostadas y negras, que convierten a esta cervecera artesanal en una de las mejores cervecerías artesanas del mundo.",
      brewery: "Delirium, Belgica",
      price: 356.45,
      discount: 50.56,
      stock: 4,
      ibu: 7.52,
      og: 1010.0,
      abv: 1.23,
      avatar: "product-04.png",
      gallery01:"product-gallery-10.jpg",
      gallery02:"product-gallery-01.jpg",
      gallery03:"product-gallery-02.jpg",
      shopId: 1,
      typeId: 1,
      categoryId: 5,
      createdAt: '2021-01-23 20:52:27',
      updatedAt: '2021-01-23 20:52:27'
    }
  
  ], {})
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {}); 
  }
};
