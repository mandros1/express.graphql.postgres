const {db} = require('../model/database');
const {GraphQLObjectType, GraphQLID} = require('graphql');
const {ProjectType, UserType} = require('./types');

const RootQueries = new GraphQLObjectType({
    name: 'RootQueryType',
    type: 'Query',
    fields: {
        project: {
            type: ProjectType,
            args: {id: {type: GraphQLID} },
            resolve(parentValue, args) {
                const query = `SELECT * FROM project WHERE id=$1`;
                const values = [args.id];

                return db
                    .one(query, values)
                    .then(res => {
                        console.log(`Success with data: ${res}`);
                        return res
                    })
                    .catch(err => {
                        console.log(`Error has occured: ${err}`);
                        return err;
                    })
            }
        },
        user: {
            type: UserType,
            args: {id: {type: GraphQLID} },
            resolve(parentValue, args) {
                const query = `SELECT * FROM users WHERE id=$1`;
                const values = [args.id];

                return db
                    .one(query, values)
                    .then(res => {
                        console.log(`Success with data: ${res}`);
                        return res;
                    })
                    .catch(err => {
                       console.log(`Error has occured: ${err}`);
                       return err;
                    });
            }
        }
    }
});

module.exports = RootQueries;
