const { db } = require('../model/database');
const { GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');
const { ProjectType, UserType } = require('./types');

const RootQueries = new GraphQLObjectType({
    name: 'RootQueryType',
    type: 'Query',
    fields: {
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                const query = `SELECT * FROM project WHERE id=$1`;
                const values = [args.id];

                return db
                    .one(query, values)
                    .then(res => {
                        console.log(`SUCCESS: ${ JSON.stringify(res) }`);
                        return res
                    })
                    .catch(err => {
                        console.log(`ERROR: ${ err }`);
                        return err;
                    })
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                const query = `SELECT * FROM users WHERE id=$1`;
                const values = [args.id];

                return db
                    .one(query, values)
                    .then(res => {
                        console.log(`SUCCESS: ${ JSON.stringify(res) }`);
                        return res;
                    })
                    .catch(err => {
                       console.log(`ERROR: ${ err }`);
                       return err;
                    });
            }
        },
        projectsBy: {
            type: new GraphQLList(ProjectType),
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                const query = `SELECT project.title, project.description FROM project LEFT JOIN users ON project.author_id = users.id WHERE project.author_id = $1;`;
                const values = [args.id];
                return db
                    .any(query, values)
                    .then(res => {
                        console.log(`SUCCESS: ${ JSON.stringify(res) }`);
                        return res;
                    })
                    .catch(err => {
                        console.log(`ERROR: ${ err }`);
                        return err;
                    });
            }
        }
    }
});

exports.query = RootQueries;
