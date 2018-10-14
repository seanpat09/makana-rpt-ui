const { getUserId } = require('../utils');

const Query = {
  feed(parent, args, ctx, info) {
    return ctx.db.query.comments(
      { where: { AND: [{ isPublic: true }, { parent: null }] } },
      info
    );
  },

  // drafts(parent, args, ctx, info) {
  //   const id = getUserId(ctx);

  //   const where = {
  //     isPublished: false,
  //     author: {
  //       id
  //     }
  //   };

  //   return ctx.db.query.posts({ where }, info);
  // },

  comment(parent, { id }, ctx, info) {
    return ctx.db.query.comment({ where: { id } }, info);
  },

  me(parent, args, ctx, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  }
};

module.exports = { Query };
