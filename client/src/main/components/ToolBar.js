import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const styles = theme => ({
  root: {
    padding: theme.spacing(1, 2),
    marginTop: '1em',
  },
  button: {
    margin: theme.spacing(1),
  }
});

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    alert('You clicked a breadcrumb.');
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AddCircleOutlineIcon />}
        >
          Post Project
        </Button>
      </div>
    );
  }
}

ToolBar.defaultProps = { };

ToolBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToolBar);
