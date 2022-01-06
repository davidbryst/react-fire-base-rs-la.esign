import { Card } from "react-bootstrap";

function UserSugestion() {
    return (
        <Card className='border-0 border-c radius-h-c'>
            <Card.Body
                className='title-c border-c'
                style={{
                    borderRadius: 'var(--radius-hight) var(--radius-hight) var(--radius) var(--radius)'
                }}>User Sugestion</Card.Body>
            <Card.Body>
                {/* <Dropdown.Divider className="divider-c my-3"/>
                <Stack direction="horizontal">
                    <Card
                        style={{
                            borderRadius: '100%',
                            width: '4em',
                            height: '4em',
                            overflow: 'hidden'
                        }}>
                        <Image src={img}/>
                    </Card>
                    <p className="ms-4 my-auto">user name</p>
                    <button className='btn-c border-c ms-auto'><FontAwesomeIcon icon={faPlus}/></button>
                </Stack> */}
                <Card.Text className="title-c">rien</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default UserSugestion;