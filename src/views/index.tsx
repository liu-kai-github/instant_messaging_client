import * as React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import withStyles from '@material-ui/core/styles/withStyles';

import {user_login} from 'src/http/user';

import styles from './styles';

class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            userNameValue: '',
            passwordValue: '',
        };

        this.onEmailValueChange = this.onEmailValueChange.bind(this);
        this.onPasswordValueChange = this.onPasswordValueChange.bind(this);
        this.onSignInButtonClick = this.onSignInButtonClick.bind(this);
    }

    componentDidMount() {
    }

    onEmailValueChange(event: any) {
        // console.log(event.target.value, 'event.target.value');
        this.setState({
            userNameValue: event.target.value,
        });
    }

    onPasswordValueChange(event: any) {
        // console.log(event.target.value, 'event.target.value');
        this.setState({
            passwordValue: event.target.value,
        });
    }

    async onSignInButtonClick() {
        const {userNameValue, passwordValue} = this.state;
        const request = user_login([userNameValue, passwordValue]);
        const response = await request.promise;
        console.log(response, 'response');
    }

    render() {
        const {classes} = this.props;
        const {
            userNameValue,
            passwordValue,
        } = this.state;
        return (
            <React.Fragment>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form onSubmit={() => false} className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel
                                    htmlFor="email"
                                >Email Address</InputLabel>
                                <Input
                                    value={userNameValue}
                                    onChange={this.onEmailValueChange}
                                    // id="email"
                                    // name="email"
                                    // autoComplete="email"
                                    autoFocus
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    value={passwordValue}
                                    onChange={this.onPasswordValueChange}
                                    // name="password"
                                    type="password"
                                    // id="password"
                                    autoComplete="current-password"
                                />
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                onClick={this.onSignInButtonClick}
                                // type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign in
                            </Button>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);