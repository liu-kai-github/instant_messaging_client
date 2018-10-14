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

class LOGIN extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            userNameValue: '',
            passwordValue: '',
            errorText: '',
        };

        this.onEmailValueChange = this.onEmailValueChange.bind(this);
        this.onPasswordValueChange = this.onPasswordValueChange.bind(this);
        this.onSignInButtonClick = this.onSignInButtonClick.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    onEmailValueChange(event: any) {
        this.setState({
            userNameValue: event.target.value,
        });
    }

    onPasswordValueChange(event: any) {
        this.setState({
            passwordValue: event.target.value,
        });
    }

    async onSignInButtonClick(event: any) {
        const {userNameValue, passwordValue} = this.state;
        const request = user_login([userNameValue, passwordValue]);
        const response = await request.promise;

        if (response.error) {
            this.setState({
                errorText: response.error.message,
            });
        } else {
            window.sessionStorage.setItem('sessionToken', response.result.sessionToken);
            this.props.history.replace(`${this.props.match.url}platform`);
        }

    }

    handleClose(event: any) {
        this.setState({
            anchorEl: null,
        });
    };


    render() {
        const {classes} = this.props;
        const {
            userNameValue,
            passwordValue,
            errorText,
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
                            用户登录
                        </Typography>
                        <form onSubmit={() => false} className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel
                                    // htmlFor="email"
                                >账号：</InputLabel>
                                <Input
                                    value={userNameValue}
                                    onChange={this.onEmailValueChange}
                                    autoFocus
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">密码：</InputLabel>
                                <Input
                                    value={passwordValue}
                                    onChange={this.onPasswordValueChange}
                                    type="password"
                                    autoComplete="current-password"
                                />
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="记住密码"
                            />
                            <Button
                                onClick={this.onSignInButtonClick}
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                登录
                            </Button>

                            {
                                errorText
                                    ? (<div style={{padding: '20px 10px 0'}}>
                                        <div style={{color: 'red'}}>* {errorText}</div>
                                    </div>)
                                    : null
                            }

                        </form>
                    </Paper>

                </main>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(LOGIN);
