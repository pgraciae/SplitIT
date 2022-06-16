
import Container from 'react-bootstrap/Container'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css' ;

function NavBarCustom(props) {

    return (
        <div style = {{position: 'absolute', width: '100%', left: '0vw', top:'0vw'}}>
  <Navbar bg="dark" variant="dark" >
    <Container style = {{height:'3vw'}}>
    <Nav className="me-auto" >
      <Nav.Link href="#login" style = {{left:'10vw',top:'0.5vw',  position:'absolute'}} onClick={(event)=>props.view(event, 'Login')}>Login</Nav.Link> 
      <Nav.Link href="#home" style = {{left:'20vw',top:'0.5vw',  position:'absolute'}} onClick={(event)=>props.view(event, 'Home')}>Home</Nav.Link>
      <Nav.Link href="#features" style = {{left:'30vw', top:'0.5vw', position:'absolute'}} onClick={(event)=>props.view(event, 'Profile')}>Profile</Nav.Link>
      <Nav.Link href="#pricing" style = {{left:'40vw',top:'0.5vw',  position:'absolute'}} onClick={(event)=>props.view(event, 'Tickets')}>Tickets</Nav.Link>
      <Nav.Link href="#friends" style = {{left:'50vw',top:'0.5vw',  position:'absolute'}} onClick={(event)=>props.view(event, 'Friends')}>Friends</Nav.Link>
      <Nav.Link href="#groups" style = {{left:'60vw',top:'0.5vw',  position:'absolute'}} onClick={(event)=>props.view(event, 'Groups')}>Groups</Nav.Link>
      <Nav.Link href="#statics" style = {{left:'70vw',top:'0.5vw',  position:'absolute'}} onClick={(event)=>props.view(event, 'Statistics')}>Statistics</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  <br />

 </div>    
 )
}
export default NavBarCustom;