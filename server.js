import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"

const users = [
    {
        userId: 1,
        username: 'ali',
        phone: "998909804717"
    },
    {
        userId: 2,
        username: 'halil',
        phone: "998901254565"
    }
]

const foods = [
    {
        foodId: 1,
        foodName: 'spinner',
        img: "rasm/spinner.png"
    },
    {
        foodId: 2,
        foodName: 'combo',
        img: "rasm/combo.jpg"
    }
]

const orders = [
    {
        userId: 1,
        orderId: 1,
        foodId: 1,
        count: 2
    },
    {
        userId: 2,
        orderId: 2,
        foodId: 2,
        count: 3
    }
]

const schema = gql`
    type Query {
        users: [User!]!
        foods: [food!]!
        orders: [order!]!
    }

    type User {
        userId:ID!
        username: String!
        phone: String!
    }

    type food {
        foodId:ID!
        foodName: String!
        img: String!
    }


    type order {
        userId:ID!
        orderId: ID!
        count: Int! 
        food: food!   
    }
`
const resolvers = {
    Query: {
        users: () => users,
        foods: () => foods,
        orders: () => orders
    },

    order: {
        food: (parent) => foods.find(food => food.foodId === parent.foodId)
    }

}

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
})


server.listen(5000).then(({url}) => {console.log(`server ready at ${url}`)})