import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import ReactPlayer from "../react-player/facebook";
import { VideoPlayer } from '@ionic-native/video-player';
import React,{ useState,useEffect, useRef } from 'react';
import screenfull from 'screenfull'
import { findDOMNode } from 'react-dom'
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import {firebaseConfig} from "../config/fire-config";

import * as firebase from 'firebase/app';
import { NavigationBar } from '@ionic-native/navigation-bar';
import { AndroidFullScreen,AndroidSystemUiFlags } from '@ionic-native/android-full-screen';
import { File } from '@ionic-native/file';


import {initializeFirestore,collection,doc,getDoc,onSnapshot} from 'firebase/firestore'

const Tab1: React.FC = () => {

  

  useEffect(()=> {
    
    if(window.navigator.onLine){
      
      initiaApp();
    }
    AFS();
   
  },[])

  const AFS = async () => 
{
//Check if is immersive supported for instance
await AndroidFullScreen.isImmersiveModeSupported().then((r: any) => {
    }).catch((error)=>alert(error))
//Set display with AndroidSystemUiFlags
//in my case to full screen but there is a ton of options
//As the android documentation shows if u want a fullscreen app you should use three
//flags Immersive, Fullscreen, HideNavigation
await AndroidFullScreen.setSystemUiVisibility(AndroidSystemUiFlags.Fullscreen)
await AndroidFullScreen.setSystemUiVisibility(AndroidSystemUiFlags.Immersive)
await AndroidFullScreen.setSystemUiVisibility(AndroidSystemUiFlags.HideNavigation)
//example how to set a flag
}


  const [link,setLink] = useState();

  async function initiaApp(){
    const fire = firebase.initializeApp(firebaseConfig);
    const fr = initializeFirestore(fire,{});
  
    /*const citiesRef = collection(fr, "live");
    const docRef = doc(fr, "live", "on");

    const docSnap = await getDoc(docRef);
   */

      const unsub = onSnapshot(doc(fr, "live", "on"), (doc) => {

          if(doc.exists()){

            setLink(doc.data().link)
        }

      });


  }


/*
let full = false;
useEffect(()=>{
   /* const vp = VideoPlayer;
        vp.play('https://www.facebook.com/251460212193971/videos/570252257397877').then(() => {
          console.log('video finished');
        }).catch(error => {
          console.log(error);
        });
       
        if (screenfull.isEnabled) {
            console.log(ref2);
            console.log("requisitou full")
            if(ref2.current !== null){
                   
                //ref2.current.getInternalPlayer().requestScreenFullscreen()
                // console.log(ref2.current.getInternalPlayer())
                // console.log(ref2.current.player)
            }
        }
     
  })
*/




 File.listDir(File.applicationStorageDirectory, '').then(
  (files) => {
   alert("entrou e deu certo"+files)
    
    
  }
).catch(
  (err) => {
    alert("entrou e deu errado"+err.message)
  }
)

function onDeviceReady(){};



   
  return (
    <IonPage >
      <p>TESTE</p>
        
      
    </IonPage>
  );
};

export default Tab1;
