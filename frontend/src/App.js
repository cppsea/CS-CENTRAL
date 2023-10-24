import logo from './logo.svg';
import { Button, Alert, Breadcrumb, Card } from "react-bootstrap";


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
    </div>
  );
}

export default App;
