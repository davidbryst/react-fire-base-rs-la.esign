import { Col, Stack, Card, Button } from "react-bootstrap";

import img from '../asset/download.svg';

import Post from '../components/Post';
 
function Home() {

    return (
        
        <Col md={5}>
            <Stack>              
                <Card>  
                    <Card.Body>
                        <Stack direction="horizontal">
                            <Card.Text className="my-auto" >Home</Card.Text>
                            <Button className='ms-auto'>♣</Button>
                        </Stack>
                    </Card.Body>
                </Card>

                <div>
                    <Post userImg={img} className="" />
                    <Post userImg={img} className="" />
                    <Post userImg={img} className="" />
                    <Post userImg={img} className="" />
                </div>
            </Stack>
        </Col>
    )
}

export default Home;