module.exports = {
    type: "sqlite",
    database: "src/db/database.sqlite",
    entities: ["src/entity/*.ts"],
    synchronize: true,
    logging: true,
  };
  