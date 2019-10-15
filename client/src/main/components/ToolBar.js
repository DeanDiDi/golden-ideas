import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import NewProjectModal from './NewProjectModal';

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
    this.state = {
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AddCircleOutlineIcon />}
          onClick={this.showModal}
        >
          Post Project
        </Button>
        <NewProjectModal
          show={this.state.show}
          onClose={this.hideModal}
        />
      </div>
    );
  }
}

ToolBar.defaultProps = { };

ToolBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToolBar);
