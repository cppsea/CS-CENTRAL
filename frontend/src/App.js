import logo from './logo.svg';
import { Button, Alert, Breadcrumb, Card } from "react-bootstrap";
import React from 'react';

function App() {
  return (
    <div >
       <Card >
          <Card.Img src={logo} />
          <Card.Body>
            <Card.Title>Card Example</Card.Title>
            <Card.Text>This is example of react bootstrap cards</Card.Text>
          </Card.Body>
        </Card>
        <Breadcrumb>
          <Breadcrumb.Item>Test</Breadcrumb.Item>
          <Breadcrumb.Item>Test 2</Breadcrumb.Item>
          <Breadcrumb.Item active>Test 3</Breadcrumb.Item>
        </Breadcrumb>
        <Alert variant="primary">This is a button</Alert>
        <Button>Text button</Button>

        {/* Description Textbox */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px', // makes some space away from other components, may change 
        }}>
            <div style={{
              backgroundColor: '#CECECE', // box background color
              color: 'black',             // font color
              padding: '20px',            
              borderRadius: '10px',       // roundness corners of box
              width: '80%',               // 80% of parent container
              textAlign: 'center',
            }}>
                <p> 
                  lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Vestibulum non elementum erat. Duis id metus semper, pharetra 
                  ipsum quis, commodo ligula.
                </p>
              </div>
        </div>
    </div>
  );
}

export default App;
