import { rest } from "msw";

export const handlers = [
  rest.get("https://api.github.com/organizations", (request, response, ctx) => {
    return response(
      ctx.status(200),
      ctx.json([
        {
          url: "",
          avatar_url: "",
          login: "testing",
          description: "",
        },
      ])
    );
  }),

  rest.get("https://api.github.com/orgs/testing", (request, response, ctx) => {
    return response(
      ctx.status(200),
      ctx.json({
        url: "",
        avatar_url: "",
        login: "testing",
        description: "is there a description?",
        name: "Testing inc",
        created_at: "2008-02-14T02:05:27Z",
        public_repos: 1201,
        public_gists: 1,
        location: "Earth, Solar System",
      })
    );
  }),
];
