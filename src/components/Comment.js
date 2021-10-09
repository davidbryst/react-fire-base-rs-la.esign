import { Card, Stack, Dropdown } from 'react-bootstrap';


function Comment(props) {

    return (
        <div className='mb-auto mx-2 my-4'>
            <Stack direction='horizontal'>
                <div className='mb-auto me-2'>
                    <Card style={{ borderRadius: '100%', width: '4em', height: 'auto', overflow: 'hidden' }}><Card.Img src={props.userImg} /></Card>    
                </div>
                <div className='ms-2'>
                    <Stack direction='horizontal'>
                        <Card.Title >username</Card.Title>
                        <span className='ms-auto'>12 : 00</span>
                    </Stack>
                    <Card.Text className='my-4 mx-auto'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, magnam deserunt repellendus delectus reiciendis, voluptatem facilis earum saepe, repudiandae quibusdam at in. Impedit adipisci error dolor vero velit repudiandae explicabo! </Card.Text>
                    <Dropdown.Divider />
                </div>
            </Stack>
        </div>
    )
}

export default Comment;