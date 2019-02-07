# HOW TO
**(c) cypchat.**
rn-parallax-swipe-gallery is a very easy to use parallax gallery.

all you need to define a simple json api, such as:

    const DATA = [
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

and pass it through to Gallery component:

    <Gallery image_data={DATA} />

Thats all you need to do.

![parallax image features](https://lh3.googleusercontent.com/4_VTJ6waiMHv9GHAFGEbG5gz0VegT-TgN1hi5qvbbKOENvdF95iJFkt2HPteKVtpa3mfQeChG7wW)

