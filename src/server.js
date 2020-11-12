const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const morgan = require('morgan');

const schema = buildSchema(`
    type Query {
        hello: String,
        allDogs(last: Int): [Dog!]!,
        getBreed(breedId: Int): Breed!
    }, 
    type Dog {
        id: Int,
        name: String,
        breed: Breed!
    },
    type Breed {
        id: Int,
        title: String!,
        code: Int
    }
`);

//The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return 'Hello world!';
    },
    allDogs: (last) => {
        console.log(last.last);
        if(last.last === 1){
            return [{id: 1, name: 'Mona Lisa'}]}
        return [{id: 1, name: 'Athena'}, {id: 2, name: 'Mona Lisa'}]
    },
    getBreed: (breedId) => {
        console.log(breedId);
        const breeds = {
            1: {id: 1, name: 'Border Collie'}
        };
        return breeds[breedId.breedId]
    }
}

var app = express();
app.use(morgan('combined'))
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphql: true,
}))
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql')

