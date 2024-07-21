// insertData.js

const sqlite3 = require('sqlite3').verbose();
const db = require('./database');

// const products = [
//     { barcode: '1MBA070101', name: 'Mazaya Brukat Atasan Baby Grey All Size', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070102', name: 'Mazaya Brukat Atasan Baby Grey XL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070103', name: 'Mazaya Brukat Atasan Baby Grey XXL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070201', name: 'Mazaya Brukat Atasan Baby Nude All Size', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070202', name: 'Mazaya Brukat Atasan Baby Nude XL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070203', name: 'Mazaya Brukat Atasan Baby Nude XXL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070301', name: 'Mazaya Brukat Atasan Caramello All Size', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070302', name: 'Mazaya Brukat Atasan Caramello XL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070303', name: 'Mazaya Brukat Atasan Caramello XXL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070401', name: 'Mazaya Brukat Atasan Choco All Size', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070402', name: 'Mazaya Brukat Atasan Choco XL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070403', name: 'Mazaya Brukat Atasan Choco XXL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070501', name: 'Mazaya Brukat Atasan Dusty Pink All Size', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070502', name: 'Mazaya Brukat Atasan Dusty Pink XL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070503', name: 'Mazaya Brukat Atasan Dusty Pink XXL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070601', name: 'Mazaya Brukat Atasan Ice Blue All Size', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070602', name: 'Mazaya Brukat Atasan Ice Blue XL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070603', name: 'Mazaya Brukat Atasan Ice Blue XXL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070701', name: 'Mazaya Brukat Atasan Matcha All Size', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070702', name: 'Mazaya Brukat Atasan Matcha XL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070703', name: 'Mazaya Brukat Atasan Matcha XXL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070801', name: 'Mazaya Brukat Atasan Salem Cream All Size', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070802', name: 'Mazaya Brukat Atasan Salem Cream XL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070803', name: 'Mazaya Brukat Atasan Salem Cream XXL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071101', name: 'Mazaya Brukat Atasan Salem Moca All Size', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071102', name: 'Mazaya Brukat Atasan Salem Moca XL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071103', name: 'Mazaya Brukat Atasan Salem Moca XXL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070901', name: 'Mazaya Brukat Atasan Salem Pink All Size', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070902', name: 'Mazaya Brukat Atasan Salem Pink XL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA070903', name: 'Mazaya Brukat Atasan Salem Pink XXL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071001', name: 'Mazaya Brukat Atasan Salem White All Size', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071002', name: 'Mazaya Brukat Atasan Salem White XL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071003', name: 'Mazaya Brukat Atasan Salem White XXL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071401', name: 'Mazaya Brukat Atasan Smokey Pink All Size', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071402', name: 'Mazaya Brukat Atasan Smokey Pink XL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071403', name: 'Mazaya Brukat Atasan Smokey Pink XXL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071201', name: 'Mazaya Brukat Atasan Soft Grey 01 All Size', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071202', name: 'Mazaya Brukat Atasan Soft Grey 01 XL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071203', name: 'Mazaya Brukat Atasan Soft Grey 01 XXL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071303', name: 'Mazaya Brukat Atasan Soft Grey 02 All Size', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071304', name: 'Mazaya Brukat Atasan Soft Grey 02 XL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071305', name: 'Mazaya Brukat Atasan Soft Grey 02 XXL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071501', name: 'Mazaya Brukat Atasan Stone All Size', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071502', name: 'Mazaya Brukat Atasan Stone XL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071503', name: 'Mazaya Brukat Atasan Stone XXL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071601', name: 'Mazaya Brukat Atasan Violet All Size', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071602', name: 'Mazaya Brukat Atasan Violet XL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 },
//     { barcode: '1MBA071603', name: 'Mazaya Brukat Atasan Violet XXL', category: 'Atasan', hpp: 90000, selling_price: 128000, quantity: 0 }
//   ];
  
const products = [
  { barcode: '5KOS250201', name: 'Keira One Set Baby Mocca All Size', category: 'One Set', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '5KOS250202', name: 'Keira One Set Baby Mocca XL', category: 'One Set', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '5KOS250301', name: 'Keira One Set Baby Pink All Size', category: 'One Set', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '5KOS250302', name: 'Keira One Set Baby Pink XL', category: 'One Set', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '5KOS250401', name: 'Keira One Set Black All Size', category: 'One Set', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '5KOS250402', name: 'Keira One Set Black XL', category: 'One Set', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '5KOS250501', name: 'Keira One Set Choco All Size', category: 'One Set', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '5KOS250502', name: 'Keira One Set Choco XL', category: 'One Set', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '5KOS250601', name: 'Keira One Set Ivory All Size', category: 'One Set', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '5KOS250602', name: 'Keira One Set Ivory XL', category: 'One Set', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '5KOS250701', name: 'Keira One Set Milo All Size', category: 'One Set', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '5KOS250702', name: 'Keira One Set Milo XL', category: 'One Set', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '5KOS250901', name: 'Keira One Set Powder Blue All Size', category: 'One Set', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '5KOS250902', name: 'Keira One Set Powder Blue XL', category: 'One Set', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '5KOS251001', name: 'Keira One Set Stone All Size', category: 'One Set', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '5KOS251002', name: 'Keira One Set Stone XL', category: 'One Set', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '5KOS250801', name: 'Keira One Set Turkish All Size', category: 'One Set', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '5KOS250802', name: 'Keira One Set Turkish XL', category: 'One Set', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '3KS340101', name: 'Keira Skirt Baby Cream All Size', category: 'Skirt', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '3KS340102', name: 'Keira Skirt Baby Cream XL', category: 'Skirt', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '3KS340201', name: 'Keira Skirt Baby Mocca All Size', category: 'Skirt', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '3KS340202', name: 'Keira Skirt Baby Mocca XL', category: 'Skirt', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '3KS340301', name: 'Keira Skirt Baby Pink All Size', category: 'Skirt', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '3KS340302', name: 'Keira Skirt Baby Pink XL', category: 'Skirt', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '3KS340401', name: 'Keira Skirt Black All Size', category: 'Skirt', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '3KS340402', name: 'Keira Skirt Black XL', category: 'Skirt', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '3KS340501', name: 'Keira Skirt Choco All Size', category: 'Skirt', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '3KS340502', name: 'Keira Skirt Choco XL', category: 'Skirt', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '3KS340601', name: 'Keira Skirt Ivory All Size', category: 'Skirt', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '3KS340602', name: 'Keira Skirt Ivory XL', category: 'Skirt', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '3KS340701', name: 'Keira Skirt Milo All Size', category: 'Skirt', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '3KS340702', name: 'Keira Skirt Milo XL', category: 'Skirt', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '3KS340901', name: 'Keira Skirt Powder Blue All Size', category: 'Skirt', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '3KS340902', name: 'Keira Skirt Powder Blue XL', category: 'Skirt', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '3KS341001', name: 'Keira Skirt Stone All Size', category: 'Skirt', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '3KS341002', name: 'Keira Skirt Stone XL', category: 'Skirt', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '3KS340801', name: 'Keira Skirt Turkish All Size', category: 'Skirt', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '3KS340802', name: 'Keira Skirt Turkish XL', category: 'Skirt', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '1KV330101', name: 'Keira Vest Baby Cream All Size', category: 'Atasan', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '1KV330102', name: 'Keira Vest Baby Cream XL', category: 'Atasan', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '1KV330201', name: 'Keira Vest Baby Mocca All Size', category: 'Atasan', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '1KV330202', name: 'Keira Vest Baby Mocca XL', category: 'Atasan', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '1KV330301', name: 'Keira Vest Baby Pink All Size', category: 'Atasan', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '1KV330302', name: 'Keira Vest Baby Pink XL', category: 'Atasan', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '1KV330401', name: 'Keira Vest Black All Size', category: 'Atasan', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '1KV330402', name: 'Keira Vest Black XL', category: 'Atasan', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '1KV330501', name: 'Keira Vest Choco All Size', category: 'Atasan', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '1KV330502', name: 'Keira Vest Choco XL', category: 'Atasan', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '1KV330601', name: 'Keira Vest Ivory All Size', category: 'Atasan', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '1KV330602', name: 'Keira Vest Ivory XL', category: 'Atasan', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '1KV330701', name: 'Keira Vest Milo All Size', category: 'Atasan', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '1KV330702', name: 'Keira Vest Milo XL', category: 'Atasan', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '1KV330901', name: 'Keira Vest Powder Blue All Size', category: 'Atasan', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '1KV330902', name: 'Keira Vest Powder Blue XL', category: 'Atasan', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '1KV331001', name: 'Keira Vest Stone All Size', category: 'Atasan', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '1KV331002', name: 'Keira Vest Stone XL', category: 'Atasan', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '1KV330801', name: 'Keira Vest Turkish All Size', category: 'Atasan', hpp: 0, selling_price: 0, quantity: 0 },
  { barcode: '1KV330802', name: 'Keira Vest Turkish XL', category: 'Atasan', hpp: 0, selling_price: 0, quantity: 0 }
];



db.serialize(() => {
  const sql = 'INSERT INTO produk (barcode, name, category, hpp, selling_price, quantity) VALUES (?, ?, ?, ?, ?, ?)';

  const stmt = db.prepare(sql);

  products.forEach((product) => {
    stmt.run(product.barcode, product.name, product.category, product.hpp, product.selling_price, product.quantity, (err) => {
      if (err) {
        console.error(`Error inserting ${product.name}:`, err.message);
      } else {
        console.log(`Inserted ${product.name} successfully`);
      }
    });
  });

  stmt.finalize();

  db.close();
});
