import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';

// descbox component that will take a prop as text
const DescriptionBox = ({ text }) => {
    // jsx will be returned by component
    return (
        <div style={{ 
            backgroundColor: '#F25F5F', // background color of box
            borderRadius: '10px',       // round corners
            padding: '6px',             // inside pad of box
            maxWidth: '750px', 
            margin: '0 auto', 
            width: '100%' 
        }}> 
            {/* below is boostrap row comp to structure img and txt into a grid*/}
            <Row noGutters>
                <Col xs={12} md={3} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Image src="/CS_Catalog_2.png" fluid style={{ maxWidth: '150px', borderRadius: '10px' }} />
                </Col>
                {/* header for desc box*/}
                <Col xs={12} md={9} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3 style={{ margin: '0 0 5px 0', textAlign: 'left' }}>What is CS Catalog?</h3>

                    <p style={{ color: 'white', margin: '0', textAlign: 'left' }}>{text}</p>
                </Col>

            </Row>
        </div>
    );
};

// exporting comp for use in other parts of the app
export default DescriptionBox;
