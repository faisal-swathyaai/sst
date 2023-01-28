import { Api } from "@serverless-stack/node/api";
import { expect, it } from "vitest";
import { createClient } from "@stt/graphql/genql";
import { Article } from "@stt/core/article";

it("create an article", async () => {
  const client = createClient({
    url: Api.api.url + "/graphql",
  });

  const article = await client.mutation({
    createArticle: [
      { title: "Hello world", url: "https://example.com" },
      {
        id: true,
      },
    ],
  });
  const list = await Article.list();
  expect(
    list.find((a) => a.articleID === article.createArticle.id)
  ).not.toBeNull();
});
