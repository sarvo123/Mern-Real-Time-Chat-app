import React from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton';
import { useRef,useEffect } from 'react';
import useListenMessages from '../hooks/useListenMessages';

function Messages() {

    const {messages,loading} = useGetMessages();
    useListenMessages();
    console.log("messages" , messages)
    const lastMessageRef = useRef();

    useEffect(()=>{
        setTimeout(()=>{
            lastMessageRef.current?.scrollIntoView({behaviour: "smooth"});
        },100);
    },[messages]);
  return (
    <div className='px-4 flex-1 overflow-auto'>
    {!loading && messages.length > 0 && messages.map((message) =>(
        <div key={message._id} ref={lastMessageRef}>
            <Message  message={message}/>
        </div>
        
    ))}
    {loading && [...Array(3)].map((_,idx) => <MessageSkeleton key={idx}/>)}
    {!loading  && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
    )}
        {/* <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/> */}
    </div>
  )
}

export default Messages
