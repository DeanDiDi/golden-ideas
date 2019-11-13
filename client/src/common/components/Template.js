import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: { },
});

class Template extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        Template
      </div>
    );
  }
}

Template.defaultProps = { };

Template.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Template);
