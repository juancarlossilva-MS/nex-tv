import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import ReactPlayer from "react-player";
import React from "react"
import { VideoPlayer } from '@ionic-native/video-player';
import { useEffect, useRef } from 'react';
import screenfull from 'screenfull'
import { findDOMNode } from 'react-dom'
import { ScreenOrientation } from '@ionic-native/screen-orientation';


const Tab1: React.FC = () => {


 alert(ScreenOrientation.type) 

useEffect(()=>{

  ScreenOrientation.lock("landscape");
})

  alert(ScreenOrientation.type) 
  
useEffect(()=>{


  alert(ScreenOrientation.type) 
},[ScreenOrientation.type])



let full = false;
useEffect(()=>{
   /* const vp = VideoPlayer;
        vp.play('https://www.facebook.com/251460212193971/videos/570252257397877').then(() => {
          console.log('video finished');
        }).catch(error => {
          console.log(error);
        });*/
        if(full){
        if (screenfull.isEnabled) {
            console.log(ref2);
            if(ref2.current !== null && ref2 !== null){
                   // @ts-ignore: Object is possibly 'null'.
                 screenfull.request(ref2.current.player.getInternalPlayer())
                //ref2.current.getInternalPlayer().requestScreenFullscreen()
                // console.log(ref2.current.getInternalPlayer())
                // console.log(ref2.current.player)
            }
        }
      }else{
        full = true;
      }
  },[])

  let  ref2 = useRef(null);

  return (
    <IonPage>

        <ReactPlayer
          url={'https://www.facebook.com/jovempannews/videos/1042444236558530'}
          controls
          ref={ref2}
          fullscreen={true}
          resizeMode="cover"
          playing
          muted
          width="100%"
          height="100%"
        />
    
    </IonPage>
  );
};

export default Tab1;
