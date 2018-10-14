const { getUserId } = require('../../utils');

const comment = {
  async createComment(parent, { message, isPublic }, ctx, info) {
    const userId = getUserId(ctx);

    return ctx.db.mutation.createComment(
      {
        data: {
          message,
          isPublic,
          author: {
            connect: { id: userId }
          }
        }
      },
      info
    );
  },

  // async publish(parent, { id }, ctx, info) {
  //   const userId = getUserId(ctx);

  //   const postExists = await ctx.db.exists.Post({
  //     id,
  //     author: { id: userId }
  //   });
  //   if (!postExists) {
  //     throw new Error(`Post not found or you're not the author`);
  //   }

  //   return ctx.db.mutation.updatePost(
  //     {
  //       where: { id },
  //       data: { isPublished: true }
  //     },
  //     info
  //   );
  // },

  async deleteComment(parent, { id }, ctx, info) {
    const userId = getUserId(ctx);
    const commentExists = await ctx.db.exists.Comment({
      id,
      author: { id: userId }
    });
    if (!commentExists) {
      throw new Error(`Comment not found or you're not the author`);
    }

    return ctx.db.mutation.deleteComment({ where: { id } });
  }
};

module.exports = { comment };
