const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

const MONGODB = "mongodb+srv://arko:1234@cluster0.c2tetrx.mongodb.net/?retryWrites=true&w=majority";

const veTypeDefs = require('./graphql/typeDefs');
const vcTypeDefs = require('./graphql/typeDefsc');
const resolvers = require('./graphql/resolvers');
const resolversc = require('./graphql/resolversc');

const app = express();

async function startServer() {
  // Merge type definitions and resolvers
  const mergedTypeDefs = mergeTypeDefs([veTypeDefs, vcTypeDefs]);
  const mergedResolvers = mergeResolvers([resolvers, resolversc]);

  const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
  });

  await server.start(); // Start the Apollo Server

  // Apply Apollo Server middleware to Express app
  server.applyMiddleware({ app });

  const port = process.env.APP_SERVICE_PORT || 8001;
  app.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});

mongoose.connect(MONGODB);

