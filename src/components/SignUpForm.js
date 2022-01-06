import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Card, Badge, Spinner } from 'react-bootstrap';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthStrategis from '../components/AuthStrategis';
import ImageSelector from '../components/ImageSelector';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '../setup/config-firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



function SignUpForm() {
    const [isLoading, setIsLoading] = useState(true);
    const [image, setImage] = useState();
    // const setUser = useResetRecoilState(userState);
    const history = useHistory();
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');

    setTimeout(() => setIsLoading(false), 500);


    const register = async () => {
       setIsLoading(true)
       const now = Date.now().toString();
       const profilePicture = ref(storage, '/profilePicture/'+now+'_'+registerUsername);
       let uid;
        createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        .then((userCredential) => {
            uid = userCredential.user.uid
            console.log(uid, image, registerUsername);
            return uploadBytes(profilePicture, image);
        })
        .then(() => {
            return getDownloadURL(profilePicture)
        })
        .then(url => {
            const user = {
                imageUrl: url,
                username: registerUsername,
                uid: uid,
                preference: [],
                sex: '',
                birthday: '',
            };
            return addDoc(collection(db, 'user'), user)
        })
        .then(querySnapshot => {
            console.log(querySnapshot);
            history.push('/v1/home');
        })
        .catch((error) => {
            console.log(error.code, error.message);
        });
    }

    if (isLoading) {
        return (
            <div className='m-auto p-2'>
                <Card.Body className='p-5 d-lg-none'>
                    <Stack direction="horizontal">
                        <Badge bg="light" className="mx-auto my-2 radius-h-c">
                            <Spinner style={{height: '3em', width: '3em', color: '#EA4B89'}} animation="border" />
                        </Badge>
                    </Stack>
                </Card.Body>
                <Card.Body style={{
                    maxHeight: '70vh',
                    maxWidth: '60vw',
                    overflow: 'hidden'
                }} className='p-0 mx-auto d-none d-lg-flex'>
                    <Stack direction="horizontal">
                        <Badge bg="light" className="mx-auto my-2 radius-h-c">
                            <Spinner style={{height: '3em', width: '3em', color: '#EA4B89'}} animation="border" />
                        </Badge>
                    </Stack>
                </Card.Body>
            </div>
        )
    }

    return (
        <div className='m-auto p-2'>
            <Card.Body className='p-5 d-lg-none'>
                <div>
                    <Stack>
                        <Card.Text style={{fontSize: '50px'}} className="fw-bolder title-c">Hello!</Card.Text>
                        <Card.Text className="fs-1 mb-5 fw-bolder title-c">Signup to get started</Card.Text>
                        <ImageSelector image={image} setImage={setImage}e />
                        <input onChange={event => setRegisterUsername(event.target.value)} className="input-c radius-h-c border-c px-4 py-3 my-2" type="text" placeholder="username" />
                        <input onChange={event => setRegisterEmail(event.target.value)} className="input-c radius-h-c border-c px-4 py-3 my-2" type="email" placeholder="email" />
                        <input onChange={event => setRegisterPassword(event.target.value)} className="input-c radius-h-c border-c px-4 py-3 my-2" type="password" placeholder="password" />
                        <button onClick={register} className="my-5 btn-form-c">Sign up</button>
                    </Stack>
                </div>

                <AuthStrategis />

                <Stack className="my-5" direction="horizontal">
                    <Link className="link-c mx-auto" to="/auth/signin">i already have acount</Link>
                </Stack>
            </Card.Body>
            <Card.Body style={{
                minHeight: '10vh',
                width: '60vw',
            }} className='p-0 border-c radius-h-c d-none d-lg-flex'>
                <div style={{
                    width: '50%',
                    borderRadius: 'var(--radius-hight) 0 0 var(--radius-hight)',
                    }} className='overlay-c m-0 p-5'>
                    <Stack style={{marginTop: '7vh'}}>
                        <div className='mx-auto px-5'>
                            <Card.Text className="fs-5-c fw-bolder">Hello!</Card.Text>
                            <Card.Text className="fs-1 fs-c mb-5  fw-bolder">Signup to get started</Card.Text>
                        </div>
                    </Stack>

                    <AuthStrategis />

                    <Stack className="my-5" direction="horizontal">
                        <Link className="link-overlay-c mx-auto" to="/auth/signin">i already have acount</Link>
                    </Stack>
                </div>
                <div style={{
                    width: '50%',
                    }} className='m-0 p-5'>
                    <Stack className='pt-5'>
                        <ImageSelector image={image} setImage={setImage} />
                        <input onChange={event => setRegisterUsername(event.target.value)} className="input-c radius-h-c border-c px-4 py-3 my-2" type="text" placeholder="username" />
                        <input onChange={event => setRegisterEmail(event.target.value)} className="input-c radius-h-c border-c px-4 py-3 my-2" type="email" placeholder="email" />
                        <input onChange={event => setRegisterPassword(event.target.value)} className="input-c radius-h-c border-c px-4 py-3 my-2" type="password" placeholder="password" />
                        <button onClick={register} className="my-5 btn-form-c">Sign up</button>
                    </Stack>
                </div>
            </Card.Body>
        </div>
    )
}

export default SignUpForm;