export default {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      user: process.env.DB_USER ?? 'admin',
      password: process.env.DB_PASSWORD ?? 'password',
      database: process.env.DB_NAME ?? 'postgresDB',
    },
    migrations: { directory: "./migrations" },
    seeds: { directory: "./seeds" },
  },
};
