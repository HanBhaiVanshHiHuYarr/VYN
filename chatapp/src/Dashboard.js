import React from 'react';
import './App.css'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {context} from './Store'






const useStyles = makeStyles((theme) => ({
    root: {
      },
      paper: {
        margin:'50px',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
      },
      color:{
          color:"#828282",
          margin:'1rem',
          borderBottom:'1px solid rgba(189,189,189,0.4)',
          
          

      },
      flex:{
          display:'flex',
          alignItems:'center'
      },
      topicWindow:{
        width:'30%',
        height:'500px',
        // background:'rgba(114, 242, 125,0.3)',
        borderRight:'3px solid rgba(139, 196, 92,0.1)',
        


      },
      chatWindow:{
        width:'70%',
        height:'500px',
        padding:'20px'
        // background:'rgba(172, 242, 114,0.3)',

      },
      chatBox:{
        width:'85%',
        
      },
      button:{
        width:'15%',
        margin:'20px'
       
      },
      author:{
          display:'flex',
          fontSize:'10px'
      }

      
}));
  
function Dashboard(){
    const classes = useStyles();

    //store
    const {allChats , sendChatAction, user} = React.useContext(context);
    console.log({allChats});
    const topics = Object.keys(allChats)

    const [activeTopic, changeActiveTopic]= React.useState(topics[0])
    const [textValue, changeTextValue]=React.useState('');
    return(
        <div className={classes.root}>
          <Paper className={classes.paper}>
              <Typography variant="h4" component="h4">
                ChatApp
              </Typography>
              <Typography component="h5" className={classes.color}>
                  {activeTopic}
              </Typography>
            
            <div className={classes.flex}>
                <div className={classes.topicWindow}>
                    <List>
                        {
                            topics.map(topic=>(
                                <ListItem onClick={e=>changeActiveTopic(e.target.innerText)} key={topic} button>
                            <ListItemText primary={topic}></ListItemText>
                        </ListItem>
                            ))
                        }
                        
                    </List>
                </div>
                <div className={classes.chatWindow}>
                    {
                        allChats[activeTopic].map((chat,i)=>(
                           <div className={classes.flex} key={i}>
                               <Chip label={chat.msg} variant="outlined"></Chip>
                               <Typography className={classes.author} variant="h5" component="h5">{chat.from}</Typography>
                           </div>
                        ))
                    }
                </div>
            </div>

            <div className={classes.flex}>
                <TextField 
                label="Your Response" 
                 variant="outlined" 
                 className={classes.chatBox}
                 value={textValue}
                 onChange={e=>changeTextValue(e.target.value)}

                 />
                <Button className={classes.button} variant="contained" color="secondary" onClick={()=>{
                    sendChatAction({from:user,msg:textValue,topic:activeTopic})
                    changeTextValue('')
                }}>
                    Send
                </Button>
            </div>
        </Paper>
    </div>

    );
}

export default Dashboard