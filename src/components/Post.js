import { Card, Stack, Button, Image } from "react-bootstrap";


function PostIcon(prpos) {

    return (
        <Stack className="me-5" direction="horizontal">
            <Button>♦♣</Button>
            <Card.Text  className="ms-2">{prpos.text}</Card.Text>
        </Stack>
    )
}


function Post(props) {
    let text;
    if (text) {
        text = (
            <>
                <Card.Text>userName</Card.Text>
                <Card.Text>12 : 00</Card.Text>
            </>
        )
    } else {
        text = (
            <>
                <span>userName</span>
                <span>12 : 00</span>
            </>
        )
    }

    return (
        <Card className="mt-4" >
            <Card.Body style={{ overflow: 'hidden' }}>
                <Stack direction="horizontal">
                    <Card className="my-auto" style={{ borderRadius: '100%', width: '4.5em', height: 'auto', overflow: 'hidden' }}><Card.Img src={props.userImg} /></Card>
                    <Stack className="ms-3 my-auto">
                        {text}
                    </Stack>
                    <Button className="my-auto">...</Button>
                </Stack>      
                <Card.Text className="mt-4 fs-5 fw-bold">my exemple title</Card.Text>
                <Card.Text className="fs-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam suscipit nesciunt nostrum expedita exercitationem vel laborum delectus totam. </Card.Text>
                
                <Stack className="mb-3" style={{ overflow: 'hidden' }} direction="horizontal">
                    <Image thumbnail style={{ maxHeight: "20em", maxWidth: '100%'}} src={props.userImg} />
                    <Image thumbnail style={{ maxHeight: "20em", maxWidth: '100%'}} src={props.userImg} />
                    <Image thumbnail style={{ maxHeight: "20em", maxWidth: '100%'}} src={props.userImg} />
                </Stack>

                <Stack direction="horizontal">
                    <PostIcon className="me-5" text="like" />
                    <PostIcon className="me-5" text="like" />
                    <PostIcon className="me-5" text="like" />
                </Stack>
            </Card.Body>
        </Card>
    )
}

export default Post;