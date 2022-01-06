import { faCaretLeft, faComments, faEdit, faHeart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Card, Stack, Image } from 'react-bootstrap';
import Post from '../components/Post';
import { auth } from '../setup/config-firebase';
import { signOut } from 'firebase/auth';
import { useRecoilValue } from 'recoil';
import userState from '../setup/recoil/userState';
import postsState from '../setup/recoil/postsState';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function ProfilePage() {
    const user = useRecoilValue(userState);
    const posts = useRecoilValue(postsState);
    let listPost = [];
    const history = useHistory();

    const logout = () => {
        signOut(auth).then(() => {
            history.push('/auth/logout');
        }).catch(console.log);
    }

    posts.forEach(post => {
        if (post.author.id === user.user.id) {
            listPost.push(post);
        }
    })

    return (
        <Col md={6}>
            <Card className='mb-3 border-0 border-c radius-h-c'>  
                <Card.Body>
                    <Stack direction="horizontal">
                        <button onClick={() => history.goBack()} className='btn-c me-3'><FontAwesomeIcon icon={faCaretLeft} /></button>
                        <Card.Text className="my-auto title-c" >Profile</Card.Text>
                    </Stack>
                </Card.Body>
            </Card>

            <Card className="position-relative mb-3 border-0 border-c radius-h-c" style={{borderRadius: '1em'}}>
              <Card style={{borderRadius: '1em 1em 0 0', height: '20em', overflow: 'hidden'}}>
                <Image className='img-c' src={user.user.imageUrl} />
              </Card>
              <Card style={{ top: '60%', left: '10%', borderRadius: '100%', width: '6em', height: '6em', overflow: 'hidden', position: 'absolute' }}>
                <Image className='img-c' src={user.user.imageUrl} />
              </Card>
              <Card.Body>
                <Stack direction='horizontal'>
                    <button className='d-none btn-c ms-auto'><FontAwesomeIcon icon={faEdit} /></button>
                    <button onClick={logout} className='btn-c ms-3 ms-auto'><FontAwesomeIcon icon={faSignOutAlt} /></button>  
                </Stack>
                <Card.Text className='title-c ms-5 ps-2'>{user.user.username}</Card.Text>
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
                {listPost.map((post) => (
                    <Post key={post.id} post={post} className="" />
                ))}
            </div>
        </Col>
    )
    
}

export default ProfilePage;