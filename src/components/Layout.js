import { Container, Row } from 'react-bootstrap';

function Layout(props) {
    
    return (
        <Container>
        <Row>
            {props.children}
        </Row>
      </Container>
    )
}

export default Layout;