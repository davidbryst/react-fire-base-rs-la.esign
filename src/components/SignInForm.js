import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Card, Badge, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthStrategis from '../components/AuthStrategis';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../setup/config-firebase';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';




function SignInForm() {
    const [isLoading, setIsLoading] = useState(true);
    const [loginEmail, setloginEmail] = useState('');
    const [loginPassword, setloginPassword] = useState('');

    const history = useHistory();

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 500);
    }, []);
    
    const login = async () => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
           console.log(userCredential.user);
            history.push('/v1/home');
        })
        .catch((error) => {
            console.log(error.code, error.message);
        });
    };

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
                        <Card.Text style={{fontSize: '50px'}} className="fw-bolder title-c">Hello Again!</Card.Text>
                        <Card.Text className="fs-1 mb-5 mx-5 fw-bolder title-c">Welcome Back</Card.Text>
                        <input onChange={event => setloginEmail(event.target.value)} className="input-c radius-h-c border-c px-4 py-3 my-2" type="email" placeholder="email" />
                        <input onChange={event => setloginPassword(event.target.value)} className="input-c radius-h-c border-c px-4 py-3 my-2" type="password" placeholder="password" />
                        <Link className="link-c mt-4 ms-auto" to="#">forgot password</Link>
                        <button onClick={login} className="mt-5 btn-form-c">Sign in</button>
                    </Stack>
                </div>

                <AuthStrategis />

                <Stack className="my-5" direction="horizontal">
                    <Link className="link-c mx-auto" to="/auth/signup">i don't have acount</Link>
                </Stack>
            </Card.Body>
            <Card.Body style={{
                minHeight: '10vh',
                width: '60vw',
            }} className='p-0 border-c radius-h-c mx-auto d-none d-lg-flex'>
                <div style={{
                    width: '50%',
                    borderRadius: 'var(--radius-hight) 0 0 var(--radius-hight)'
                }} className='overlay-c m-0 p-5'>
                    <Stack>
                        <div className='mx-auto px-5'>
                            <Card.Text className="fs-5-c fw-bolder">Hello Again!</Card.Text>
                            <Card.Text className="fs-1 fs-c mb-5 fw-bolder">Welcome Back</Card.Text>
                        </div>
                    </Stack>

                    <AuthStrategis />

                    <Stack className="my-5" direction="horizontal">
                        <Link className="link-overlay-c mx-auto" to="/auth/signup">i don't have acount</Link>
                    </Stack>
                </div>
                <div style={{width: '50%'}} className='m-0 p-5'>
                    <Stack className='pt-5'>
                        <input onChange={event => setloginEmail(event.target.value)} className="input-c radius-h-c border-c px-4 py-3 my-2" type="email" placeholder="email" />
                        <input onChange={event => setloginPassword(event.target.value)} className="input-c radius-h-c border-c px-4 py-3 my-2" type="password" placeholder="password" />
                        <Link className="link-c mt-4 ms-auto" to="#">forgot password</Link>
                        <button onClick={login} className="mt-5 btn-form-c">Sign in</button>
                    </Stack>
                </div>
            </Card.Body>
        </div>
    )

}

export default SignInForm;
