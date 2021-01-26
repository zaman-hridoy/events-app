import React from 'react';
import { Grid, Segment, Header, List, Item, Icon } from 'semantic-ui-react';
import { format } from 'date-fns';

function UserDetailedDescription({ profile }) {
    let createdAt;
    if(profile.createdAt) {
        createdAt = format(profile.createdAt.toDate(), 'PP')
    }
    return (
        <Grid.Column width={12}>
            <Segment>
                <Grid columns={2}>
                    <Grid.Column width={10}>
                        <Header icon='smile' content={`About ${profile.displayName}`}/>
                        <p>Occupation: <strong>{profile?.occupation || 'Unknown'}</strong></p>
                        <p>Originally from <strong>{profile?.origin || 'Unknown'}</strong></p>
                        <p>Member Since: <strong>{createdAt || 'Unknown'}</strong></p>
                        <p>{profile.about}</p>

                    </Grid.Column>
                    <Grid.Column width={6}>

                        <Header icon='heart outline' content='Interests'/>
                        {profile.interests ? (
                            <List>
                                {profile.interests.map((item, index) => (
                                    <Item key={index}>
                                        <Icon name='heart'/>
                                        <Item.Content>{item}</Item.Content>
                                    </Item>
                                ))}
                            </List>
                        ): (
                            <p>No interests</p>
                        )}
                    </Grid.Column>
                </Grid>

            </Segment>
        </Grid.Column>
    )
}

export default UserDetailedDescription
