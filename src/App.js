import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Layout from './components/Layout';
import { Col, Stack, Button, Image, ListGroup, Card, ListGroupItem, Dropdown } from 'react-bootstrap';

import img from './asset/download.svg';
//import CardLayout from './components/CardLayout';

import './App.css';
import HomePage from './page/HomePage';
import PostPage from './page/PostPage';

function App() {

  let element;

  if (element) {
    element = (
      <HomePage/>
    )
  } else {
    element = (
      <PostPage />
    )
  }

  return (
    <>
      <NavBar />
      <div className="space" />
      <Layout>
        <Col md={3}>
          <Card style={{ borderRadius: '1em'}}>
            <Card className="position-relative border-0 mb-5" >
              <Card.Img style={{height: '10em', borderRadius: '1em 1em 1.5em 1.5em'}} variant='top' src={img} />
              <Card style={{ top: '65%', left: '10%', borderRadius: '100%', width: '6em', height: 'auto', overflow: 'hidden', position: 'absolute' }}>
                <Image src={img} />
              </Card>
            </Card>
            <Dropdown.Divider className="mx-3" />
            <Card.Body>
              <Card.Text>preference</Card.Text>
              <ListGroupItem className="border border-1 my-2">ux/ui</ListGroupItem>
              <ListGroupItem className="border border-1 my-2">identité visuelle</ListGroupItem>
              <ListGroupItem className="border border-1 my-2">packaging</ListGroupItem>
              <ListGroupItem className="border border-1 my-2">animation</ListGroupItem>
              <Button className="border border-1 my-2">+</Button>
            </Card.Body>
            <Dropdown.Divider className="mx-3" />
            <Card.Body style={{height: '10vw'}}>
              <Card.Text>
                information
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        
        {element}


        <Col md={4}>
          <Stack gap={5}>
            <Card>
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Card.Text>ux ui design app</Card.Text>
                <Dropdown.Divider />
                <Card.Text>web design</Card.Text>
                <Dropdown.Divider />
                <Card.Text>character design</Card.Text>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>Featured</Card.Header>
              <Card.Body>
                <Stack direction="horizontal">
                  <Card style={{ borderRadius: '100%', width: '6em', height: 'auto', overflow: 'hidden' }}>
                  <Image src={img} />
                  </Card>
                  <p className="ms-3" >user name</p>
                  <Button className="ms-auto">Add</Button>
                </Stack>
                <Dropdown.Divider className='my-3' />
                <Stack direction="horizontal">
                  <Card style={{ borderRadius: '100%', width: '6em', height: 'auto', overflow: 'hidden' }}>
                  <Image src={img} />
                  </Card>
                  <p className="ms-4" >user name</p>
                  <Button className="ms-auto">Add</Button>
                </Stack>
                <Dropdown.Divider className='my-3' />
                <Stack direction="horizontal">
                  <Card style={{ borderRadius: '100%', width: '6em', height: 'auto', overflow: 'hidden' }}>
                  <Image src={img} />
                  </Card>
                  <p className="ms-4" >user name</p>
                  <Button className="ms-auto">Add</Button>
                </Stack>
              </Card.Body>
            </Card>
          </Stack>
        </Col>
      </Layout>
    </>
  );
}

export default App;
