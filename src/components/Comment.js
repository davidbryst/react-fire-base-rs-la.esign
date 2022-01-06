import { Card, Stack, Dropdown } from 'react-bootstrap';


function Comment(props) {

    return (
        <div className='mb-auto mx-2 my-4'>
            <Stack direction='horizontal'>
                <div className='mb-auto me-2'>
                    <Card style={{ borderRadius: '100%', width: '4em', height: '4em', overflow: 'hidden' }}><Card.Img src={props.userImg} /></Card>    
                </div>
                <div className='ms-2'>
                    <Stack direction='horizontal'>
                        <Card.Title className='my-auto title-c' >username</Card.Title>
                        <Card.Text className='my-auto border-c px-2 ms-auto'>12 : 00</Card.Text>
                    </Stack>
                    <Card.Text style={{color: 'gray'}} className='fw-light my-4 mx-auto'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, magnam deserunt repellendus delectus reiciendis, voluptatem facilis earum saepe, repudiandae quibusdam at in. Impedit adipisci error dolor vero velit repudiandae explicabo! </Card.Text>
                    <Dropdown.Divider className='divider-c' />
                </div>
            </Stack>
        </div>
    )
}

export default Comment;