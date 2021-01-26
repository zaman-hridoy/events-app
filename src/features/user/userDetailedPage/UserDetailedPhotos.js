import React from 'react';
import { Grid, Segment, Header, Image } from 'semantic-ui-react';
import LazyLoad from 'react-lazyload';

function UserDetailedPhotos({ photos }) {
    return (
        <Grid.Column width={12}>
            <Segment attached>
                <Header icon='image' content='Photos'/>
                <Image.Group size='small'>
                    {photos.map(item => (
                        <LazyLoad key={item.id} height={150} offset={-150} placeholder={<Image src="/assets/img/loader.gif" />}>
                            <Image src={item.url} />
                        </LazyLoad>
                    ))}
                </Image.Group>
            </Segment>
        </Grid.Column>
    )
}

export default UserDetailedPhotos
