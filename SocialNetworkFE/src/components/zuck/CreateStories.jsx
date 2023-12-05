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
            photo:'https://firebasestorage.googleapis.com/v0/b/socialnerwork-ac060.appspot.com/o/stories%2F361848543_1651168908703220_1686531172149351760_n.jpg?alt=media&token=2ffce93e-67e8-42fd-a5e1-61a5765ab941',
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
            id: 'gorillaz',
            photo:
              'https://firebasestorage.googleapis.com/v0/b/socialnerwork-ac060.appspot.com/o/stories%2F341505819_749530289956789_5917805846700148747_n.jpg?alt=media&token=eead41ba-5e4a-4690-a539-02433f0c1456',
            name: 'Nguyễn Ngọc Đính',
            time: timestamp(),
            items: [
              {
                id: 'gorillaz-1',
                type: 'photo',
                length: 3,
                src: 'https://firebasestorage.googleapis.com/v0/b/socialnerwork-ac060.appspot.com/o/stories%2F315393913_1303793333533035_823784327376878651_n.jpg?alt=media&token=dab91701-9c68-4d98-9c05-6f8452598c90',
                preview:
                  'https://firebasestorage.googleapis.com/v0/b/socialnerwork-ac060.appspot.com/o/stories%2F315393913_1303793333533035_823784327376878651_n.jpg?alt=media&token=dab91701-9c68-4d98-9c05-6f8452598c90',
                link: '',
                linkText: false,
                time: timestamp()
              }
            ]
          },
          {
            id: 'ladygaga',
            photo:'https://firebasestorage.googleapis.com/v0/b/socialnerwork-ac060.appspot.com/o/stories%2F396500808_3453858458186603_6186985699583249971_n.jpg?alt=media&token=cb2f4863-8d55-42bb-b9da-09ca6b019266',
            name: 'Kiều My',
            time: timestamp(),
            items: [
              {
                id: 'ladygaga-1',
                type: 'photo',
                length: 5,
                src: 'https://firebasestorage.googleapis.com/v0/b/socialnerwork-ac060.appspot.com/o/stories%2F61901520_2234092053496589_4430612769913438208_n.jpg?alt=media&token=fff5db91-df7c-4e07-8f94-913f1279ea5b',
                preview:
                  'https://firebasestorage.googleapis.com/v0/b/socialnerwork-ac060.appspot.com/o/stories%2F61901520_2234092053496589_4430612769913438208_n.jpg?alt=media&token=fff5db91-df7c-4e07-8f94-913f1279ea5b',
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
              'https://firebasestorage.googleapis.com/v0/b/socialnerwork-ac060.appspot.com/o/stories%2F324501733_3324902007765032_4557991241711936971_n.jpg?alt=media&token=f130deaf-6945-44d1-ac40-79da0b167642',
            name: 'Kim Yến',
            time: timestamp(),
            items: [
              {
                id: 'starboy-1',
                type: 'photo',
                length: 5,
                src: 'https://firebasestorage.googleapis.com/v0/b/socialnerwork-ac060.appspot.com/o/stories%2Fb9023e4593a43afa63b5.jpg?alt=media&token=383b6163-15d9-4bfc-872d-2f0e5a986ab6',
                preview:
                  'https://firebasestorage.googleapis.com/v0/b/socialnerwork-ac060.appspot.com/o/stories%2Fb9023e4593a43afa63b5.jpg?alt=media&token=383b6163-15d9-4bfc-872d-2f0e5a986ab6',
                link: '',
                linkText: false,
                time: timestamp()
              }
            ]
          },
          {
            id: 'riversquomo',
            photo:
              'https://firebasestorage.googleapis.com/v0/b/socialnerwork-ac060.appspot.com/o/stories%2F191059187_1248722125584343_3739672310372904470_n.jpg?alt=media&token=34ad9850-647b-45d9-a4ba-379735926dde',
            name: 'Quỳnh Linh',
            time: timestamp(),
            items: [
              {
                id: 'riverscuomo-1',
                type: 'photo',
                length: 10,
                src: 'https://firebasestorage.googleapis.com/v0/b/socialnerwork-ac060.appspot.com/o/stories%2F326732207_694496359014332_8815794986923226733_n.jpg?alt=media&token=028969b8-fd39-4163-b8ce-2ad37ddf7c9e',
                preview:
                  'https://firebasestorage.googleapis.com/v0/b/socialnerwork-ac060.appspot.com/o/stories%2F326732207_694496359014332_8815794986923226733_n.jpg?alt=media&token=028969b8-fd39-4163-b8ce-2ad37ddf7c9e',
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
                        <span><img className="w-16 h-16 rounded-full border-4 absolute top-4 left-4 border-primaryColor" src={story.photo} /></span>
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