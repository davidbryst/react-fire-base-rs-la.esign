import { Navbar, Nav, Container, Form} from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPenFancy, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../setup/config-firebase';
import { useState } from 'react';


function NavBar() {
    // const setUser = useSetRecoilState(userState);
    const [search, setSearch] = useState('');
    const history = useHistory();

    const logout = () => {
        signOut(auth).then(() => {
            history.push('/auth/logout');
        }).catch(console.log);
    }
    const searchHandler = (e) => {
        e.preventDefault();
        if(search === '') {
            history.push('/v1/search/none');
        } else {
            history.push('/v1/search/'+search);
        }
    }

    return (
        <header>
            <Navbar className='navBar-c'>
                <Container>
                    <Link className='logo-c fs-sm-6 fs-2 me-auto px-3 py-2' to="/v1/home">La.esign</Link>
                    <Form onSubmit={searchHandler} className="d-flex">
                        <input
                            onChange={event => setSearch(event.target.value)}
                            type="search"
                            placeholder="Search"
                            className="border-c radius-h-c input-c border-0 px-4 py-2 me-4"
                            aria-label="Search"
                        />
                        {/* <button type='submit' className='btn-c border-c'><FontAwesomeIcon icon={faSearch} /></button> */}
                    </Form>
                    <Nav className='ms-auto d-none d-md-flex' >
                        <Link className='navlink-c me-4' to="/v1/home"><FontAwesomeIcon icon={faHome} /></Link>
                        {/* <Link className='navlink-c me-4' to="#"><FontAwesomeIcon icon={faBriefcase} /></Link> */}
                        <Link className='navlink-c me-4' to="/v1/post/new"><FontAwesomeIcon icon={faPenFancy} /></Link>
                        {/* <Link className='navlink-c me-4' to="/v1#"><FontAwesomeIcon icon={faAdjust}/></Link> */}
                        
                        <Link className='navlink-c me-4' to="/v1/profile"><FontAwesomeIcon icon={faUser} /></Link>
                        <Link className='navlink-c me-4' to='#' onClick={logout}><FontAwesomeIcon icon={faSignOutAlt} /></Link>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default NavBar;