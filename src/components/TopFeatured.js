import {Card} from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useRecoilValue } from "recoil";
import topFeaturedState from "../setup/recoil/topFeaturedState";


function TopFeatured() {
    const topFeatured = useRecoilValue(topFeaturedState);
    const history = useHistory();


    return (
        <Card className='border-0 border-c radius-h-c'>
            <Card.Body className='title-c border-c mb-0' style={{borderRadius: 'var(--radius-hight) var(--radius-hight) var(--radius) var(--radius)'}}>Featured</Card.Body>
            <Card.Body>
                {topFeatured.map((topFeaturedItem, index) => (    
                    <div onClick={() => history.push('/v1/search/'+topFeaturedItem.name)} className="m-3 btn-f-c" key={index} >
                        <Card.Text className="m-2">{topFeaturedItem.name}</Card.Text>
                    </div>
                ))}
            </Card.Body>
        </Card>
    )
}

export default TopFeatured;