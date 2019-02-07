import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Animated,
    PanResponder,
    Image,
    ActivityIndicator
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DEFAULT_HEADER_HEIGHT = Dimensions.get('window').height;
const DEFAULT_THRESHOLD = SCREEN_WIDTH * 0.50;
const LEFTSIDE_THRESHOLD = SCREEN_WIDTH * 0.50;

class BlurredImage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };

        const SCREEN_WIDTH = Dimensions.get('window').width;
        const DEFAULT_HEADER_HEIGHT = SCREEN_WIDTH - 150;
    }

    _renderActivityIndicator = _ => {
        return <View style={{
            alignItems: "center",
            justifyContent: "center",
            width: SCREEN_WIDTH,
            height: DEFAULT_HEADER_HEIGHT
        }}>
            <ActivityIndicator color="#fff" size="large"/>
        </View>
    };

    render() {
        const {item} = this.props;
        return (
            <View>
                {/* Blurred background Image. */}
                <Image
                    source={{
                        uri: item.uri,
                        headers: {
                            Pragma: 'only-if-cached',
                        }
                    }}
                    onLoad={_ => this.setState({loading: false})}
                    onLoadStart={_ => this.setState({loading: true})}
                    style={{
                        width: SCREEN_WIDTH,
                        height: DEFAULT_HEADER_HEIGHT,
                        position: 'absolute',
                        backgroundColor: 'black'
                    }}

                    resizeMode='cover'
                    blurRadius={7}
                />

                {
                    this.state.loading
                        ?
                        this._renderActivityIndicator()
                        :
                        <View>
                            {/* Actual Image. */}
                            <Image
                                source={{
                                    uri: item.uri,
                                    headers: {
                                        Pragma: 'only-if-cached',
                                    }
                                }}
                                style={{width: SCREEN_WIDTH, height: DEFAULT_HEADER_HEIGHT}}
                                resizeMode='contain'
                                cache={false}
                            />
                            {
                                item.comment
                                    ?
                                    <View style={styles.imageContent}>
                                        <Text style={{color: '#fff', fontSize: 12}}>
                                            {item.comment}
                                        </Text>
                                    </View>
                                    :
                                    null
                            }
                        </View>
                }

            </View>
        )
    }
}


export default class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            speed: 'slow'
        };

        const position = new Animated.ValueXY();
        this.panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderMove: (evt, gestureState) => {
                // The most recent move distance is gestureState.move{X,Y}
                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
                this.handleSwipe(gestureState)
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
                this.handleRelease(gestureState)
            },

        });

        this.position = position;

        this.leftImagesInitialPosition = -160;
        this.leftSwipedImagesArray = [];
    }

    handleSwipe = gestureState => {
        this.position.setValue({x: gestureState.dx, y: 0});
        const leftEdgeOfTheImage = SCREEN_WIDTH + Object.values(this.position.x)[1];

        // left side of the array is outside and if the first image is showing
        // the image can not go to anywhere because it is the end of the image array.
        if (leftEdgeOfTheImage > SCREEN_WIDTH && this.state.index === 0) {
            this.setState({speed: 'slow'});
        }
        // if not the first image is showing
        // and the left side of the array is in between the left side threshold and width of screen.
        else if (leftEdgeOfTheImage > SCREEN_WIDTH && leftEdgeOfTheImage < SCREEN_WIDTH + LEFTSIDE_THRESHOLD && this.state.index !== 0) {
            this.setState({speed: 'fast'});
        }
        // if not the first image is showing
        // and left side of the array is bigger than the screen width also the threshold
        else if (leftEdgeOfTheImage > SCREEN_WIDTH && leftEdgeOfTheImage > SCREEN_WIDTH + LEFTSIDE_THRESHOLD && this.state.index !== 0) {
            this.setState({speed: 'fast'});
        } else {
            this.setState({speed: 'slow'});
        }

    };

    handleRelease = gestureState => {
        const leftEdgeOfTheImage = SCREEN_WIDTH + Object.values(this.position.x)[1];

        // Visible left edge of the array if only in screen.
        if (leftEdgeOfTheImage > 0 && leftEdgeOfTheImage < SCREEN_WIDTH) {

            // If the last image is showing
            if (this.props.image_data.length - 1 === this.state.index) {

                // Automatically set the position to 0.
                Animated.timing(this.position, {
                    toValue: {x: 0, y: 0},
                    duration: 300
                }).start(() => {
                    this.position.setValue({x: 0, y: 0});
                });

            } else {

                if (leftEdgeOfTheImage > DEFAULT_THRESHOLD) {

                    // Automatically swipe to right edge of the screen. direction: [ --> ]
                    Animated.timing(this.position, {
                        toValue: {x: 0, y: 0},
                        duration: 300
                    }).start(() => {
                        this.position.setValue({x: 0, y: 0});
                    });

                } else {

                    // Automatically swipe to left edge of the screen. direction: [ <-- ]
                    Animated.timing(this.position, {
                        toValue: {x: -SCREEN_WIDTH, y: 0},
                        duration: 300
                    }).start(() => {
                        // Update the swiped images array.
                        this.leftSwipedImagesArray.push(this.props.image_data[this.state.index]);

                        // Set the index of the image that is showing right now.
                        this.setState({index: this.state.index + 1});
                        this.position.setValue({x: 0, y: 0});
                    });

                }

            }

        }
        // left side of the array is outside and if the first image is showing
        // the image can not go to anywhere because it is the end of the image array.
        else if (leftEdgeOfTheImage > SCREEN_WIDTH && this.state.index === 0) {

            // Automatically set the position to 0.
            Animated.timing(this.position, {
                toValue: {x: 0, y: 0},
                duration: 300
            }).start(() => {
                this.position.setValue({x: 0, y: 0});
            });

        }
        // if not the first image is showing
        // and the left side of the array is in between the left side threshold and width of screen.
        else if (leftEdgeOfTheImage > SCREEN_WIDTH && leftEdgeOfTheImage < SCREEN_WIDTH + LEFTSIDE_THRESHOLD && this.state.index !== 0) {
            // Automatically set the position to 0.
            Animated.timing(this.position, {
                toValue: {x: 0, y: 0},
                duration: 300
            }).start(() => {
                this.position.setValue({x: 0, y: 0});
            });

        }
        // if not the first image is showing
        // and left side of the array is bigger than the screen width also the threshold
        else if (leftEdgeOfTheImage > SCREEN_WIDTH && leftEdgeOfTheImage > SCREEN_WIDTH + LEFTSIDE_THRESHOLD && this.state.index !== 0) {
            // Automatically swipe to left edge of the screen. direction: [ --> ]
            Animated.timing(this.position, {
                toValue: {x: SCREEN_WIDTH, y: 0},
                duration: 300
            }).start(() => {
                // Update the swiped images array.
                this.leftSwipedImagesArray.splice(this.leftSwipedImagesArray.length - 1, 1);

                // Set the index of the image that is showing right now.
                this.setState({index: this.state.index - 1});
                this.position.setValue({x: 0, y: 0});
            });

        }

    };

    getFirstImageParallaxPositions = _ => {

        const parallax = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
            outputRange: [this.leftImagesInitialPosition, 0, this.leftImagesInitialPosition * -1]
        });

        if (this.state.speed === 'slow') {
            return {
                left: parallax
            }
        } else {
            return {
                left: this.position.x
            }
        }

    };

    getLeftImageParallaxPositions = _ => {

        const parallax = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
            outputRange: [this.leftImagesInitialPosition, 0, this.leftImagesInitialPosition * -1]
        });

        return {
            left: parallax
        }

    };

    renderLeftSwipedImages = _ => {
        return this.leftSwipedImagesArray.map((item, index) => {
            if (index === this.leftSwipedImagesArray.length - 1) {
                return <Animated.View
                    key={index}
                    style={this.getLeftImageParallaxPositions()}>
                    <BlurredImage item={item}/>
                </Animated.View>
            } else {
                return <Animated.View
                    key={index}
                    style={{position: 'absolute'}}>
                    <BlurredImage item={item}/>
                </Animated.View>
            }
        })
    };

    renderFirstImage = _ => {
        // First image should be in a different AnimatedView,
        // because it will act separately from other images.

        return this.props.image_data.map((item, index) => {
            if (index < this.state.index) {
                return null;
            } else if (index === this.state.index) {
                return <Animated.View
                    key={index}
                    {...this.panResponder.panHandlers}
                    style={this.getFirstImageParallaxPositions()}>
                    <BlurredImage item={item}/>
                </Animated.View>
            }
        });
    };

    renderImages = _ => {
        // Render other whole images into a single AnimatedView
        return this.props.image_data.map((item, index) => {
            if (index > this.state.index) {
                return <BlurredImage item={item} key={index}/>
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>

                {/* Parallax images header. */}
                <View style={styles.header}>

                    <View style={{
                        height: DEFAULT_HEADER_HEIGHT,
                        flexDirection: 'row',
                        position: 'absolute',
                        left: this.leftImagesInitialPosition
                    }}>
                        {
                            this.renderLeftSwipedImages()
                        }
                    </View>

                    <View style={{
                        height: DEFAULT_HEADER_HEIGHT,
                        flexDirection: 'row'
                    }}>
                        {
                            this.renderFirstImage()
                        }
                        <Animated.View
                            style={{
                                left: this.position.x,
                                flexDirection: 'row'
                            }}>
                            {
                                this.renderImages()
                            }
                        </Animated.View>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        width: SCREEN_WIDTH,
        height: DEFAULT_HEADER_HEIGHT,
        backgroundColor: '#000'
    },
    imageContent: {
        width: SCREEN_WIDTH,
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        bottom: 0
    }
});
