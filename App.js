import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';

// components
import Gallery from './Gallery'
let caretta = require('./assets/caretta.jpg')

const PARALLAX_DATA = [
    {
        comment: 'I love the ocean, because I am a caretta :)))',
        source: caretta,
        width: 2048,
        height: 1360
    },
    {
        comment: 'Look at the shiny sun. There is no place such a beautiful vision in the Universe.',
        uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg',
        width: 900,
        height: 598
    },
    {
        uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg',
        width: 800,
        height: 390
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
