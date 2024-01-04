const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const gql = require('graphql-tag');
const mongoose=require('mongoose')
const MONGODB="mongodb+srv://arko:1234@cluster0.c2tetrx.mongodb.net/?retryWrites=true&w=majority"

const veTypeDefs = require('./graphql/typeDefs');
const resolvers=require('./graphql/resolvers');
const app = express();
// const app = express();
async function startServer() {
  
//   app.use(cors()); // Enable CORS middleware

  const server = new ApolloServer({
    typeDefs: veTypeDefs,
    resolvers: resolvers,
    // context: ({ req }) => createApolloContext({ req }),
  });

  await server.start(); // Start the Apollo Server

  // Apply Apollo Server middleware to Express app
  server.applyMiddleware({ app });

  const port = process.env.APP_SERVICE_PORT || 8001;
  app.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
}

startServer().catch(error => {
  console.error('Error starting server:', error);
});
// const server= new ApolloServer({
//     typeDefs: veTypeDefs,
//     resolvers: resolvers,
//     context: ({ req }) => createApolloContext({ req }),
// });

mongoose.connect(MONGODB)
// .then(()=>{
//     console.log('Mongodb connection established');
//     // return server.listen({port:5000});
// })
// .then((res)=>{
//     console.log(`Server running at ${res.url}`);
// })


// const port = process.env.APP_SERVICE_PORT || 8001;
// app.listen(port, () => {
//     console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
//   });
