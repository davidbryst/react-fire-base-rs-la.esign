import { Col, Stack, Card } from 'react-bootstrap';

import SinglePost from '../components/SinglePost';
// import Comment from '../components/Comment';
import {useHistory} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { useRecoilValue } from 'recoil';
import postsState from '../setup/recoil/postsState';

function PostPage(props) {
    const history = useHistory();
    const id = props.match.params.id;
    const posts = useRecoilValue(postsState);
    let singlePost = [];
    for (let index = 0; index < posts.length; index++) {
        const item = posts[index];
        if (id === item.id) {
            singlePost = item;
            break;
        }
    }

    if (posts.length === 0) {
        return (
            <Col>
                <Stack>              
                    <Card className='border-0 border-c radius-h-c'>  
                        <Card.Body>
                            <Stack direction="horizontal">
                                <button onClick={() => history.goBack()} className="btn-c me-3"><FontAwesomeIcon icon={faCaretLeft}/></button>
                                <Card.Text className="title-c me-auto my-auto">Post Detail</Card.Text>
                            </Stack>
                        </Card.Body>
                    </Card>
    
                    <div>
                        <Card className='mt-4 border-0 border-c radius-h-c'>
                            <Card.Body>
                                <Card.Text>loading</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </Stack>
            </Col>
        )
    }
    return (
        <Col >
            <Stack>              
                <Card className='border-0 border-c radius-h-c'>  
                    <Card.Body>
                        <Stack direction="horizontal">
                            <button onClick={() => history.goBack()} className="btn-c me-3"><FontAwesomeIcon icon={faCaretLeft}/></button>
                            <Card.Text className="title-c me-auto my-auto">Post Detail</Card.Text>
                        </Stack>
                    </Card.Body>
                </Card>

                <div>
                    <SinglePost post={singlePost} />
                    {/* <Card className='mt-4 border-0 border-c radius-h-c'>
                        <Card.Body>
                            <Stack>
                                <Form>
                                    <FloatingLabel controlId="floatingTextarea" label="Comments" className="mb-3">
                                        <Form.Control as="textarea" placeholder="Leave a comment here" style={{ height: '100px' }} />
                                    </FloatingLabel>
                                    <Stack className='my-2' direction='horizontal'>
                                        <button style={{width: 'auto'}} className='post-btn-c ms-auto'><FontAwesomeIcon icon={faPaperPlane} /></button>
                                    </Stack>
                                </Form>
                            </Stack>
                        </Card.Body>
                        <Card.Body>
                            <Card.Text>
                                All comments
                            </Card.Text>
                            <Dropdown.Divider className='divider-c' />
                            <Comment userImg={img}/>
                            <Comment userImg={img}/>
                            <Comment userImg={img}/>
                            <Stack>
                            </Stack>
                        </Card.Body>
                    </Card> */}
                </div>
            </Stack>
        </Col>
    )
}

export default PostPage;