import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: null,
      newPassword: null,
      confirmedPassword: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { resetPassword } = this.props;
    const { password, newPassword, confirmedPassword } = this.state;
    if (newPassword !== confirmedPassword) {
      console.log('confirmed password does not match with new password');
      this.setState({ confirmedPassword: null });
    } else if (password === newPassword) {
      console.log('new password cannot be the same');
      this.setState({ newPassword: null, confirmedPassword: null });
    } else {
      resetPassword(password, newPassword)
      .then((hasReset) => {
        if (hasReset) {
          console.log('password has been reset');
        }
        this.setState({
          password: null,
          newPassword: null,
          confirmedPassword: null,
        });
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { password, newPassword, confirmedPassword } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="current-password"
                  label="Current Password"
                  type="password"
                  id="current-password"
                  autoComplete="current-password"
                  value={password || ''}
                  onChange={event => this.setState({ password: event.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="new-password"
                  label="New Password"
                  type="password"
                  id="new-password"
                  autoComplete="new-password"
                  value={newPassword || ''}
                  onChange={event => this.setState({ newPassword: event.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirm-new-password"
                  label="Confirm New Password"
                  type="password"
                  id="confirm-new-password"
                  autoComplete="new-password"
                  value={confirmedPassword || ''}
                  onChange={event => this.setState({ confirmedPassword: event.target.value })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Confirm
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

PasswordReset.defaultProps = {
  classes: PropTypes.isRequired,
  authToken: PropTypes.string.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

export default withStyles(styles)(PasswordReset);
