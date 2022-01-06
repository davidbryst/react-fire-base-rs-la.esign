import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Stack, Badge, Spinner } from 'react-bootstrap';
import React, { Suspense, useEffect, useState } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import SignInForm from '../components/SignInForm';
import { onAuthStateChanged } from 'firebase/auth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { auth } from '../setup/config-firebase';
import Logout from '../components/Logout';




function IsNotConnectedApp() {
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
  
    useEffect(() => {
      (async () => {
        await onAuthStateChanged(auth, currentUser => {
          if(currentUser) {
            history.push('/v1/home');
          }
          setIsLoading(false);
        });
      })()
    }, []);
  
    if (isLoading) {
      return (
        <div>
          <Card.Body style={{
            marginTop: '30vh',
          }}>
              <Stack direction="horizontal">
                  <Badge bg="light" className="m-1 ms-auto my-auto radius-h-c">
                      <Spinner style={{height: '3em', width: '3em', color: '#EA4B89'}} animation="border" />
                  </Badge>
                  <Card.Text className='m-1 me-auto title-c'>Loading...</Card.Text>
              </Stack>
          </Card.Body>
        </div>
      );
    }

    return (
        <Card style={{
            height: '100vh',
            width: '100vw'
        }} className="border-0">
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path='/auth/signup' component={SignUpForm}/>
                        <Route path='/auth/signin' component={SignInForm}/>
                        <Route path='/auth/logout' component={Logout}/>
                    </Switch>
                </Suspense>
            </BrowserRouter>
        </Card>
    );
}

export default IsNotConnectedApp;
