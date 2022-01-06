import { Col, Card, Stack, Button } from 'react-bootstrap';

import img from '../asset/download.svg';

function BusinessPage() {
    return (
        <Col md={5}>
            <Card>  
                <Card.Body>
                    <Stack direction="horizontal">
                        <Card.Text className="my-auto" >Home</Card.Text>
                        <Button className='ms-auto'>♣</Button>
                    </Stack>
                </Card.Body>
            </Card>
        </Col>
    )
    
}

export default BusinessPage;