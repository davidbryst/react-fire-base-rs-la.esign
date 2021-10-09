import { Col, Stack, Card, Button, Form, FloatingLabel, Dropdown } from 'react-bootstrap';

import Post from '../components/Post';
import Comment from '../components/Comment';

import img from '../asset/download.svg';

function PostPage() {

    return (
        <Col md={5}>
            <Stack>              
                <Card>  
                    <Card.Body>
                        <Stack direction="horizontal">
                            <Button className="me-2">♣</Button>
                            <Card.Text className="me-auto my-auto">Post Detail</Card.Text>
                        </Stack>
                    </Card.Body>
                </Card>

                <div>
                    <Post userImg={img} className="" />
                    <Card className='mt-4'>
                        <Card.Body>
                            <Stack>
                                <Form>
                                    <FloatingLabel controlId="floatingTextarea" label="Comments" className="mb-3">
                                        <Form.Control as="textarea" placeholder="Leave a comment here" style={{ height: '100px' }} />
                                    </FloatingLabel>
                                    <Stack className='my-2' direction='horizontal'>
                                        <Button className='mx-1' >♦</Button>
                                        <Button className='mx-1' >♦</Button>
                                        <Form.Control style={{width: 'auto'}} className='ms-auto' type='submit' />
                                    </Stack>
                                </Form>
                            </Stack>
                        </Card.Body>
                        <Card.Body>
                            <Card.Text>
                                All comments
                            </Card.Text>
                            <Dropdown.Divider />
                            <Comment userImg={img}/>
                            <Comment userImg={img}/>
                            <Comment userImg={img}/>
                            <Stack>
                            </Stack>
                        </Card.Body>
                    </Card>
                </div>
            </Stack>
        </Col>
    )
}

export default PostPage;