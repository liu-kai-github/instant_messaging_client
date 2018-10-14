import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import socket from 'src/ws';

import styles from './styles';

class PLATFORM extends React.Component<any, any> {


    constructor(props: any) {
        super(props);

        this.state = {
            value: 0,
            allUsers: [],
            maybeFriends: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.onAllUserItemButtonClick = this.onAllUserItemButtonClick.bind(this);
        this.onAllUsersItemClick = this.onAllUsersItemClick.bind(this);
    }

    componentDidMount() {
        console.log(socket);
        // socket && socket.emit('bind token', {
        //     sessionToken: window.sessionStorage.getItem('sessionToken') || '',
        // });
        setTimeout(() => {
            socket && socket.emit('bind token', {
                sessionToken: window.sessionStorage.getItem('sessionToken') || '',
            });
            socket.on('bind token', (data: any) => {
                console.log(data, 'bind token');
                socket && socket.emit('friend list', {});
            });

            socket.on('friend list', (data: any) => {
                console.log(data, 'friend list');
            });

            socket && socket.emit('all users', {});

            socket.on('maybe friends', (data: any) => {
                console.log(data, 'maybe friends');
                this.setState({
                    maybeFriends: data.friends,
                });
            });

            socket.on('all users', (data: any) => {
                console.log(data, 'all users');
                this.setState({
                    allUsers: data.allUsers,
                });
            });
        });
    }

    handleChange(event: any, value: any) {
        this.setState({value});
    };

    onAllUserItemButtonClick(targetUserID: string) {
        socket && socket.emit('add friend', {
            targetUserID,
        });
    }

    onAllUsersItemClick(targetUserID: string){
        this.props.history.push(`/chat/${targetUserID}`)
    }

    render() {

        const {classes} = this.props;
        const {value} = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        scrollable
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Online Users" icon={<PersonPinIcon/>}/>
                        <Tab label="Maybe friends" icon={<PersonPinIcon/>}/>
                        <Tab label="Contacts" icon={<PersonPinIcon/>}/>
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>
                    <List component="nav">
                        {
                            this.state.allUsers
                                .map(
                                    (item: any) => (
                                        <ListItem
                                            button
                                            key={item.user_id}
                                            onClick={() => this.onAllUsersItemClick(item.user_id)}
                                        >
                                            <ListItemText
                                                primary={item.user_id}
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => this.onAllUserItemButtonClick(item.user_id)}
                                            >发送请求</Button>
                                        </ListItem>
                                    )
                                )
                        }
                    </List>
                </TabContainer>}
                {value === 1 && <TabContainer>
                    <List component="nav">
                        {
                            this.state.maybeFriends
                                .map(
                                    (item: any) => (<ListItem key={item.userID}>
                                        <ListItemText primary={item.userID}/>
                                        <Button
                                            disabled={item.askedType === 'asked'}
                                            variant="contained"
                                            color="primary"
                                            onClick={() => this.onAllUserItemButtonClick(item.user_id)}
                                        >{item.askedType === 'asked' ? '已发送' : '同意'}</Button>
                                    </ListItem>)
                                )
                        }
                    </List>
                </TabContainer>}
                {value === 2 && <TabContainer>Item One</TabContainer>}
            </div>
        );
    }
}

function TabContainer(props: any) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

export default withStyles(styles)(PLATFORM);
