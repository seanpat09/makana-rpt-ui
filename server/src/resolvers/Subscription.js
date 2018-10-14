const Subscription = {
  feedSubscription: {
    subscribe: (parent, args, ctx, info) => {
      return ctx.db.subscription.comment(
        {
          where: {
            node: {
              isPublic: true
            }
          }
        },
        info
      );
    }
  }
};

module.exports = { Subscription };
