import * as React from "react";
import { Image, StyleSheet } from 'react-native';
import NativeControl from "../Interfaces/NativeControl";

interface ImageProps extends NativeControl {
    className:string,
    imageUrl:string,
    imageAlt:string
}

export default class NativeImage extends React.Component<ImageProps> {
    constructor(props){
        super(props)
        this.state={imageError:0}
    }
    _onError = () => {
        this.setState({imageError: 1})
    }
    render() {
        const {imageUrl, imageAlt} = this.props
        return (
           <Image
               resizeMode={'contain'}
                source={{uri:this.state.imageError === 1 ? imageAlt : imageUrl}}
                style={styles.image}
                onError={this._onError}
           />
    );
    }
}
const styles = StyleSheet.create({
    image:{width: 200, height: 200}
});
