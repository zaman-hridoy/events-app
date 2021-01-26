import React, {Component} from 'react';
import {Image, Segment, Header, Divider, Grid, Button, Card, Icon} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { uploadProfileImage, deletePhoto, setMainPhoto } from '../userActions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class PhotosPage extends Component {
    state = {
        files: [],
        fileName: '',
        imageUrl: null,
        croppedResult: null,
        image: {}
    }

    getFile = files => {
        if(files) {
            const imageUrl = URL.createObjectURL(files[0]);
            this.setState({
                files,
                imageUrl,
                fileName: files[0].name
            });
        }
    }

    _crop = () => {
        // image in dataUrl
        if(this.cropper.getCroppedCanvas() === undefined) return;

        this.cropper.getCroppedCanvas().toBlob(blob => {
            // console.log(blob) // blob = size: 1487256, type: "image/png"
            let imageUrl;
            if(blob) {
                imageUrl = URL.createObjectURL(blob);
            }
            this.setState({
                croppedResult: imageUrl,
                image: blob
            })
        })
    }

    onCropperInit = (cropper) => {
        this.cropper = cropper;
    }

    uploadImage = async () => {
        await this.props.uploadProfileImage(this.state.image);
        this.cancelCrop();
    }

    cancelCrop = () => {
        this.setState({
            files: [],
            fileName: '',
            imageUrl: null,
            croppedResult: null,
            image: {}
        })
    }

    handleDeletePhoto = photo => {
        this.props.deletePhoto(photo);
    }

    render() {
        const { photos, profile, loading } = this.props;
        let filteredPhotos;
        if(photos) {
            filteredPhotos = photos.filter(photo => photo.url !== profile.photoURL)
        }
        return (
            <Segment>
                <Header dividing size='large' content='Your Photos' />
                <Grid>
                    <Grid.Row />
                    <Grid.Column width={4}>
                        <Header color='teal' sub content='Step 1 - Add Photo'/>
                        <Dropzone 
                            onDrop={this.getFile}
                            multiple={false}
                        >
                            {({getRootProps, getInputProps}) => (
                                <section style={{ paddingTop: 15, textAlign: 'center', border: '1px dotted #ccc' }}>
                                <div {...getRootProps()}>
                                    <Icon name="upload" size="huge" />
                                        <input {...getInputProps()} accept="image/*" />
                                    <Header content="Drop image here or click to add" />
                                </div>
                                </section>
                            )}
                        </Dropzone>
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 2 - Resize image' />
                        {this.state.files[0] && (
                            <Cropper 
                                style={{ height: 150, width: '100%' }}
                                // src={this.state.fileUrl}
                                src={this.state.imageUrl}
                                initialAspectRatio={1}
                                guides={false}
                                viewMode={0}
                                dragMode="move"
                                scalable={true}
                                cropBoxMovable={true}
                                cropBoxResizable={true}
                                crop={this._crop}
                                onInitialized={this.onCropperInit}
                            />
                        )}
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 3 - Preview and Upload' />
                        {this.state.croppedResult && (
                            <div>
                                <Image style={{ height: 150, width: 150 }} src={this.state.croppedResult} />
                                <Button.Group>
                                    <Button loading={loading} onClick={this.uploadImage} style={{width:"75px"}} positive icon="check" />
                                    <Button disabled={loading} onClick={this.cancelCrop} style={{width:"75px"}} icon="close" />
                                </Button.Group>
                            </div>
                        )}
                    </Grid.Column>
                </Grid>

                <Divider/>
                <Header sub color='teal' content='All Photos'/>

                <Card.Group itemsPerRow={5}>
                    {!profile.isEmpty && (
                        <Card>
                            <Image src={profile.photoURL || '/assets/img/user.png'} />
                            <Button positive>Main Photo</Button>
                        </Card>
                    )}
                    {photos && filteredPhotos.map(photo => (
                        <Card key={photo.id}>
                            <Image
                                src={photo.url}
                            />
                            <div className='ui two buttons'>
                                <Button onClick={() => this.props.setMainPhoto(photo)} basic color='green'>Main</Button>
                                <Button basic icon='trash' color='red' onClick={() => this.handleDeletePhoto(photo)} />
                            </div>
                        </Card>
                    ))}
                </Card.Group>
            </Segment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    photos: state.firestore.ordered.photos,
    loading: state.async.loading
})

const actions = {
    uploadProfileImage,
    deletePhoto,
    setMainPhoto
}

const queryData = ({auth}) => {
    // console.log(auth);
    if(auth.isLoaded && !auth.isEmpty) {
        return [
            {
                collection: 'users',
                doc: auth.uid,
                subcollections: [{
                    collection: 'photos'
                }],
                storeAs: 'photos'
            }
        ]
    }
    return [];
}

export default compose(
    connect(mapStateToProps, actions),
    firestoreConnect(props => queryData(props))
)(PhotosPage);