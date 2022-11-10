import React, { useRef, useState ,useEffect} from 'react';
import './App.css';
import initializeApp  from "firebase/compat/app";
import firebase from 'firebase/compat/app';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {collection,orderBy,limit, query,addDoc,getDocs,serverTimestamp} from 'firebase/firestore';
import 'firebase/compat/firestore'
import auth, { db } from './auth/firebase.init';

 
function App() {
  const [user, loading, error] = useAuthState(auth);
 
  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}




function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}
function ChatRoom() {
  
  let messages=[]
  const dummy = useRef();
  const [user] = useAuthState(auth);

  const messagesRef =collection(db,"messages")
  const queryRef =query(messagesRef,orderBy('createdAt'),limit(20));
  //  console.log(getDoc(queryRef),'getDoc')

  // let [messages] = useCollectionData(queryRef, { idField: 'id' });
 
  // console.log(messages,'userData');
  getDocs(messagesRef)
  .then(snap=>{
// let messages=[];
snap.docs.forEach((doc)=>{
 
  messages.push({...doc.data()})

  messages.map((msg)=> <ChatMessage key={msg.id} message={msg} />)

})
console.log(messages)

  })

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    // await messagesRef.add({
    //   text: formValue,
    //   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //   uid,
    //   photoURL
    // })
    if(!user || !formValue) return
     const payload={text:formValue,createAt:serverTimestamp(),uid,photoURL}
     await addDoc(messagesRef,payload)

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
      
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  console.log(text,'hello ami ')

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="me"/>
     <ul>
      <li> <p>{text}</p></li>
     </ul>
    </div>
  </>)
}

export default App;
