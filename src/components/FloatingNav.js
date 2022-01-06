import { faCaretLeft, faHome, faPenFancy, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import { useRef, useState } from "react";
import { Card, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { auth } from "../setup/config-firebase";

function FloatingNav() {
    const history = useHistory();
    const [toggle, setToggle] = useState(''); 
    const ref = useRef();

    const logout = () => {
        signOut(auth).then(() => {
            history.push('/auth/logout');
        }).catch(console.log);
    }

    const toggleHandler = () => {
        if (toggle) {
            setToggle('');
        } else {
            setToggle('toggle-c');
        };
    }

    return (
        <div ref={ref} style={{
            position: "absolute",
            zIndex: '5',
            top: '50%',
            transform: 'translate(-60%, -40%)',
            backgoundColor: 'transparent!important',
            transition: 'all .15s ease-in-out'
        }} className={`${toggle} d-md-none d-flex flex-row border-0`}>
            <Card.Body style={{
                borderRadius: '0 var(--radius-hight) var(--radius-hight) 0',
                backgroundColor: '#fff'
            }} className='border-0 border-c shadow-c'>    
                <Nav className='d-flex flex-column ms-auto' >
                    <Link onClick={toggleHandler} className='navlink-c fs-1 mx-auto' to="/v1/home"><FontAwesomeIcon icon={faHome} /></Link>
                    {/* <Link onClick={toggleHandler} className='navlink-c fs-1 mx-auto mt-4' to="#"><FontAwesomeIcon icon={faBriefcase} /></Link> */}
                    <Link onClick={toggleHandler} className='navlink-c fs-1 mx-auto mt-4' to="/v1/post/new"><FontAwesomeIcon icon={faPenFancy} /></Link>
                    {/* <Link onClick={toggleHandler} className='navlink-c fs-1 mx-auto mt-4' to="/v1#"><FontAwesomeIcon icon={faAdjust}/></Link> */}
                    
                    <Link onClick={toggleHandler} className='navlink-c fs-1 mx-auto mt-4' to="/v1/profile"><FontAwesomeIcon icon={faUser} /></Link>
                    <Link className='navlink-c fs-1 mx-auto mt-4' onClick={logout} to='#'><FontAwesomeIcon icon={faSignOutAlt} /></Link>
                </Nav>
            </Card.Body>
            <Card.Body style={{
                backgroundColor: '#EA4B89f0',
                color: '#fff',
                clipPath: 'circle(50% at 0% 50%)',
            }} onClick={toggleHandler} className="p-4 ps-2 my-auto border-c shadow-c">
                <FontAwesomeIcon className="fs-1" icon={faCaretLeft} />
            </Card.Body>
        </div>
    )
}

export default FloatingNav;