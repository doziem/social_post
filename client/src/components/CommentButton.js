import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Icon, Label } from 'semantic-ui-react'

const CommentButton = (props) => {
    const navigate = useNavigate()

    const { id, commentCount, comments } = props.post
    return (
        <Button as='div' labelPosition='right' onClick={() => navigate(`/posts/${id}`)} >
            <Button color='blue' basic>
                <Icon name='comments' />

            </Button>
            <Label as='a' basic color='blue' pointing='left'>
                {commentCount}
            </Label>
        </Button>
    )
}

export default CommentButton