exports.up = async function(knex) {
  const hasTitle = await knex.schema.hasColumn('products', 'title');
  const hasPrice = await knex.schema.hasColumn('products', 'price');
  const hasDesc = await knex.schema.hasColumn('products', 'description');
  const hasActive = await knex.schema.hasColumn('products', 'is_active');

  await knex.schema.table('products', table => {
    if (!hasTitle) table.string('title');
    if (!hasPrice) table.decimal('price', 10, 2);
    if (!hasDesc) table.text('description');
    if (!hasActive) table.boolean('is_active').defaultTo(true);
  });
};

exports.down = function(knex) {
  // We generally don't remove columns in down if they might have existed, 
  // but for this task we can leave it empty or revert.
};
