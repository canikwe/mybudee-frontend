import React, { useEffect } from "react";
import { Card, Icon, Image, Dimmer } from "semantic-ui-react";

interface Props {
  contact: any;
}

const Contact = ({ contact }: Props) => {
  useEffect(() => {
    console.log("Contact useEffect");
  }, []);

  const [active, setActive] = React.useState(false);

  const handleShow = () => setActive(true);
  const handleHide = () => setActive(false);

  if (contact) {
    return (
      <div>
        <Dimmer.Dimmable as={Card} blurring dimmed={active}>
          {/* <Card raised> */}
          <Card.Content>
            <Image
              floated="left"
              size="mini"
              src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            />
            <Card.Header>{contact.name}</Card.Header>
            <Card.Meta>
              <span className="date">{contact.kind}</span>
            </Card.Meta>
            <Card.Description>{contact.details}</Card.Description>
            <button onClick={handleShow}>More... </button>
          </Card.Content>
          <Card.Content extra>
            <button>
              <Icon name="leaf" />2 Upcoming Reminders
            </button>
            <br />
            <button>
              <Icon name="exclamation" />1 Overdue Task
            </button>
          </Card.Content>
          {/* </Card> */}

          <Dimmer active={active} onMouseLeave={handleHide}>
            <Card.Content>
              <Card.Header>Contact's activity feed will go here.</Card.Header>
            </Card.Content>
          </Dimmer>
        </Dimmer.Dimmable>
      </div>
    );
  } else {
    return <h3>No contact here... Something went wrong!</h3>;
  }
};

export default Contact;
