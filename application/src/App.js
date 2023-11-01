import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ChatPage from './components/ChatPage';
import socketIO from 'socket.io-client';

const SERVER_HOST = "localhost"
const SERVER_PORT = 4791; //porta da cambiare per il server
const APPLICATION_PORT = 4792; //porta da cambiare per l'applicazione

const socket = socketIO.connect(`http://${SERVER_HOST}:${SERVER_PORT}`);

function sendNotification(message, user) {
  console.log("notifications")
  const notification = new Notification("New message from Open Chat", {
    requireInteraction: true,
    icon: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
    body: `@${user}: ${message}`
  })
  notification.onclick = () => function () {
    window.open(`http://${SERVER_HOST}:${APPLICATION_PORT}/chat`)
  }
}

function App() {
  if (!("Notification" in window)) {
    alert("This browser does not support system notifications!")
  }
  else if (Notification.permission !== "denied") {
    Notification.requestPermission((permission) => {
      if (permission === "granted") {
        sendNotification("Notifiche abilitate con successo", "sistema")
      }
    })
  }

  setTimeout(() => {
    sendNotification("ciao", "simmaco")
  }, 10000);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
