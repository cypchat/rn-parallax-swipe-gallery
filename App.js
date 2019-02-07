import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';

// components
import Gallery from './Gallery'

const PARALLAX_DATA = [
    {
        comment: '1) this was a great day like a day from heaven. this was a great day like a day from heaven.',
        uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg'
    },
    {
        comment: '2) this was a great day like a day from heaven.',
        uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg'
    },
    {
        comment: '3) this was a great day like a day from heaven.',
        uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg'
    },
    {
        comment: '4) this was a great day like a day from heaven.',
        uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg'
    },
    {
        comment: '5) this was a great day like a day from heaven.',
        uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg'
    }
];

export default class App extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <Gallery
                    image_data={PARALLAX_DATA}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
