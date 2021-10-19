import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import ReactPlayer from "react-player";
import { VideoPlayer } from '@ionic-native/video-player';
import React,{ useState,useEffect, useRef } from 'react';
import screenfull from 'screenfull'
import { findDOMNode } from 'react-dom'
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import {firebaseConfig} from "../config/fire-config";

import * as firebase from 'firebase/app';


import {initializeFirestore,collection,doc,getDoc,onSnapshot} from 'firebase/firestore'

const Tab1: React.FC = () => {


  useEffect(()=> {
    if(window.navigator.onLine){
      
      initiaApp();

  //   const doc = firestore.Firestore.collection('live').doc("on");
  
   /*
   doc.onSnapshot(
    (docSnapshot:any) => {
  
          alert(docSnapshot.exists)
          alert(docSnapshot.data().link)
    }, (err:any) => {
      console.log(`Encountered error: ${err}`);
    },
  
    );*/
  }
  },[])


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
let  ref2 = useRef(null);
let  ref = useRef(null);

useEffect(()=>{
    console.log(ref2)
    console.log(ref2.current)
    // @ts-ignore: Object is possibly 'null'.

    if(ref2.current.props.url !== undefined){
      console.log("differente?")
      setState(true)
    }else{
      console.log("null?")

    }
  },[ref2.current])

  const [state,setState] = useState(false);

  useEffect(()=>{
    if(state)
          console.log(ref2.current)
        

  },[state])

    function chamaFullScreen(){
      
    screenfull.request(ref2.current.player.getInternalPlayer())
  }
 


  return (
    <IonPage>
      <IonButton  ref={ref}  onClick={chamaFullScreen}>FULL</IonButton>
        <ReactPlayer
          url={link}
          controls
          ref={ref2}
          playing
          muted
          fullscreen="true"
          width="100%"
          />
    </IonPage>
  );
};

export default Tab1;
