import * as React from 'react';
import * as io from 'socket.io-client';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';

import styles from './styles';

class PLATFORM extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            value: 0,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const socket = io('http://localhost:8000');
        console.log(socket, 'socket');
    }

    handleChange(event: any, value: any) {
        this.setState({value});
    };

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
                        <Tab label="Contacts" icon={<PersonPinIcon/>}/>
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>Item One</TabContainer>}
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
