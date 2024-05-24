import { ApolloServer, gql } from "apollo-server";

const tweets = [
    {
        id:'1',
        text: 'first one',
    },
    {
        id:'2',
        text: 'second one',
    }
]

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
    }
    type Tweet {
        id: ID!
        text: String!
        author: User
    }
    type Query {
        allTweet: [Tweet!]!
        tweet(id: ID!): Tweet
    }
    type Mutation {
        postTweet(text: String, userId: ID): Tweet
        deleteTweet(id: ID): Boolean
    }
`

const resolvers = {
    Query: {
        allTweet: () => {
            return tweets
        },
        tweet: (root, { id }) => {
            console.log(id);
            return tweets.find((tweets) => tweets.id === id);
        },
    },
    Mutation: {
        postTweet: (_, { text, userId }) => {
            const newTweet = {
                id: tweets.length + 1,
                text,
            }
            tweets.push(newTweet)
            return newTweet
        },
        deleteTweet: (_, {id}) => {
            const tweet = tweets.find((tweet) => tweet.id === id)
            if (!tweet) return false;
            tweets = tweets.filter((tweet) => tweet.id !== id)
            return true;
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
    console.log(`Running on ${url}`);
})