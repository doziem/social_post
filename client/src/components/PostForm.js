import { gql, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../util/graphql';

import { useForm } from '../util/hooks';

const PostForm = () => {
  const { onChange, onSubmit, values } = useForm(createPostCallback, {
    body: '',
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    // update(proxy, result) {
    //     const data = proxy.readQuery({
    //         query: FETCH_POSTS_QUERY
    //     });
    //     data.getPost = [result.data.createPost, ...data.getPost];
    //     proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
    //     values.body = '';
    // },

    refetchQueries: [{ query: FETCH_POSTS_QUERY }],
  });
  function createPostCallback() {
    createPost();
  }
  useEffect(() => { }, [createPost]);

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            {/* <li>{error?.graphQLErrors[0]?.message} </li> */}
          </ul>
        </div>
      )}
    </>
  );
};

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likeCount
      commentCount
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;
export default PostForm;
