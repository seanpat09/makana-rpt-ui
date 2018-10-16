const { getUserId, getUserIdOptional, AuthError } = require('../utils');

const Query = {
  feed(parent, args, ctx, info) {
    return ctx.db.query.comments(
      {
        where: { AND: [{ isPublic: true }, { parent: null }] },
        orderBy: 'createdAt_DESC'
      },
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

  async comment(parent, { id }, ctx, info) {
    const userId = getUserIdOptional(ctx, true);

    if (userId === -1) {
      const canView = await ctx.db.exists.Comment({ id, isPublic: true });
      if (!canView) {
        throw new AuthError();
      }
    }

    return ctx.db.query.comment({ where: { id } }, info);
  },

  me(parent, args, ctx, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  }
};

module.exports = { Query };
