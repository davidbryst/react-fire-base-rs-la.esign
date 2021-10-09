import { Card } from 'react-bootstrap';

function CardLayout(props) {

    return (
        <Card>
            <Card.Body>
                {props.children}
            </Card.Body>
        </Card>
    )
}

export default CardLayout;