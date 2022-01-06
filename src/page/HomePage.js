import { Col, Stack, Card } from "react-bootstrap";
import Post from '../components/Post';

import { useRecoilValue } from 'recoil';
import postsState from '../setup/recoil/postsState';
 
function Home() {
    const posts = useRecoilValue(postsState);

    return (
        <Col>
            <Stack>              
                <Card className='border-0 border-c radius-h-c'>  
                    <Card.Body>
                        <Stack direction="horizontal">
                            <Card.Text className="my-auto title-c" >Home</Card.Text>
                            {/* <button className='btn-c border-c ms-auto'>♣</button> */}
                        </Stack>
                    </Card.Body>
                </Card>

                <div>
                    {posts.map((post) => (
                        <Post key={post.id} post={post} className="" />
                    ))}
                </div>
            </Stack>
        </Col>
    )
}

export default Home;