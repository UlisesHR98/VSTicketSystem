import Card from 'react-bootstrap/Card';
import "./CardComponent.css"

function CardTemplate({title, content, Icon, onClick}) {
  return (
    <Card style={{ width: '18rem', bg: 'success'}} onClick={onClick}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
        {Icon && <Icon className="icon-size" />}
      </Card.Body>
    </Card>
  );
}

export default CardTemplate;