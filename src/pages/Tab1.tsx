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
import { File,DirectoryEntry } from '@ionic-native/file';


import {initializeFirestore,collection,doc,getDoc,onSnapshot} from 'firebase/firestore'

const Tab1: React.FC =  () => {

  


  const getBase64FromUrl = async (url:any) => {
    console.log(url)

    const data = await fetch(url,{method:"get", headers:{"access-control-allow-origin" : "*"}});
    const blob = await data.blob();
    console.log(blob)
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob); 
      reader.onloadend = () => {
        const base64data = reader.result;
        
      // setImgSel(prev=>[...prev,base64data])
          setVideos((prev:any) =>[...prev,base64data])
           resolve(base64data);

          //Abrindo a transação com a object store "contato"
            var transaction = db.transaction('name', "readwrite");

            // Quando a transação é executada com sucesso
            transaction.oncomplete = function(event:any) {
                console.log('Transação finalizada com sucesso.');
            };

            // Quando ocorre algum erro na transação
            transaction.onerror = function(event:any) {
                console.log('Transação finalizada com erro. Erro: ' + event.target.error);
            };

            //Recuperando a object store para incluir os registros
            var store = transaction.objectStore('name');

                var request = store.add(base64data,url);

                //quando ocorrer um erro ao adicionar o registro
                request.onerror = function (event:any) {
                    console.log('Ocorreu um erro ao salvar o contato.');
                }

                //quando o registro for incluido com sucesso
                request.onsuccess = function (event:any) {
                    console.log('Contato salvo com sucesso.');
                }
            
      }
    });
  }




const [videos,setVideos] = useState([] as any);
const [src,setSrc] = useState([]);
const [db,setDb] = useState() as any;




useEffect(()=>{
    if(typeof window !== undefined){
      console.log("entrou aqui")
      console.log("indexou")
      var request = window.indexedDB.open("DBteste",2);
      request.onsuccess = async function (event:any) { 

            setDb(event.target.result);
            var transaction = event.target.result.transaction('name', "readwrite");
            
            
              //Recuperando a object store para incluir os registros
           var store = await transaction.objectStore('name').getAll();

              store.onsuccess = function(e:any){
                setVideos(store.result)
                setSrc(store.result[0]);
              }
               /*  let vidArray = []
              var todos = await transaction.objectStore('name').openCursor();
              todos.onsuccess = function(event){
                  let cursor = event.target.result;
                  if (cursor) {
                      vidArray.push({[cursor.primaryKey]:cursor.value});

                    cursor.continue();
                  }else{
                    setVideos(vidArray);
                    
                    setSrc(vidArray[0][Object.keys(vidArray[0])[0]]);
                  
                  }

               }*/
                
       }
       

      

       window.addEventListener('offline', () => {
  
          console.log('Became offline');
        
          var transaction = db.transaction('name', "readwrite");
        
        
          //Recuperando a object store para incluir os registros
          var store = transaction.objectStore('name').getAll();
          store.onsuccess = function(e:any){
            
            console.log(store.result)
          }
        
          
        });
    
        request.onerror = function (event) { 
            //erro ao criar/abrir o banco de dados
        }
        
        request.onupgradeneeded = function(event:any) {
              
                var  dbup = event.target.result;        
                var store3 = dbup.createObjectStore("name", { autoIncrement: true });

            }
    }
},[])


var upLoad = false;







useEffect(()=>{
  if(window.navigator.onLine){
    let arrayVideos = [] as any;
    const unsub =  onSnapshot(collection(fr, "listvideos"), (doc:any) => {
            doc.forEach((x:any) => {
              console.log(x.id)
              const url = "https://btgnews.com.br/videos/"+x.id+"?to=crop&r=256";
              arrayVideos.push(url);
          });
     });
     upLoad = true;
  console.log(db)
  if(db){
        console.log("db on!!!")
        var transaction = db.transaction('name', "readwrite");

        var todos = transaction.objectStore('name').openCursor();

        todos.onsuccess = function(event:any){
                
              
                let cursor = event.target.result;
                if (cursor) {
                    let key = cursor.primaryKey;
                    if(arrayVideos.includes(key)){
                      console.log('TEEEM')
                    }else{
                      console.log("NÃÃÃÃO!")
                      console.log(key)
                      var store = transaction.objectStore('name').delete(key);

                      store.onsuccess = function(event:any){
                          var v = transaction.objectStore('name').getAll();
                          v.onsuccess = function(e:any){
                            
                            setVideos(v.result)
                            setSrc(v.result[0]);
                          }
                      }

                    }
                    /*let value = cursor.value;
                    console.log(key, value);*/
                    cursor.continue();
                }
            }
              console.log(arrayVideos)
            arrayVideos.forEach((url:any)=>{
              console.log(url)
              var store = transaction.objectStore('name').get(url);

                store.onsuccess = async function(){
                          if(store.result == undefined){
                            const src = await getBase64FromUrl(url);
                          }else{
                            console.log("xxxx")
                          }
                }
                store.onerror = function(){
                          console.log("deu erro")
                }
            })

        }else{
          console.log("DB OFF, TÁ VENDO!")
        }

}

},[db])



const[index,setIndex] = useState(0);
const myCallback = () => {
  console.log('Video has ended')

  setIndex(index+1);

  if(index+1 >= videos.length){
    setIndex(0);
    setSrc(videos[0]);


  }else{
    setSrc(videos[index+1]);

  }
  //ref.current.parentElement.play()
}

const ref = useRef();




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
  const fire = firebase.initializeApp(firebaseConfig);
  const fr = initializeFirestore(fire,{});

  async function initiaApp(){

      const unsub = onSnapshot(doc(fr, "live", "on"), (doc) => {

          if(doc.exists()){

            setLink(doc.data().link)
        }

      });


  }


/* -- JEITO CORDOVA DE SALVAR ARQUIVOS 
getDir();
async function getDir(){

  var de = await File.resolveDirectoryUrl(File.externalDataDirectory);
    File.getDirectory(de, 'NewDirInRoot/', { create: true }).then( function (dirEntry) {
      dirEntry.getDirectory('images/', { create: true }, function (subDirEntry) {
        
        //createFile(subDirEntry, "fileInNewSubDir.txt");
        console.log(subDirEntry)
        subDirEntry.getFile("newPersistentFile.txt", { create: true, exclusive: false }, function (fileEntry:any) {

              console.log("fileEntry is file?" + fileEntry.isFile.toString());
              
                console.log(subDirEntry)
                console.log(fileEntry)
                writeFile(fileEntry,"sera q sobrepoe? escreve isso la");
                readFile(fileEntry)
      

          },errFunc)
  
        }, );
    }, );
}
function errFunc(event:any){
  console.log(event)
  console.log("deu algum erro")
}

function readFile(fileEntry:any) {
 // console.log(fileEntry)
  fileEntry.file(function (file:any) {
      var reader = new FileReader();
      console.log(file)
      reader.onloadend = function() {
          console.log("Successful file read: " + this.result);
      };

      reader.readAsText(file);

  });
}


function writeFile(fileEntry:any, dataObj:any) {
 // console.log("tamo aki")

      fileEntry.createWriter(function (fileWriter:any) {
       //   console.log(fileWriter)
          fileWriter.onwriteend = function (x:any) {
              console.log(x)
              
          };
          fileWriter.onerror = function (e:any) {
              console.log(e)
          };
          fileWriter.write(dataObj);
      });
  
}


 File.listDir(File.externalDataDirectory, '').then(
  (files) => {
   console.log("entramos aqui")
   console.log(File)
   console.log(files)
    
    
  }
).catch(
  (err) => {
    console.log(err)
  }
)

function onDeviceReady(){};

--FORMA CORDOVA DE SALVAR ARQUIVOS -- */

   
  return (
    <IonPage >
      <p>TESTE</p>
        
      
    </IonPage>
  );
};

export default Tab1;
