const graphql = require('graphql');
const { db } = require('../model/database');
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLBoolean } = graphql;
const { ProjectType, UserType } = require('./types');

const RootMutation = new GraphQLObjectType({
    name: "RootMutationType",
    type: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
              firstname: { type: GraphQLString },
              lastname: { type: GraphQLString },
              email: { type: GraphQLString },
              age: { type: GraphQLInt }
            },
            resolve(parentValue, args) {
                const query = `INSERT INTO users(firstname, lastname, email, age) VALUES($1, $2, $3, $4) RETURNING *;`;
                const values = Object.keys(args).map(key => {return args[key]});

                return db
                    .one(query, values)
                    .then(res => {
                        console.log(`SUCCESS: ${JSON.stringify(res)}`);
                        return res;
                    })
                    .catch(err => {
                        console.log(`ERROR: ${err}`);
                        return err;
                    });
            }
        },
        addProject: {
            type: ProjectType,
            args: {
                author_id: { type: GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString }
            },
            resolve(parentValue, args){
                // Note RETURNING *, it was previously RETURNING title, which then disallows for user to adapt the query and
                // ask for description (for example), or any other columns
                // by changing 'title' to an asterix now all data becomes available
                const query = `INSERT INTO project(author_id, created_at, title, description) VALUES ($1, $2, $3, $4) RETURNING *;`;
                const values = [
                    args.author_id,
                    new Date(),
                    args.title,
                    args.description
                ];

                return db
                    .one(query, values)
                    .then(res => {
                        console.log(`SUCCESS: ${JSON.stringify(res)}`);
                        return [res];
                    })
                    .catch(err => {
                        console.log(`ERROR: ${err}`);
                        return err;
                    });
            }
        }
    }
});

exports.mutation = RootMutation;
