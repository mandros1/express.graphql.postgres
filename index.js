"use strict";
const dotenv = require('dotenv').config();

const express = require('express');
const graphql = require('graphql');
const expressGraphql = require('express-graphql');

const { GraphQLSchema } = graphql;
const { query } = require('./schemas/queries');
const { mutation } = require('./schemas/mutation');

// Port on which to run the Node API
const port = process.env.API_PORT || 3005;

// schemas have to be named query and mutation since that is, along with Subscriptions the default naming of the processes
//      that is why we need to watch out under which name we export the created schemas in the ./schemas folder
const schema = new GraphQLSchema({
    query,
    mutation
});


// Create express server
const app = express();

// Add graphQL into the express middleware Only need schema and UI interface, resolvers not needed since they are implemented directly into the provided schemas
app.use('/graphql', expressGraphql({
    schema: schema,
    graphiql: true
}));


app.listen(port, () => {
    console.log(`Server is running and is listening at port ${ port }`);
});
