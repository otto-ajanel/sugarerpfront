import {
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from '@apollo/client/core'

const httpLink = createHttpLink({
    uri:'http://localhost:3001/graphql'
})

const cache =new InMemoryCache()
const apolloclient = new ApolloClient({
    link:httpLink,
    cache
})
export default apolloclient