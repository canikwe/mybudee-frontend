import React from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'

const ContactPlaceholder = () => (
  <Segment placeholder>
    <Header icon>
      <Icon name='user plus' />
      You don't have any contacts yet.
    </Header>
    <Button primary>Add New Contact</Button>
  </Segment>
)

export default ContactPlaceholder