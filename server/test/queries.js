const createComment = (message, public) => `
     mutation {
        createComment(message: "${message}", isPublic: ${public}){
          id
          createdAt
          isPublic
          message
          author {
            id
            name
          }
        }
      }`;

const login = (email, password) => `
    mutation {
            login(email: "${email}", password: "${password}"){
            token
            user {
                id
                name
            }
        }
    }`;

const comment = id => `{
        comment(id: "${id}") {
          id
          message
          createdAt
        }
      }`;

const deleteComment = id => `mutation {
       deleteComment(id: "${id}"){
           id
       }
      }`;

const me = `{
      me {
          id
          comments {
              id
              message
          }
        }
      }`;

const feed = `{
       feed {
            id
            message
            createdAt
        }
      }`;

module.exports = { createComment, comment, deleteComment, login, me, feed };
