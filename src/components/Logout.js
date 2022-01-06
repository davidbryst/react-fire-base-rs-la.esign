import { Badge, Card, Spinner, Stack } from "react-bootstrap";
import { useHistory } from "react-router-dom"
import { useSetRecoilState } from "recoil";
import userState from "../setup/recoil/userState";

function Logout() {
    const setUser = useSetRecoilState(userState);
    const history = useHistory();
    
    setUser({isConnect: false, user: {}});
    history.push('/auth/signin');

    return(
        <Card.Body style={{
            maxHeight: '70vh',
            maxWidth: '60vw',
            overflow: 'hidden'
        }} className='p-0 mx-auto d-none d-sm-flex'>
            <Stack direction="horizontal">
                <Badge bg="light" className="mx-auto my-2 radius-h-c">
                    <Spinner style={{height: '3em', width: '3em', color: '#EA4B89'}} animation="border" />
                </Badge>
            </Stack>
        </Card.Body>
    )
}

export default Logout;