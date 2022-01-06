import { faApple, faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Stack } from "react-bootstrap";


function AuthStrategis() {
    return (
        <divs>
            <Stack className="mt-5 mb-4" direction="horizontal">
                <Card.Text className="mx-auto">other methode</Card.Text>
            </Stack>
            <Stack className="mt-4 mb-5" direction="horizontal">
                <button style={{width: '5rem'}} className="ms-auto btn-c radius-h-c"><FontAwesomeIcon icon={faGoogle} /></button>
                <button style={{width: '5rem'}} className="mx-3 btn-c radius-h-c"><FontAwesomeIcon icon={faFacebookF} /></button>
                <button style={{width: '5rem'}} className="me-auto btn-c radius-h-c"><FontAwesomeIcon icon={faApple} /></button>
            </Stack>
        </divs>
    )
}


export default AuthStrategis;