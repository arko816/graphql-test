const Product = require('../models/Recipe');
const Category = require('../models/Category');

module.exports = {
  Query: {
    async product(_, { ID }) {
      return await Product.findById(ID);
    },
    async getProduct(_, { amount }) {
      return await Product.find().sort({ createdAt: -1 }).limit(amount);
    },
    async getProductsAndCategories(_, { amount, description }) {
        try {
          const productsWithCategories = await Product.aggregate([
            { $match: { description: description } }, // Filter by description
            {
              $lookup: {
                from: 'categories',
                let: { productDescription: '$description' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$name', '$$productDescription'] } } },
                ],
                as: 'category',
              },
            },
            { $sort: { createdAt: -1 } },
            { $limit: amount },
          ]);
  
          return productsWithCategories;
        } catch (error) {
          console.error('Error fetching products with categories:', error);
          throw new Error('Failed to fetch products with categories');
      }
    },
  },
  Mutation: {
    async createProduct(_, { ProductInput: { name, description } }) {
      const createProduct = new Product({
        name: name,
        description: description,
        createdAt: new Date().toISOString(),
      });
      const res = await createProduct.save();
      return res; // Return the entire 'res' object
    },
    async deleteProduct(_, { ID }) {
      const wasDeleted = (await Product.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },
    async editProduct(_, { ID, ProductInput: { name, description } }) {
      const wasEdited = (await Product.updateOne({ _id: ID }, { name: name, description: description })).modifiedCount;
      return wasEdited;
    },
  },
};
