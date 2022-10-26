import { gql, useQuery } from '@apollo/client';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Grid, Icon, Image, Label } from 'semantic-ui-react';
import DeleteButton from '../components/DeleteButton';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth';

const SinglePost = (props) => {
  const [post, setPost] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  let { postId } = useParams();

  useQuery(GET_SINGLE_POST, {
    variables: { postId },
    onCompleted: (data) => {
      setPost(data?.getSinglePost);
    },
  });

  const { id, body, createdAt, username, likes, likeCount, commentCount } =
    post;

  function deletePostCallback() {
    navigate('/');
  }
  let postMarkeup;
  !post
    ? (postMarkeup = <p>loading...</p>)
    : (postMarkeup = (
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>
                    <Image
                      src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                      avatar
                    />
                    <span>{username}</span>
                  </Card.Header>
                  <Card.Meta>{moment(createdAt).fromNow}</Card.Meta>
                  <Card.Description>{body} </Card.Description>
                </Card.Content>
                <hr />
                <Card.Content extra>
                  <LikeButton post={{ id, likeCount, likes }} />
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => console.log('Comment on post')}
                  >
                    <Button basic color="blue">
                      <Icon name="comments" />{' '}
                    </Button>{' '}
                    <Label basic color="blue" pointing="left">
                      {commentCount}{' '}
                    </Label>
                  </Button>
                  {user && user.username === username && (
                    <DeleteButton postId={id} callback={() => navigate('/')} />
                  )}
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ));
  return postMarkeup;
};

const GET_SINGLE_POST = gql`
  query ($postId: ID!) {
    getSinglePost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export default SinglePost;
