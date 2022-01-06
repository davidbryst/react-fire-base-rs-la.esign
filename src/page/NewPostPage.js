import { faCaretLeft, faPaperPlane, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Card, Stack, Form, FloatingLabel, Badge, Spinner, Overlay, Popover } from 'react-bootstrap';
import { collection, addDoc, QuerySnapshot } from 'firebase/firestore';
import { db, storage } from '../setup/config-firebase';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { useRecoilValue } from 'recoil';
import categoriesState from '../setup/recoil/categoriesState';
import userState from '../setup/recoil/userState';
import dayjs from 'dayjs';

import success from '../asset/successAnimation.gif';

function NewPage() {
    const history = useHistory();
    const [isFetching, setIsFetching] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isPopup, setIsPopup] = useState(false);
    const refPost = useRef();

    const categories = useRecoilValue(categoriesState);
    const user = useRecoilValue(userState);

    const postHandler = async () => {
        if (Title !== '' && Desc !== '' && File !== '' && File.length !== 0 && Categorie !== '' && Categorie !== 'null' ) {
            const now = Date.now().toString();
            const files = [...File];
            (async() => {
                setIsFetching(true);
                let FilesUrl = [];
                for (let index = 0; index < files.length; index++) {
                    const file = files[index];
                    const postPicture = ref(storage, '/postPicture/'+now+'_'+file.name);
                    await uploadBytes(postPicture, file)
                    await getDownloadURL(postPicture)
                    .then(url => FilesUrl.push(url))
                    .catch(console.log);
                }
                return FilesUrl;
            })()
            .then(FilesUrl => {
                return addDoc(collection(db, "post"), {
                    title: Title,
                    description: Desc,
                    categorie: {
                        categorieId: categories[Categorie].id,
                        name: categories[Categorie].name
                    },
                    imagesUrl: FilesUrl,
                    createdAt: dayjs().toString(),
                    author: {
                        id: user.user.id,
                        imageUrl: user.user.imageUrl,
                        username: user.user.username
                    },
                    like: 0,
                    follow: 0,
                    likers: [],
                    followers: []
                });
            })
            .then(async QuerySnapshot => {
                console.log(QuerySnapshot);
                setIsFetching(false);
                setIsSuccess(true);
                setFile('');
                setDesc('');
                setCategorie('');
                setTitle('');
                await setTimeout(() => {
                    setIsSuccess(false);
                }, 1500);
            })
            .catch(console.log);
        } else {
            setIsPopup(true);
            console.log('missing');
            setTimeout(() => {
                setIsPopup(false);
            }, 1500);
        }
    }

    const [Title, setTitle] = useState('');
    const [Desc, setDesc] = useState('');
    const [File, setFile] = useState('');
    const [Categorie, setCategorie] = useState('');

    if ( isFetching) {
        return (
            <Col >
                <Card className='border-0 border-c radius-h-c mb-3'>  
                    <Card.Body>
                        <Stack direction="horizontal">
                            <button className='btn-c border-c me-3'><FontAwesomeIcon icon={faCaretLeft} /></button>
                            <Card.Text className="my-auto title-c">new post</Card.Text>
                        </Stack>
                    </Card.Body>
                </Card>
    
                
                <Card className='border-0 border-c radius-h-c'> 
                    <Card.Body>
                        <Stack direction="horizontal">
                            <Badge bg="light" className="mx-auto my-auto radius-h-c">
                                <Spinner style={{height: '3em', width: '3em', color: '#EA4B89'}} animation="border" />
                            </Badge>
                        </Stack>
                    </Card.Body>
                </Card>
            </Col>
        )
    }

    if ( isSuccess) {
        return (
            <Col >
                <Card className='border-0 border-c radius-h-c mb-3'>  
                    <Card.Body>
                        <Stack direction="horizontal">
                            <button className='btn-c border-c me-3'><FontAwesomeIcon icon={faCaretLeft} /></button>
                            <Card.Text className="my-auto title-c">new post</Card.Text>
                        </Stack>
                    </Card.Body>
                </Card>
    
                
                <Card className='border-0 border-c radius-h-c'> 
                    <Card.Body className='p-5'>
                        <Stack direction="horizontal">
                            <Card.Img style={{
                                borderRadius: '100%',
                                maxWidth: '6rem',
                                maxHeight: '6rem',
                            }} className='mx-auto' src={success}/>
                        </Stack>
                        <Stack direction="horizontal">
                            <Card.Text className='mx-auto my-3 fs-4 text-success' direction="horizontal">success</Card.Text>
                        </Stack>
                    </Card.Body>
                </Card>
            </Col>
        )
    }


    return (
        <Col >
            <Card className='border-0 border-c radius-h-c mb-3'>  
                <Card.Body>
                    <Stack direction="horizontal">
                        <button onClick={() => history.push('/v1/home')} className='btn-c border-c me-3'><FontAwesomeIcon icon={faCaretLeft} /></button>
                        <Card.Text className="my-auto title-c">new post</Card.Text>
                    </Stack>
                </Card.Body>
            </Card>

            
            <Card className='border-0 border-c radius-h-c'> 
                <Card.Body>
                    <div>
                        <FloatingLabel controlId="floatingText" label="Titre" className="mb-3">
                            <Form.Control required onChange={(event) => setTitle(event.target.value)} type="text"/>
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
                            <Form.Control required onChange={(event) => setDesc(event.target.value)} as="textarea" style={{ height: '100px' }} />
                        </FloatingLabel>

                        <Form.Control required onChange={(event) => setFile(event.target.files)} type="file" multiple className='mb-3'/>

                        <FloatingLabel controlId="floatingSelectGrid" label="Catégorie" className='mb-3'>
                            <Form.Select required onChange={(event) => setCategorie(event.target.value)} aria-label="Floating label select example">
                                <option value='null'>Choisissez une catégorie</option>
                                {categories.map((categorie, index) => (
                                  <option key={index} value={index}>{categorie.name}</option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                        
                        <Overlay target={refPost.current} show={isPopup} placement="top">
                            <Popover className=" border-0 shadow-c radius-h-c border-c" id="popover">
                                <Popover.Body>
                                    <Card.Text className='text-danger fs-3 fw-bold'>information invalide</Card.Text>
                                </Popover.Body>
                            </Popover>
                        </Overlay>
                        <Stack direction='horizontal'>
                            <button style={{width: 'auto'}} className='btn-c border-c ' type='reset'><FontAwesomeIcon icon={faRedoAlt} /></button>
                            <button ref={refPost} onClick={postHandler} style={{width: 'auto'}} className='btn-c border-c ms-auto' type='submit'><FontAwesomeIcon icon={faPaperPlane} /></button>
                        </Stack>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
    
}

export default NewPage;