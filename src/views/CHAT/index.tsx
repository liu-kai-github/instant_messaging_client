import * as React from 'react';

import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import styles from './styles';
import socket from 'src/ws';

class CHAT extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            inputValue: '',
            chatHistory: [],
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onInputKeyUp = this.onInputKeyUp.bind(this);
    }

    componentDidMount() {
        socket && socket.on('chat content', (data: any) => {
            const tempArr = JSON.parse(JSON.stringify(this.state.chatHistory));
            // console.log(tempArr, 'tempArr');
            tempArr.push({
                user: data.targetUserID,
                content: data.content,
            });

            this.setState({
                chatHistory: tempArr,
            });
        });
    }

    onInputChange(even: any) {
        this.setState({
            inputValue: even.target.value,
        });
    }

    onInputKeyUp(even: any) {
        // console.log(even.keyCode, 'evet');
        if (even.keyCode === 13) {
            const tempArr = JSON.parse(JSON.stringify(this.state.chatHistory));
            // console.log(tempArr, 'tempArr');
            tempArr.push({
                user: '我',
                content: this.state.inputValue,
            });
            // console.log(this.props);
            //chat message
            socket && socket.emit('chat content', {
                targetUserID: this.props.match.params.targetUserID,
                content: this.state.inputValue,
            });
            // console.log(chatHistory, 'chatHistory');
            setTimeout(() => {
                this.setState({
                    inputValue: '',
                    chatHistory: tempArr,
                });
            });
        }
    }

    render() {
        const {classes} = this.props;

        return (<div>
            <List component="nav">
                {console.log(this.state.chatHistory, 'chatHistory')}
                {
                    this.state.chatHistory
                        .map(
                            (item: any) => (
                                <ListItem button divider>
                                    <ListItemText primary={item.user}/>
                                    {item.content}
                                </ListItem>
                            )
                        )
                }

            </List>

            <div style={{height: '60px'}}/>

            <TextField
                // id="filled-bare"
                className={classes.textField}
                // defaultValue="Bare"
                margin="normal"
                variant="filled"
                fullWidth
                value={this.state.inputValue}
                onChange={this.onInputChange}
                onKeyUp={this.onInputKeyUp}
            />
        </div>);
    }
}

export default withStyles(styles)(CHAT);
