import { faCaretLeft, faComments, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { Col, Card, Stack, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { doc, getDoc } from 'firebase/firestore';
import anotherUserState from '../setup/recoil/anotherUserState';
import { db } from '../setup/config-firebase';
import postsState from '../setup/recoil/postsState';
import Post from '../components/Post';

function UserPage(props) {
    const history = useHistory();
    const [anotherUser, setAnotherUser] = useRecoilState(anotherUserState);
    const posts = useRecoilValue(postsState);
    const anotherUserPosts = [];
    const id = props.match.params.id;

    posts.forEach(post => {
        if (post.author.id === id) {
            anotherUserPosts.push(post)
        }
    })

    useEffect(() => {
        (async() => {
            getDoc(doc(db, 'user', id))
            .then(QuerySnapshot => {
                setAnotherUser({
                    id: QuerySnapshot.id,
                    ...QuerySnapshot.data(),
                })
            })
            .catch(error => console.log(error));
        })()
    }, []);

    return (
        <Col md={6}>
            <Card className='mb-3 border-0 border-c radius-h-c'>  
                <Card.Body>
                    <Stack direction="horizontal">
                        <button onClick={() => history.goBack()} className='me-3 btn-c'><FontAwesomeIcon icon={faCaretLeft} /></button>
                        <Card.Text className="my-auto title-c" >User</Card.Text>
                    </Stack>
                </Card.Body>
            </Card>

            <Card className="position-relative mb-3 border-0 border-c radius-h-c" style={{borderRadius: '1em'}}>
            <Card style={{borderRadius: '1em 1em 0 0', height: '20em', overflow: 'hidden'}}>
                <Image className='img-c' src={anotherUser.imageUrl} />
              </Card>
              <Card style={{ top: '60%', left: '10%', borderRadius: '100%', width: '6em', height: '6em', overflow: 'hidden', position: 'absolute' }}>
                <Image className='img-c' src={anotherUser.imageUrl} />
              </Card>
              <Card.Body>
                <Stack direction='horizontal'>
                    <button className='ms-auto btn-c'>suivre</button>  
                </Stack>
                <Card.Text className='ms-5 ps-2 title-c'>{anotherUser.username}</Card.Text>
                <Stack direction='horizontal' className='d-none mt-5 mx-auto'>
                    <Stack>
                        <Card.Text className='my-0 mx-auto fs-6 fw-light' style={{color: 'gray'}}>50</Card.Text>
                        <Card.Text className='my-0 mx-auto fs-6 fw-light' style={{color: 'gray'}}>Post</Card.Text>
                    </Stack>
                    <Stack>
                        <Card.Text className='my-0 mx-auto fs-6 fw-light' style={{color: 'gray'}}>200</Card.Text>
                        <Card.Text className='my-0 mx-auto fs-6 fw-light' style={{color: 'gray'}}>Abonnements</Card.Text>
                    </Stack>
                    <Stack>
                        <Card.Text className='my-0 mx-auto fs-6 fw-light' style={{color: 'gray'}}>1.7k</Card.Text>
                        <Card.Text className='my-0 mx-auto fs-6 fw-light' style={{color: 'gray'}}>Abonné</Card.Text>
                    </Stack>
                    <Stack>
                        <Card.Text className='my-0 mx-auto fs-6 fw-light' style={{color: 'gray'}}>1.5k</Card.Text>
                        <Card.Text className='my-0 mx-auto fs-6 fw-light' style={{color: 'gray'}}>J'aime</Card.Text>
                    </Stack>
                </Stack>
              </Card.Body>
            </Card>

            <Card className='d-none border-0 border-c radius-h-c'>  
                <Card.Body>
                    <Stack direction="horizontal">
                        <button className="btn-c my-auto me-5" ><FontAwesomeIcon icon={faHeart} /></button>
                        <button className="btn-c my-auto me-5" ><FontAwesomeIcon icon={faComments} /></button>
                    </Stack>
                </Card.Body>
            </Card>

            <div>
                {anotherUserPosts.map((post) => (
                    <Post key={post.id} post={post} className="" />
                ))}
            </div>
        </Col>
    )
    
}

export default UserPage;