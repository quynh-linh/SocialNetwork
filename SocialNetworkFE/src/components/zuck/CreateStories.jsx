import  "./CreateStories.scss";
import { Component } from 'react';
import { Zuck } from 'zuck.js';
import 'zuck.js/css';
import 'zuck.js/skins/snapgram';
import { timestamp } from '~/const/zuck';
class CreateStories extends Component {
    constructor(props) {
      super(props);
      this.storiesElement = null;
      this.storiesApi = null;

      this.state = {
        stories: [
          {
            id: 'ramon',
            photo:'https://firebasestorage.googleapis.com/v0/b/recruit-website-d9181.appspot.com/o/images%2Fassests%2F361848543_1651168908703220_1686531172149351760_n.jpg?alt=media&token=203eb757-8cfd-492d-861a-32a32a4bff5c',
            name: 'Quan Văn Mạnh',
            time: timestamp(),
            items: [
              {
                id: 'ramon-1',
                type: 'photo',
                length: 3,
                src: 'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/1.jpg',
                preview:
                  'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/1.jpg',
                link: '',
                linkText: false,
                time: timestamp()
              },
              {
                id: 'ramon-2',
                type: 'video',
                length: 0,
                src: 'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/2.mp4',
                preview:
                  'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/2.jpg',
                link: '',
                linkText: false,
                time: timestamp()
              },
              {
                id: 'ramon-3',
                type: 'photo',
                length: 3,
                src: 'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/3.png',
                preview:
                  'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/3.png',
                link: 'https://ramon.codes',
                linkText: 'Visit my Portfolio',
                time: timestamp()
              }
            ]
          },
          {
            id: 'ladygaga',
            photo:'https://firebasestorage.googleapis.com/v0/b/recruit-website-d9181.appspot.com/o/images%2Fassests%2F387802087_1831367780653105_6921781964985768751_n.jpg?alt=media&token=bd18b09b-df87-40a4-94d8-c5c69c703118',
            name: 'Kiều My',
            time: timestamp(),
            items: [
              {
                id: 'ladygaga-1',
                type: 'photo',
                length: 5,
                src: 'https://firebasestorage.googleapis.com/v0/b/recruit-website-d9181.appspot.com/o/images%2Fassests%2F61901520_2234092053496589_4430612769913438208_n.jpg?alt=media&token=684dff8a-a8f1-4294-bff4-62151ba47e57',
                preview:
                  'https://firebasestorage.googleapis.com/v0/b/recruit-website-d9181.appspot.com/o/images%2Fassests%2F61901520_2234092053496589_4430612769913438208_n.jpg?alt=media&token=684dff8a-a8f1-4294-bff4-62151ba47e57',
                link: '',
                linkText: false,
                time: timestamp()
              },
              {
                id: 'ladygaga-2',
                type: 'photo',
                length: 3,
                src: 'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/7.jpg',
                preview:
                  'https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/7.jpg',
                link: 'http://ladygaga.com',
                linkText: false,
                time: timestamp()
              }
            ]
          },
          {
            id: 'starboy',
            photo:
              'https://firebasestorage.googleapis.com/v0/b/recruit-website-d9181.appspot.com/o/images%2Fassests%2F323052474_553946006627634_2512847703726122135_n.jpg?alt=media&token=6e44def2-c868-4419-90a8-3773aef54d6c',
            name: 'Kim Yến',
            time: timestamp(),
            items: [
              {
                id: 'starboy-1',
                type: 'photo',
                length: 5,
                src: 'https://firebasestorage.googleapis.com/v0/b/recruit-website-d9181.appspot.com/o/images%2Fassests%2Fb9023e4593a43afa63b5.jpg?alt=media&token=f64a7adf-0ed2-4c4f-8915-4289b0934cdf',
                preview:
                  'https://firebasestorage.googleapis.com/v0/b/recruit-website-d9181.appspot.com/o/images%2Fassests%2Fb9023e4593a43afa63b5.jpg?alt=media&token=f64a7adf-0ed2-4c4f-8915-4289b0934cdf',
                link: '',
                linkText: false,
                time: timestamp()
              }
            ]
          },
          {
            id: 'riversquomo',
            photo:
              'https://firebasestorage.googleapis.com/v0/b/recruit-website-d9181.appspot.com/o/images%2Fassests%2F327898676_1027671731956043_2947151331630452073_n.jpg?alt=media&token=de5a8f4b-ea32-4837-aa69-4ae8f2b6d355',
            name: 'Quỳnh Linh',
            time: timestamp(),
            items: [
              {
                id: 'riverscuomo-1',
                type: 'photo',
                length: 10,
                src: 'https://firebasestorage.googleapis.com/v0/b/recruit-website-d9181.appspot.com/o/images%2Fassests%2F229994949_1293159267807295_5495284847977983067_n.jpg?alt=media&token=1afcafaf-6a91-4b1b-87f8-6586b17b688e',
                preview:
                  'https://firebasestorage.googleapis.com/v0/b/recruit-website-d9181.appspot.com/o/images%2Fassests%2F229994949_1293159267807295_5495284847977983067_n.jpg?alt=media&token=1afcafaf-6a91-4b1b-87f8-6586b17b688e',
                link: '',
                linkText: false,
                time: timestamp()
              },
              {
                id: 'riverscuomo-2',
                type: 'photo',
                length: 10,
                src: 'https://firebasestorage.googleapis.com/v0/b/recruit-website-d9181.appspot.com/o/images%2Fassests%2F323052474_553946006627634_2512847703726122135_n.jpg?alt=media&token=6e44def2-c868-4419-90a8-3773aef54d6c',
                preview:
                  'https://firebasestorage.googleapis.com/v0/b/recruit-website-d9181.appspot.com/o/images%2Fassests%2F323052474_553946006627634_2512847703726122135_n.jpg?alt=media&token=6e44def2-c868-4419-90a8-3773aef54d6c',
                link: '',
                linkText: false,
                time: timestamp()
              }
            ]
          }
        ]
      };
    }

    componentDidMount() {

      this.storiesApi = Zuck(this.storiesElement, {
        skin: 'snapgram',      // container class
        avatars: true,         // shows user photo instead of last story item preview
        list: false,           // displays a timeline instead of carousel
        openEffect: true,      // enables effect when opening story
        cubeEffect: false,     // enables the 3d cube effect when sliding story
        autoFullScreen: false, // enables fullscreen on mobile browsers
        backButton: true,      // adds a back button to close the story viewer
        backNative: false,     // uses window history to enable back button on browsers/android
        previousTap: true,     // use 1/3 of the screen to navigate to previous item when tap the story
        localStorage: true,    // set true to save "seen" position. Element must have a id to save properly.
        reactive: true,        // set true if you use frameworks like React to control the timeline (see react.sample.html)
        rtl: false,
        stories: this.state.stories,
        reactive: true,
        callbacks:  {
            onOpen (storyId, callback) {
              callback();  // on open story viewer
            },
        
            onView (storyId) {
              // on view story
            },
        
            onEnd (storyId, callback) {
              callback();  // on end story
            },
        
            onClose (storyId, callback) {
              callback();  // on close story viewer
            },
        
            onNavigateItem (storyId, nextStoryId, callback) {
              callback();  // on navigate item of story
            },
        
            onDataUpdate (currentState, callback) {
              callback(); // use to update state on your reactive framework
            }
          },
      });
    }

    render() {
        
        const timelineItems = [];
        
        this.state.stories.forEach((story, storyId) => {
            const storyItems = [];

            story.items.forEach((storyItem) => {
            storyItems.push(
                <li
                key={storyItem.id}
                data-id={storyItem.id}
                data-time={storyItem.time}
                className={storyItem.seen ? 'seen' : ''}
                >
                <a
                    href={storyItem.src}
                    data-type={storyItem.type}
                    data-length={storyItem.length}
                    data-link={storyItem.link}
                    data-linktext={storyItem.linkText}
                >
                    <img src={storyItem.preview} />
                </a>
                </li>
            );
            });

            let arrayFunc = story.seen ? 'push' : 'unshift';
            timelineItems[arrayFunc](  
                <div
                    className={story.seen ? 'story seen' : 'story rounded-2xl'}
                    key={story.id}
                    data-id={story.id}
                    data-last-updated={story.lastUpdated}
                    data-photo={story.photo}
                >
                    <a className="" href={story.link}>
                        <span><img className="w-16 h-16 rounded-full border-4 absolute object-cover top-4 left-4 border-primaryColor" src={story.photo} /></span>
                        <span className="item-preview">
                            <img src={story.items[0].preview} />
                        </span>
                        <span
                            className="info"
                            itemProp="author"
                            itemScope=""
                            itemType="http://schema.org/Person"
                        >
                            <strong className="name" itemProp="name">
                                {story.name}
                            </strong>
                        </span>
                    </a> 
                    <ul className="items">{storyItems}</ul>
                </div>
            );
        });

        return (
            <div>  
                <div
                    ref={(node) => (this.storiesElement = node)}
                    id="stories-react"
                    className="storiesWrapper scroll-enable "
                >
                    {timelineItems}
                </div>
            </div>
        );
    }
}
export default CreateStories;