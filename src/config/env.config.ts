export const EnvConfig = () => ({
    apiPrefix: process.env.API_DOC_PREFIX,
    port: process.env.PORT,
    jwt: process.env.MY_SECRET,
    mongo: {
        uri: process.env.MONGO_DB
    },
})