import { Card, Spinner } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import socketIo from 'socket.io-client';

import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Player from './components/player/Player';

import requestService from './services/request';

function App() {
  const [list, setList] = useState([]);
  const [playedVideo, setPlayedVideo] = useState();
  const playedVideoRef = useRef(playedVideo);
  const socketRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    playedVideoRef.current = playedVideo;
  }, [playedVideo]);

  useEffect(() => {
    function getSavedList() {
      requestService
        .getList()
        .then((data) => {
          setList((state) => [...state, ...data]);

          if (data.length) {
            setPlayedVideo(data[0].videoId);
          }

          setIsLoading(false);
        });
    };

    function initSocketIo() {
      // TODO: SocketIo URL should be in process.env
      const socketIoUrl = "http://localhost:8080/";
      const newSocket = socketIo.connect(socketIoUrl);

      socketRef.current = newSocket;

      return () => newSocket.close();
    };

    getSavedList();
    initSocketIo();
  }, []);

  useEffect(() => {
    socketRef.current.on('new-item', (item) => {
      setList((state) => [...state, item]);

      if (!playedVideoRef.current) {
        setPlayedVideo(item.videoId);
      }
    });

    socketRef.current.on('delete-item', (deletedItem) => {
      const { id } = deletedItem;
      setList((state) => state.filter((item) => item.id !== id));
    });
  }, []);

  async function onAddClicked(value) {
    await requestService.insertItem(value);
  }

  async function onDeleteClicked(item) {
    const { id } = item;

    await requestService.deleteItem(id);
  }

  function onVideoEnd() {
    list.shift();
    setList([...list]);

    if (list.length) {
      setPlayedVideo(list[0].videoId);
    } else {
      setPlayedVideo(null);
    }
  }

  return (
    <div className='container'>
      {isLoading ?
        <Spinner animation='border' variant='primary' id='spinner' /> :
        <Card id='card'>
          <Sidebar list={list} onAddClickedEvent={onAddClicked} onDeleteClicked={onDeleteClicked} />
          <Player playedVideo={playedVideo} onEnd={onVideoEnd} />
        </Card>
      }

    </div>
  );
}

export default App;
