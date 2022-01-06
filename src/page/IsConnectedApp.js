import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Stack, Card, Badge, Spinner } from 'react-bootstrap';
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';

import NavBar from '../components/NavBar';
import Layout from '../components/Layout';
import HomePage from './HomePage';
import PostPage from './PostPage';
import SearchPage from './SearchPage';
import ProfilePage from './ProfilePage';
import UserPage from './UserPage';
import NewPage from './NewPostPage';

//fire base
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../setup/config-firebase';
import { collection, getDocs, onSnapshot, where } from "firebase/firestore";

import { useState } from 'react';
import TopFeatured from '../components/TopFeatured';
import UserSugestion from '../components/UserSugestion';
import InformationUser from '../components/InformationUser';

import { useRecoilState, useSetRecoilState } from 'recoil';
import postsState from '../setup/recoil/postsState';
import topFeaturedState from '../setup/recoil/topFeaturedState';
import categoriesState from '../setup/recoil/categoriesState';
import userState from '../setup/recoil/userState';
import FloatingNav from '../components/FloatingNav';


function IsConnectedApp() {
  const [user, setUser] = useRecoilState(userState);
  const [IsLoading, setIsLoading] = useState(true);
  const setPosts = useSetRecoilState(postsState);
  const setTopFeatured = useSetRecoilState(topFeaturedState);
  const setCategorie = useSetRecoilState(categoriesState);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      await onAuthStateChanged(auth, (currentUser) => {
        if (currentUser !== null && currentUser !== undefined) {
          onSnapshot(collection(db, "user"), QuerySnapshot => {
            const doc = QuerySnapshot.docs.find(doc => doc.data().uid === currentUser.uid);
            const user = {
              id: doc.id,
              email: currentUser.email,
              ...doc.data(),
            };
            setUser({isConnect: true, user: user});
          });
        } else {
          history.push('/auth/signin');
        }
      });
      
      await onSnapshot(collection(db, "post"), querySnapshot => {
        let ListPost = [];
        querySnapshot.forEach(doc => {
            ListPost.push({
                id: doc.id,
                ...doc.data()
            });
        });
        setPosts(ListPost);
      });
      
      await getDocs(collection(db, 'topfeatured'))
      .then((QuerySnapshot => {
          let featured = [];
          QuerySnapshot.forEach(doc => {
              featured.push({
                  id: doc.id,
                  ...doc.data(),
              });
          });
          setTopFeatured(featured);
      }))
      .catch(error => console.log(error));
  
      await getDocs(collection(db, "categorie"))
      .then(querySnapshot => {
          let preferences = [];
          querySnapshot.forEach((doc) => {
            preferences.push({id: doc.id, ...doc.data()});
          });
          setCategorie(preferences);
      })
      .catch(error => console.log(error));
      setIsLoading(false);
    })()
  }, []);

  if (IsLoading) {
    return (
      <div style={{backgroundColor: 'var(--bg)', height: '100%', minHeight: '100vh', color: 'var(--color-text)'}}>
        <Router>
          <NavBar />
          <div className="space" />
          <Layout>
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
          </Layout>
        </Router>
      </div>
    )
  }

  return (
    <div style={{backgroundColor: 'var(--bg)', height: '100%', minHeight: '100vh', color: 'var(--color-text)'}}>
      <Router>
        <FloatingNav />
        <NavBar />
        <div className="space" />
        <Layout>
          <Col className='d-none d-md-block col-3'>
            
            <InformationUser />

          </Col>
          
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/v1/home" component={HomePage}/>
              <Route path="/v1/post/single/:id" component={PostPage}/>
              <Route path="/v1/post/new" component={NewPage}/>
              <Route path="/v1/search/:value" component={SearchPage}/>
              <Route path="/v1/profile" component={ProfilePage}/>
              <Route path="/v1/user/:id" component={UserPage}/>
            </Switch>
          </Suspense>



          <Col className='d-none d-md-block col-3'>
            <Stack gap={5}>
              
              <TopFeatured />

              <UserSugestion />

            </Stack>
          </Col>
        </Layout>
      </Router>
    </div>
  );
}

export default IsConnectedApp;
