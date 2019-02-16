## Installation

add it to your repo
 

    npm i --save @cypchat/rn-parallax-swipe-gallery
    &
    yarn add @cypchat/rn-parallax-swipe-gallery

## HOW TO

**(c) cypchat.** 

**v1.0.0 stable**

|Features & versions | url | source | stable |
|--|--|--|--|
| v0.0.1  | ✔ | ✖	| ✖
| v0.0.2  | ✔ | ✖	| ✖
| v1.0.0  | ✔ | ✔ | ✔ |

rn-parallax-swipe-gallery is a very easy to use parallax gallery.

all you need to define a simple json api, such as:

    const  PARALLAX_DATA  = [
	    {
		    comment:  'I love the ocean, because I am a caretta :)))',
		    source:  caretta,
		    width:  2048,
		    height:  1360
	    },
	    {
		    comment:  'Look at the shiny sun. There is no place such a beautiful vision in the Universe.',
		    uri:  'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg',
		    width:  900,
		    height:  598
	    },
	    {
		    uri:  'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg',
		    width:  800,
		    height:  390
	    }
    ];

and pass it through to Gallery component:

    <Gallery image_data={DATA} />

Thats all you need to do.

![enter image description here](https://lh3.googleusercontent.com/Z-aLNLaRBcZbyN_JnVQg6wMnTLj7cMefL_hEcQ_Dybgr_B3LHQkALYvZZMYQAqQTHoCMn6pKG0DM "Swipe Update gif")

