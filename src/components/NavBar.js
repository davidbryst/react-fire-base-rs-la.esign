import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';


function NavBar() {
    return <header>
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand className="me-auto" href="#home">La.esign</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Form className="d-flex me-auto">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="mr-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
                <Nav>
                    <Nav.Link href="#">Home</Nav.Link>
                    <Nav.Link href="#">Business</Nav.Link>
                    <Nav.Link href="#">New Post</Nav.Link>
                    <Nav.Link href="#">Theme</Nav.Link>
                    <Nav.Link href="#">Profile</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    </header>
}

export default NavBar;