import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
{
 getPost {
  body
   id
    username
     likeCount
      commentCount
       createdAt 
   comments {
     id
     createdAt
     username
     body
   }
   likes {
     id
     createdAt
     username
   }
 }
}

`