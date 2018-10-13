import * as React from 'react';

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Typography from '@material-ui/core/Typography';

function TabContainer(props: any) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

const styles = (theme: any) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class PLATFORM extends React.Component<any, any> {

    state = {
        value: 0,
    };

    handleChange = (event: any, value: any) => {
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

export default withStyles(styles)(PLATFORM);
