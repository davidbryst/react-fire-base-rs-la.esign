import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Stack, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { updateDoc, doc, increment, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../setup/config-firebase";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import userState from "../setup/recoil/userState";
import dayjs from "dayjs";


function SinglePost(props) {
    const user = useRecoilValue(userState);

    const likeHandler = async () => {
        await getDoc(doc(db, 'post', props.post.id))
        .then(QuerySnapshot => {
            const id = user.user.id;
            const likers = QuerySnapshot.data().likers;
            // console.log(id, likers);
            if( likers.find(liker => liker === id) === undefined ){
                return updateDoc(doc(db, 'post', props.post.id), {
                    like: increment(1),
                    likers: arrayUnion(user.user.id),
                })
            } else {
                return 'already';
            }
        })
        .then(QuerySnapshot => console.log('QuerySnapshot'))
        .catch(error => console.log(error));
    }


    useEffect(() => {
        (async () => {
            await getDoc(doc(db, 'post', props.post.id))
            .then(QuerySnapshot => {
                const id = user.user.id;
                const followers = QuerySnapshot.data().followers;
                if( followers.find(follower => follower === id) === undefined ){
                    return updateDoc(doc(db, 'post', props.post.id), {
                        follow: increment(1),
                        followers: arrayUnion(user.user.id),
                    })
                } else {
                    return 'already';
                }
            })
            .then(QuerySnapshot => console.log('QuerySnapshot'))
            .catch(error => console.log(error));
        })()
    }, []);
    

    function SpanConter(props) {
        let number = props.number;

        if (number >= 1000) {

            return (
                <span className="ms-3">{Math.round(props.number/1000)}k</span>
            )
        }

        return (
            <span className="ms-3">{props.number}</span>
        )
    }
    const link = (user.user.id === props.post.author.id) ? '/v1/profile' : '/v1/user/'+props.post.author.id;

    function getDate(date) {
        return dayjs(date).format("DD MMMM YYYY");
    }

    return (
        <Card className="mt-4 border-0 border-c radius-h-c" >
            <Card.Body style={{ overflow: 'hidden' }}>
                <Stack direction="horizontal" className='mb-3'>
                    
                    <Link to={link} className="link-c fs-6 fw-bold">
                        <Card className="my-auto" style={{ borderRadius: '100%', width: '3.5em', height: '3.5em', overflow: 'hidden' }}>
                            <Card.Img className="img-c" src={props.post.author.imageUrl} />
                        </Card>
                    </Link>
                    <Stack className="ms-3 my-auto">
                        <Link to={link} className="link-c my-2 fs-6 fw-bold">{props.post.author.username}</Link>
                        <span style={{color: 'gray'}} className= 'border-c radius-h-c px-3 py-1 me-auto'>{getDate(props.post.createdAt)}</span>
                    </Stack>
                    {/* <button className="btn-c border-c my-auto"><FontAwesomeIcon icon={faEllipsisH} /></button> */}
                </Stack>      
                <span className="title-c mt-4 fs-6 fw-bold">{props.post.title}</span>
                <Card.Text className="fs-6 fw-light" style={{color: 'gray'}}>{props.post.description}</Card.Text>
                
                <Stack className="mb-3" style={{ overflow: 'hidden'}} direction="horizontal">
                    {props.post.imagesUrl.map((url, index) => (
                        <Card key={index} className='border-0 border-c radius-h-c m-1' style={{ minWidth: '100%', overflow: 'hidden'}}>
                            <Image style={{ height: "auto", width: '100%'}} src={url} />
                        </Card>
                    ))}
                </Stack>

                <Stack direction="horizontal">
                    <span className='me-5 badge-c border-c'>
                        <FontAwesomeIcon icon={faEye}/>
                        <span className="ms-3">{props.post.follow}</span>
                    </span>
                    {/* <button className='me-5 post-btn-c border-c'>
                        <FontAwesomeIcon icon={faComments}/>
                        <span className="ms-3"></span>
                    </button> */}
                    <button onClick={likeHandler} className='me-5 post-btn-1-c border-c'>
                        <FontAwesomeIcon icon={faHeart}/>
                        <SpanConter number={props.post.like}/>
                    </button>
                </Stack>
            </Card.Body>
        </Card>
    )
}

export default SinglePost;