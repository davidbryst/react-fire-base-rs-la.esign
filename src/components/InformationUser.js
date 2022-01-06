import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import {  Card, Dropdown, Image, ListGroupItem, Overlay, Popover, Stack } from "react-bootstrap";
import { updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../setup/config-firebase";
import { useRecoilValue } from "recoil";
import categoriesState from "../setup/recoil/categoriesState";
import userState from "../setup/recoil/userState";
import reactDom from "react-dom";

function InformationUser() {
    const refOverlay = useRef();
    const [preferenceIsLoading, setPreferenceIsLoading] = useState(false);
    const [isPopup, setIsPopup] = useState(false);
    const [preferences, setPreferences] = useState([]);
    const categories = useRecoilValue(categoriesState);
    const user = useRecoilValue(userState);


    const findPreference = () => {

        if (!isPopup) {
            setIsPopup(true);
            setPreferenceIsLoading(true);
            const userPreference = user.user.preference;
            let preference = [];
            categories.forEach(item => {
                let find = false;
                for (let index = 0; index < userPreference.length; index++) {
                    const element = userPreference[index];              
                    if (item.id === element.categorieId) {
                        find = true;
                        break;
                    }
                };
                if (!find) {
                    preference.push({...item});
                }
            });
            setPreferenceIsLoading(false);
            setPreferences(preference);
        } else {
            setIsPopup(false);
        }
    
    }
    const addPrefernceHandler = (event) => {
        const categorie = categories.find(ele => ele.id === event.target.id);
        updateDoc(doc(db, 'user', user.user.id), {
            preference: arrayUnion({
                categorieId: categorie.id,
                name: categorie.name,
            }),
        })
        .then(() => console.log("done"))
        .catch(console.log);
        setIsPopup(false);
    }

    const removePrefernceHandler = (event) => {
        const categorie = categories.find(ele => ele.id === event.target.value);
        if (categorie) {
            updateDoc(doc(db, 'user', user.user.id), {
                preference: arrayRemove({
                    categorieId: categorie.id,
                    name: categorie.name,
                })
            }, () => {
                console.log('done');
            });
        } else {
            console.log('faile');
        }
    }


    
    let popover = (
        <Overlay target={refOverlay.current} show={isPopup} placement="right">
            <Popover className="border-0 shadow-c radius-h-c border-c" id="popover-basic">
                <Popover.Body>preference</Popover.Body>
                <Popover.Body>
                    {preferences.map((pref, index) => (
                        <input onClick={addPrefernceHandler} type={"button"} value={pref.name} id={pref.id} className="my-3 d-block btn-f-c border-c" key={index}/>
                    ))}
                </Popover.Body>
            </Popover>
        </Overlay>
    );
    if (preferenceIsLoading) {
        popover = (
            <Overlay target={refOverlay.current} show={isPopup} placement="right">
                <Popover className="border-0 shadow-c radius-h-c border-c" id="popover-basic">
                    <Popover.Body>preference</Popover.Body>
                    <Popover.Body>
                        loading...
                    </Popover.Body>
                </Popover>
            </Overlay>
        );
    }

    return (
        <Card className='border-c radius-h-c border-0'>
            <Card className="position-relative radius-h-c border-0">
                <Card.Img
                    style={{
                        minWidth: "100%",
                        height: "10em",
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-hight) var(--radius-hight) 0 0'
                    }}
                    variant='top'
                    src={user.user.imageUrl}/>
                <Card
                    style={{
                        top: '40%',
                        left: '10%',
                        borderRadius: '100%',
                        width: '6em',
                        height: '6em',
                        overflow: 'hidden',
                        position: 'absolute'
                    }}>
                    <Image
                        className="img-c"
                        src={user.user.imageUrl}/>
                </Card>
                <Card.Body>
                    <Card.Text className="title-c mt-5">{user.user.username}</Card.Text>
                </Card.Body>
            </Card>
            <Dropdown.Divider className="divider-c mx-3"/>
            <Card.Body>
                <Card.Text className='title-c'>preference</Card.Text>
                {user.user.preference.map((pref, index) => (
                    <ListGroupItem key={index} className="border-0 border-c my-3">
                        <Stack direction="horizontal">
                            {pref.name}
                            <button id="removePreference" value={pref.categorieId} onClick={removePrefernceHandler} className="btn-f-c ms-auto">
                                <FontAwesomeIcon onClick={event => {
                                    event.stopPropagation()
                                    reactDom.findDOMNode(document.getElementById('removePreference')).click();
                                }} icon={faTimes} />
                            </button> 
                        </Stack>
                    </ListGroupItem>
                ))}
                
                <button ref={refOverlay} onClick={findPreference} className="btn-c border-c my-3"><FontAwesomeIcon icon={faPlus}/></button>
                {popover}
            </Card.Body>
            <Dropdown.Divider className="divider-c mx-3"/>
            <Card.Body style={{
                    height: '10vw'
                }}>
                <Card.Text className='title-c'>information</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default InformationUser;