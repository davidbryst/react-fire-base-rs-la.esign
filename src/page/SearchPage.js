import { Col, Stack, Card, Dropdown } from 'react-bootstrap';

import '../none.css';
import img from '../asset/download.svg';

import Post from '../components/Post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import postsState from '../setup/recoil/postsState';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function SearchPage(props) {
    const value = props.match.params.value.split(' ');
    const resulta = [];
    const posts = useRecoilValue(postsState);
    const history = useHistory();

    
    // for (let index = 0; index < value.length; index++) {
    //     const val = value[index];
    //     value[index] = ' '+val+' ';
    // }

    (async () => {
        value.forEach(val => {
            posts.forEach(post => {
                if (post.title.includes(val) || post.description.includes(val) || post.categorie.name.includes(val)) {
                    if ( !resulta.find(resulta => resulta === post) ) {
                        resulta.push(post);
                    }
                }
            });
        });
    })()


    if ( value.includes('none') ) {
        return(
            <Col >
                <Stack>
                    <Card className='border-0 border-c radius-h-c'>  
                        <Card.Body>
                            <Stack direction="horizontal">
                                <button onClick={() => history.push('/v1/home')} className='me-3 btn-c'><FontAwesomeIcon icon={faCaretLeft} /></button>
                                <Card.Text className=" title-c me-auto my-auto">search</Card.Text>
                            </Stack>
                        </Card.Body>
                    </Card>
                    <Card className='mt-3 border-0 border-c radius-h-c'>
                        <Card.Body>
                            <Stack direction="horizontal">
                                <Card.Text className=" title-c me-auto my-auto">nofing is search</Card.Text>
                            </Stack>
                        </Card.Body>
                    </Card>
                </Stack>
            </Col> 
        )
    } else if ( resulta.length === 0 ) {
        
        return(
            <Col >
                <Stack>
                    <Card className='border-0 border-c radius-h-c'>  
                        <Card.Body>
                            <Stack direction="horizontal">
                                <button onClick={() => history.push('/v1/home')} className='me-3 btn-c'><FontAwesomeIcon icon={faCaretLeft} /></button>
                                <Card.Text className=" title-c me-auto my-auto">search</Card.Text>
                            </Stack>
                        </Card.Body>
                    </Card>
                    <Card className='mt-3 border-0 border-c radius-h-c'>
                        <Card.Body>
                            <Stack direction="horizontal">
                                <Card.Text className=" title-c me-auto my-auto">nofing is find</Card.Text>
                            </Stack>
                        </Card.Body>
                    </Card>
                </Stack>
            </Col> 
        )
    }


    return (
        <Col >
            <Stack>
                <Card className='border-0 border-c radius-h-c'>  
                    <Card.Body>
                        <Stack direction="horizontal">
                            <button onClick={() => history.push('/v1/home')} className='me-3 btn-c'><FontAwesomeIcon icon={faCaretLeft} /></button>
                            <Card.Text className=" title-c me-auto my-auto">search</Card.Text>
                        </Stack>
                    </Card.Body>
                </Card>

                <Card className='mt-3 border-0 border-c radius-h-c'>
                    <Card.Body className='title-c border-0 border-c' style={{borderRadius: 'var(--radius-hight) var(--radius-hight) var(--radius) var(--radius)'}}>users</Card.Body>
                    <Card.Body>
                        <Stack direction="horizontal">
                            <Card className="my-auto" style={{ borderRadius: '100%', width: '3em', height: '3em', overflow: 'hidden' }}><Card.Img src={img} /></Card>
                            <Link to="/user" className='link-c mx-4 my-auto'>name</Link>
                            <button className='btn-c border-c ms-auto'><FontAwesomeIcon icon={faPlus} /></button>
                        </Stack>
                        <Dropdown.Divider className='divider-c' />
                        <Stack direction="horizontal">
                            <Card className="my-auto" style={{ borderRadius: '100%', width: '3em', height: '3em', overflow: 'hidden' }}><Card.Img src={img} /></Card>
                            <Card.Text className='mx-4 my-auto'>name</Card.Text>
                            <button className='btn-c border-c ms-auto'><FontAwesomeIcon icon={faPlus} /></button>
                        </Stack>
                        <Dropdown.Divider className='divider-c' />
                        <Stack direction="horizontal">
                            <Card className="my-auto" style={{ borderRadius: '100%', width: '3em', height: '3em', overflow: 'hidden' }}><Card.Img src={img} /></Card>
                            <Card.Text className='mx-4 my-auto'>name</Card.Text>
                            <button className='btn-c border-c ms-auto'><FontAwesomeIcon icon={faPlus} /></button>
                        </Stack>
                    </Card.Body>
                    <Link to="#"className='link-c my-2 mx-auto'>Voir plus</Link>
                </Card>
                
                <div>
                    {resulta.map((post) => (
                        <Post key={post.id} post={post} className="" />
                    ))}
                </div>
            </Stack>
        </Col>        
    )
}

export default SearchPage;