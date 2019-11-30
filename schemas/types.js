const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt} = graphql;

/**
 * Users Table mapping in GraphQL
 * @type {GraphQLObjectType<any, any, {[p: string]: any}>}
 */
const UserType = new GraphQLObjectType({
    name: "User",
    type: "Query",
    fields: {
        id: {type: GraphQLInt},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
    }
});

/**
 * Project table mapping in GraphQL
 * @type {GraphQLObjectType<any, any, {[p: string]: any}>}
 */
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    type: 'Query',
    fields: {
        id: {type: GraphQLInt},
        author_id: {type: GraphQLInt},
        created_at: {type: GraphQLString},
        title: {type: GraphQLString},
        description: {type: GraphQLString}
    }
});

// types.UserType is to get it out of the require object
module.exports = { UserType, ProjectType };
