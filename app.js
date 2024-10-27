import express from "express";
import { Prisma } from "@prisma/client";
import config from "./config.js";
import cors from "cors";
import pkg from "@prisma/client"; // Default import
const { PrismaClient } = pkg; // PrismaClient 가져오기
import { assert } from "superstruct";
import {
  CreateProduct,
  PatchProduct,
  CreateArticle,
  PatchArticle,
  CreateProductComment,
  PatchProductCommnet,
  CreateArticleComment,
  PatchArticleComment
} from "./structs.js";
import { asyncHandler, checkAndConvertPageParams } from "./helper.js";
const app = express();
app.use(cors());
app.use(express.json());

const PORT = config.port || 3000;
const NOT_FOUND_MESSAGE = "Cannot find given id.";
const NOT_FOUND_USERID_MESSAGE = "User ID is required";

const prisma = new PrismaClient();
//************* USER*************/
app.get(
  "/users",
  asyncHandler(async (req, res) => {
    const users = await prisma.user.findMany();
    res.send(users);
  })
);
app.get(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUniqueOrThrow({
      where: { id },
      include: {
        articles: true,
        products: true,
        articleComments: true,
        productComments: true
      }
    });
    res.send(user);
  })
);
//************************PRODUCTS********************************
// app.get(
//   "/products",
//   asyncHandler(async (req, res) => {
//     const { page, pageSize, order, keyword } = checkAndConvertPageParams(
//       req.query
//     );
//     const orderBy =
//       order === "oldest"
//         ? { createdAt: "asc" }
//         : order === "newest"
//         ? { createdAt: "desc" }
//         : order === "favoritest"
//         ? { favorite: "desc" }
//         : {};
//     const products = await prisma.product.findMany({
//       orderBy,
//       skip: page * pageSize,
//       take: pageSize,
//       where: keyword
//         ? {
//             OR: [
//               { name: { contains: keyword, mode: "insensitive" } },
//               { description: { contains: keyword, mode: "insensitive" } }
//             ]
//           }
//         : undefined
//     });
//     res.send(products);
//   })
// );
app.get(
  "/products",
  asyncHandler(async (req, res) => {
    const { page, pageSize, order, keyword } = checkAndConvertPageParams(
      req.query
    );
    console.log(keyword);
    const orderBy =
      order === "oldest"
        ? { createdAt: "asc" }
        : order === "newest"
        ? { createdAt: "desc" }
        : order === "favoritest"
        ? { favoriteCount: "desc" }
        : {};
    const whereClause = keyword
      ? {
          OR: [
            { name: { contains: keyword, mode: "insensitive" } },
            { description: { contains: keyword, mode: "insensitive" } }
          ]
        }
      : undefined;
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        orderBy,
        skip: page * pageSize,
        take: pageSize,
        where: whereClause
      }),
      prisma.product.count({ where: whereClause })
    ]);
    res.send({ products, totalCount });
  })
);
app.get(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.findUniqueOrThrow({ where: { id } });
    res.send(product);
  })
);
app.post(
  "/products",
  asyncHandler(async (req, res) => {
    const { userId, price, ...otherProductData } = req.body;
    const productData = {
      ...otherProductData,
      price: parseInt(price)
    };
    productData.favoriteCount = 0;
    console.log(productData);
    assert(productData, CreateProduct);
    if (!userId) throw new Error(NOT_FOUND_USERID_MESSAGE);
    const product = await prisma.product.create({
      data: {
        ...productData,
        user: {
          connect: { id: userId }
        }
      }
    });
    res.status(201).send(product);
  })
);
app.patch(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    assert(req.body, PatchProduct);
    const product = await prisma.product.update({
      where: { id },
      data: req.body
    });
    res.status(203).send(product);
  })
);
app.delete(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await prisma.product.delete({
      where: { id }
    });
    res.sendStatus(204);
  })
);
//************Article*********** */
app.get(
  "/articles",
  asyncHandler(async (req, res) => {
    const { page, pageSize, order, keyword } = checkAndConvertPageParams(
      req.query
    );
    console.log(`keyword:${keyword}`);
    const orderBy =
      order === "recent"
        ? { createdAt: "desc" }
        : order === "favoritest"
        ? { favoriteCount: "desc" }
        : { createdAt: "asc" };
    const whereClause = keyword
      ? {
          OR: [
            { title: { contains: keyword, mode: "insensitive" } },
            { content: { contains: keyword, mode: "insensitive" } }
          ]
        }
      : undefined;
    console.log(`whereClause:${JSON.stringify(whereClause)}`);
    const [articles, totalCount] = await Promise.all([
      prisma.article.findMany({
        orderBy,
        skip: page * pageSize,
        take: pageSize,
        where: whereClause
      }),
      prisma.article.count({ where: whereClause })
    ]);
    res.send({
      articles,
      totalCount
    });
    // const article = await prisma.article.findMany({
    //   orderBy,
    //   skip: page * pageSize,
    //   take: pageSize,
    //   where: keyword
    //     ? {
    //         OR: [
    //           { title: { contains: keyword } },
    //           { content: { contains: keyword } }
    //         ]
    //       }
    //     : undefined
    // });
    // res.send(article);
  })
);
app.get(
  "/articles/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const article = await prisma.article.findUniqueOrThrow({
      where: { id }
    });
    res.send(article);
  })
);
app.get(
  "/articles/:id/withcomments",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
      order = "recent",
      page = 0,
      pageSize = 10
    } = checkAndConvertPageParams(req.query);

    const orderBy =
      order === "favoritest"
        ? { favoriteCount: "desc" }
        : order === "recent"
        ? { createdAt: "desc" }
        : { createdAt: "asc" };

    const skip = page * pageSize;
    const take = pageSize;

    const [article, totalCount] = await Promise.all([
      prisma.article.findUniqueOrThrow({
        where: { id },
        include: {
          articleComments: {
            orderBy,
            skip,
            take
          }
        }
      }),
      prisma.articleComment.count({
        where: { articleId: id } // 해당 기사의 댓글 수를 카운트
      })
    ]);

    // 응답 데이터 구성
    const responseData = {
      article,
      articleComments: {
        comments: article.articleComments,
        totalCount // 토탈 카운트를 포함
      }
    };

    // 응답 반환
    res.send(responseData);
  })
);
// app.get(
//   "/articles/:id/withcomments",
//   asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const {
//       order = "recent",
//       page,
//       pageSize
//     } = checkAndConvertPageParams(req.query);
//     const orderBy =
//       order === "favoritest"
//         ? { favoriteCount: "desc" }
//         : order === "recent"
//         ? { createdAt: "desc" }
//         : { createdAt: "asc" };
//     const skip = page * pageSize;
//     const take = pageSize;
//     const totalCount = await prisma.articleComment.count({
//       where: { articleId: id } // 해당 기사의 댓글 수를 카운트
//     });
//     const article = await prisma.article.findUniqueOrThrow({
//       where: { id },
//       include: {
//         articleComments: {
//           orderBy,
//           skip,
//           take
//         },
//         commentTotalCount:totalCount
//       }
//     });

//     res.send(article);
//   })
// );
app.post(
  "/articles",
  asyncHandler(async (req, res) => {
    const { userId, ...articleData } = req.body;
    //assert(articleData, CreateArticle);
    if (!userId) throw new Error(NOT_FOUND_USERID_MESSAGE);
    const article = await prisma.article.create({
      data: {
        ...articleData,
        user: {
          connect: { id: userId }
        }
      }
    });
    res.status(201).send(article);
  })
);
app.patch(
  "/articles/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    assert(req.body, PatchArticle);
    const article = await prisma.article.update({
      where: { id },
      data: req.body
    });
    res.status(203).send(article);
  })
);
app.delete(
  "/articles/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const article = await prisma.article.delete({
      where: { id }
    });
    res.sendStatus(204);
  })
);
//************************ProductConmment******************/
app.get(
  "/product-comments",
  asyncHandler(async (req, res) => {
    const { cursor, limit = 10 } = req.query;
    const query = {
      orderBy: {
        createdAt: "desc"
      },
      take: parseInt(limit)
    };
    if (cursor) {
      query.cursor = { id: cursor };
      query.skip = 1;
    }
    const comments = await prisma.productComment.findMany(query);
    res.send(comments);
  })
);
app.get(
  "/product-comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await prisma.productComment.findUniqueOrThrow({
      where: { id }
    });
    res.send(comment);
  })
);
app.patch(
  "/product-comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    assert(req.body, PatchProductCommnet);
    const comment = await prisma.productComment.update({
      where: { id },
      data: req.body
    });
    res.send(comment);
  })
);
app.post(
  "/product-comments",
  asyncHandler(async (req, res) => {
    const { userId, productId, ...commentFields } = req.body;
    assert(commentFields, CreateProductComment);
    const comment = await prisma.productComment.create({
      data: {
        user: { connect: { id: userId } },
        product: { connect: { id: productId } },
        ...commentFields
      }
    });
    res.status(203).send(comment);
  })
);
app.delete(
  "/product-comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await prisma.productComment.delete({
      where: { id }
    });
    res.sendStatus(204);
  })
);
//**************************ArticleComment*****************************************/
app.get(
  "/article-comments",
  asyncHandler(async (req, res) => {
    const { limit = 10, cursor } = req.query;
    const query = {
      orderBy: { createdAt: "desc" },
      take: parseInt(limit)
    };
    if (cursor) {
      query.cursor = { id: cursor };
      query.skip = 1;
    }
    const comments = await prisma.articleComment.findMany(query);
    res.send(comments);
  })
);
app.get(
  "/article-comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await prisma.articleComment.findUniqueOrThrow({
      where: { id }
    });
    res.send(comment);
  })
);
app.post(
  "/article-comments",
  asyncHandler(async (req, res) => {
    const { userId, articleId, ...commentFields } = req.body;
    console.log(userId);
    console.log(articleId);
    console.log(commentFields);
    //assert(commentFields, CreateArticleComment);
    const comment = await prisma.articleComment.create({
      data: {
        user: { connect: { id: userId } },
        article: { connect: { id: articleId } },
        ...commentFields
      }
    });
    console.log(1);
    res.status(201).send(comment);
  })
);
app.patch(
  "/article-comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    //assert(req.body, PatchArticleComment);
    const comment = await prisma.articleComment.update({
      where: { id },
      data: req.body
    });
    console.log(`성공:${comment}`);
    res.status(203).send(comment);
  })
);
app.delete(
  "/article-comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = await prisma.articleComment.delete({
      where: { id }
    });
    res.sendStatus(204);
  })
);

app.listen(PORT, () => console.log(`서버가 ${PORT}에서 실행중입니다.`));
