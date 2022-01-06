import 'bootstrap/dist/css/bootstrap.min.css';
import { Card,  Image } from 'react-bootstrap';
import React, { useRef, useState } from 'react';

function ImageSelector(props) {
    const ref = useRef();
    const [imageUrl, setImageUrl] = useState();
    const setFile = (event) => {
        const file = event.target.files[0];
        props.setImage(file)
      const reader = new FileReader();
      reader.onload = () => {
          if (reader.readyState === 2) {
              setImageUrl(reader.result)
          }
      }
      reader.readAsDataURL(file);
    };

    return (
        <div>
            <Card style={{
                maxWidth: '200px',
                maxHeight: '200px',
            }} className='p-2 m-1 mx-auto border-0 border-c radius-h-c d-sm-none'>
                <Card style={{
                    overflow: 'hidden',
                    maxWidth: '150px',
                    maxHeight: '150px',
                    minWidth: '10px',
                    minHeight: '10px',
                    borderRadius: "100%",
                }}  className='border-0 border-c mx-auto radius-h-c'>
                    <Image style={{
                        objectFit: 'cover',
                    }} src={imageUrl && imageUrl} className='img-fluid' />
                </Card>
                <Card style={{
                    maxWidth: '200px',
                    maxHeight: '200px',
                }} direction='horizontal' className='mt-3 border-0'>
                    <button className='btn-form-c' onClick={() => ref.current.click()}>Choose a file</button>
                    <input ref={ref} onChange={setFile} type="file" accept='image/*' hidden="hidden"/>
                </Card>
            </Card>
            <Card style={{
                maxWidth: '400px',
                maxHeight: '300px',
            }} className='p-2 m-1 mx-auto border-0 border-c radius-h-c d-none d-sm-flex'>
                <Card style={{
                    overflow: 'hidden',
                    maxWidth: '400px',
                    maxHeight: '300px',
                    minWidth: '40px',
                    minHeight: '40px',
                    borderRadius: "100%",
                }}  className='border-0 border-c mx-auto radius-h-c'>
                    <Image style={{
                        objectFit: 'cover',
                    }} src={imageUrl && imageUrl} className='img-fluid' />
                </Card>
                <Card style={{
                    maxWidth: '400px',
                }} direction='horizontal' className='mt-3 border-0'>
                    <button className='btn-form-c' onClick={() => ref.current.click()}>Choose a file</button>
                    <input ref={ref} onChange={setFile} type="file" accept='image/*' hidden="hidden"/>
                </Card>
            </Card>
        </div>
    )
}

export default ImageSelector;