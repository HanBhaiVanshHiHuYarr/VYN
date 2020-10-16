import React from 'react'

import io from 'socket.io-client'

 
export const context = React.createContext();
const iniState={
    General:[
        {from:"Dave",msg:'Hey There!'},
        {from:"Dave",msg:'Hey There!'},
        {from:"Dave",msg:'Hey There!'},
        {from:"Dave",msg:'Hey There!'},
    ],
    Topic2:[
        {from:"Dave",msg:'Hey There!'},
        {from:"Dave",msg:'Hey There!'},
        {from:"Dave",msg:'Hey There!'},
        {from:"Dave",msg:'Hey There!'},
    ]
}
function reducer(state , action){

const {from,msg,topic}=action.payload;

switch(action.type){
   case 'RECIEVE_MESSAGE':
       return{
            ...state,
            [topic]:[
                ...state[topic],
                {from, msg}
                ]
            }
       
    default :
        return state;
}
}


let socket;
function sendChatAction(value){
    socket.emit('chat message' ,value);
}

export default function Store(props){
    const [allChats,dispatch] = React.useReducer(reducer,iniState)
    if(!socket){
        socket=io(':3001')
        socket.on('chat message', function(msg){
            console.log(msg);
        dispatch({payload:msg,type:'RECIEVE_MESSAGE'})
    })
}

    const user='Nick'+Math.random(100).toFixed(2);

    
    return(

       < context.Provider value={{allChats,sendChatAction,user}} >
           {props.children}
       </context.Provider>
    )
}

