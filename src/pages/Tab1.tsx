import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import ReactPlayer from "react-player";

import { VideoPlayer } from '@ionic-native/video-player';
import { useEffect } from 'react';


const Tab1: React.FC = () => {


  const openVideo = () =>{
    const vp = VideoPlayer;
        vp.play('https://www.facebook.com/251460212193971/videos/570252257397877').then(() => {
          console.log('video finished');
        }).catch(error => {
          console.log(error);
        });
  }
  


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={openVideo}>Open Video</IonButton>
        <ReactPlayer
          url={'https://www.facebook.com/reporterthalesbenicio/videos/1182944448880723/'}
          controls
          
          playing
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
