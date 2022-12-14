require("dotenv").config();
require("dotenv").config(".env.local");

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/v1/graphql";

module.exports = {
  overwrite: true,
  hooks: {
    afterAllFileWrite: "prettier --write",
  },
  generates: {
    "./src/graphql/generated.ts": {
      schema: [
        {
          [API_URL]: {},
        },
      ],
      headers: {
        "x-hasura-role": "anonymous",
        // "x-hasura-admin-secret": ADMIN_SECRET,
      },
      documents: ["./src/graphql/**/*.gql"],
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        gqlImport: "@apollo/client#gql",
        strictScalars: true,
        scalars: {
          uuid: "string",
          timestamptz: "string",
        },
      },
    },
  },
};
