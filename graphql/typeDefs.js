const { gql } = require('apollo-server-express');

const veTypeDefs = gql`
  type Product {
    _id: ID
    name: String
    description: String
    createdAt: String
    category: [Category]
  }

  input ProductInput {
    name: String
    description: String
  }

  type Category {
    _id: ID
    name: String
    description: String  
    createdAt: String
  }

  type Query {
    product(ID: ID!): Product!
    getProduct(amount: Int): [Product]
    getProductsAndCategories(amount: Int, description: String): [Product]
  }

  type Mutation {
    createProduct(ProductInput: ProductInput): Product
    deleteProduct(ID: ID!): Boolean
    editProduct(ID: ID!, ProductInput: ProductInput): Boolean
  }
`;

module.exports = veTypeDefs;
