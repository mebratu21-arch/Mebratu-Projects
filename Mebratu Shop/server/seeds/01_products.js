exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {id: 1, title: 'Ethiopian Coffee', description: 'Premium Yirgacheffe coffee beans.', price: 29.99, is_active: true},
        {id: 2, title: 'Traditional Scarf', description: 'Hand-woven cotton scarf.', price: 45.00, is_active: true},
        {id: 3, title: 'Leather Wallet', description: 'Genuine leather handcrafted wallet.', price: 35.50, is_active: true}
      ]);
    });
};
