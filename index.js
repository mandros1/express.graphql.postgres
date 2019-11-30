const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');

let coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
];

// Query is only GET
// Mutation is POST, PUT, PATCH and DELETE
const schema = buildSchema(`
    type Query{
      course(id: Int!): Course
      courses(topic: String!): [Course]
    }
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    }
    type Course{
        id: Int
        title: String
        author: String
        description: String
        topic: String 
        url: String
    }
`);


const getCourse = (args) => {
    let {id} = args;
    return coursesData.filter(course => {
       return course.id === id;
    })[0];
};

const getCourses = (args) => {
  if(args.topic){
      const {topic} = args;
      return coursesData.filter(course => {
          return course.topic === topic;
      });
  } else {
      return coursesData;
  }
};

const updateTopic = ({id, topic}) => {
    coursesData.map(course => {
        if(course.id === id){
            course.topic = topic;
            return course
        }
    });
    return coursesData.filter(course => course.id === id)[0];
};


// Contains the list of queries defined under the type Query from the schema above
const rootResolver = {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateTopic
};


// Create express server and GraphQL endpoint
const app = express();


// schema is schema and rootValue is the root resolver
// graphiql is UI in the browser
app.use('/graphql', expressGraphql({
    schema: schema,
    rootValue: rootResolver,
    graphiql: true
}));

let port = process.env.API_PORT || 3005;
app.listen(port, () => {
    console.log(`Server is running and is listening at port ${port}`);
});
