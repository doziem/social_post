import React, { useContext } from 'react'
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const PostCard = (props) => {
    const { body, id, username, likeCount, commentCount, createdAt, likes } = props?.post
    const { user } = useContext(AuthContext)
    return (

        <Card fluid>
            <Card.Content>
                <Card.Header>
                    <Image
                        src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                        avatar
                    />
                    <span style={{ marginLeft: "6px", fontSize: "13px" }}>{capitalizeFirstLetter(username)}</span>
                </Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>

            <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <MyPopup content="Post Comment">
                    <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
                        <Button color="blue" basic>
                            <Icon name="comments" />
                        </Button>
                        <Label basic color="blue" pointing="left">
                            {commentCount}
                        </Label>
                    </Button>
                </MyPopup>
                {user && user.username === username && <DeleteButton postId={id} />}
            </Card.Content>
        </Card>
    )
}

export default PostCard