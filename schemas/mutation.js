const graphql = require('graphql');
const { db } = require('../model/database');
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLBoolean } = graphql;
const { ProjectType } = require('./types');

const RootMutation = new GraphQLObjectType({
    name: "RootMutationType",
    type: "Mutation",
    fields: {
        addProject: {
            type: ProjectType,
            args: {
                author_id: { type: GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString }
            },
            resolve(parentValue, args){
                const query = `INSERT INTO project(author_id, created_at, title, description) VALUES ($1, $2, $3, $4) RETURNING title`;
                const values = [
                    args.author_id,
                    new Date(),
                    args.title,
                    args.description
                ];

                return db
                    .one(query, values)
                    .then(res => {
                        console.log(`SUCCESS: ${res}`);
                        return res;
                    })
                    .catch(err => {
                        console.log(`ERROR: ${err}`);
                        return err;
                    });
            }
        }
    }
});

module.exports = RootMutation;
