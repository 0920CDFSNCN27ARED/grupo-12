// Seteando variables de entorno ----------------------------------------------

1. Actualizamos dependencias > npm install (para usar el paquete dotenv)
2. Crear un archivo llamado ".env" en la carpeta src y asignar los valores 
correspondientes a las variables:

// Este es un ejemplo
USERNAME=root
PASSWORD=root
DATABASE=artis_db
HOST=127.0.0.1
DIALECT=mysql
DB_PORT=3306

// Generando DB, models y seeders --------------------------------------

1. Borrar DB si es que existe >> sequelize db:drop
2. Correr sequelize db:create
3. Correr sequelize db:migrate
4. Correr sequelize db:seed:all
5. Inicializar proyecto npm test
6. Ingresar con 
    user: admin@artiskraken.com.ar 
    pass: 12345678


// Generando seeders --------------------------------------------------

sequelize seed:generate

sequelize seed:generate --name admin-user
sequelize seed:generate --name types
sequelize seed:generate --name categories

// Util Commands--------------------------------------------------------

npm i mysql2 -g (para que tome cli-sequelize)
sequelize db:migrate (para correr migraciones)

// Ejemplo para agregar una columna ------------------------------------

1. Crear la migracion
sequelize migration:create --name modify_categories_add_new_field_typeId

2. Modificar la migracion 
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
        'Categories', // table name
        'typeId', // new field name
        {
          type: Sequelize.INTEGER,
          references: { model: 'categories', key: 'id' }
        },
    ) 
  }
};

3. Ejecular la migracion 
sequelize db:migrate

4. Running Seeds
sequelize db:seed:all

// Models create --------------------------------------------------------

Users
sequelize model:generate --name User --attributes name:string,userName:string,phone:string,email:string,password:string,avatar:string,admin:boolean,status:string,role:string,bio:string,facebook:string,instagram:string,twiter:string,shopId:integer,orderId:integer

Categories
sequelize model:generate --name Category --attributes name:string,description:string,count:integer,typeId:integer

Comments
sequelize model:generate --name Comment --attributes comment:string,date:dateonly,userId:integer,productId:integer

Types
sequelize model:generate --name Type --attributes name:string,description:string,count:integer

Shops
sequelize model:generate --name Shop --attributes name:string,phone:string,email:string,avatar:string,ranking:integer,status:string,sales:integer,bio:string,facebook:string,instagram:string,twiter:string

Products
sequelize model:generate --name Product --attributes name:string,description:string,details:string,brewery:string,price:float,discount:float,stock:integer,ibu:float,og:float,abv:float,avatar:string,gallery01:string,gallery02:string,gallery03:string,shopId:integer,typeId:integer,categoryId:integer

Payment
sequelize model:generate --name Payment --attributes name:string,description:string

Order
sequelize model:generate --name Order --attributes email:string,totalProducts:string,totalShipping:integer,discountCoupon:string,tax:integer,total:integer,status:string,userId:integer,cartItemsId:integer,paymentId:integer,couponId:integer,shippingMethodId:integer,billAddressId:integer,shippingAddressId:integer

CartItem
sequelize model:generate --name CartItem --attributes subtotal:integer,quantity:integer,price:integer,discount:integer,expireTime:date,productId:integer,orderId:integer

ShippingMethod
sequelize model:generate --name ShippingMethod --attributes name:string,amount:integer,description:string,location:string

Addresses
sequelize model:generate --name Address --attributes fullName:string,address1:string,address2:string,city:string,state:string,postalCode:string,country:string,userId:integer

Coupons
sequelize model:generate --name Coupon --attributes name:string,description:string,discount:integer,couponCode:string

orderStatus
sequelize model:generate --name OrderStatus --attributes name:string,description:string

// Seeders create --------------------------------------------------------

sequelize seed:generate --name admin-user
