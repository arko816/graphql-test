const { gql } = require('apollo-server-express');

const vcTypeDefs = gql`
  type Category {
    name: String
    description: String
    createdAt: String
  }
  
  input CategoryInput {
    name: String
    description: String
  }
  
  type Query {
    category(ID: ID!): Category   
    getCategory(amount: Int): [Category]
  }
  
  type Mutation {
    createCategory(CategoryInput: CategoryInput): Category
    deleteCategory(ID: ID!): Boolean
    editCategory(ID: ID!, CategoryInput: CategoryInput): Boolean
  }
`;

module.exports = vcTypeDefs;
