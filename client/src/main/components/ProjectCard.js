import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';
import GitHubIcon from '@material-ui/icons/GitHub';
import DeleteProjectModal from './DeleteProjectModal';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  avatar: {},
});

class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: this.props.name,
      date: new Date(this.props.date),
      description: this.props.description,
      showDeleteModal: false,
    };
    this.showDeleteModal = this.showDeleteModal.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
  }

  showDeleteModal = () => {
    this.setState({ showDeleteModal: true });
  };

  hideDeleteModal = () => {
    this.setState({ showDeleteModal: false });
  };

  render() {
    const { classes, deleteProject } = this.props;
    const { name, date, description } = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs container spacing={2}>
              <Grid item xs={10} container spacing={2}>
                <Grid item xs={12} sm container spacing={2}>
                  <Grid item xs={2}>
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      SZ
                    </Avatar>
                  </Grid>
                  <Grid item xs={10} container direction="column">
                    <Grid item xs>
                      <Typography variant="body1" gutterBottom>
                        {name}
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="body2" gutterBottom>
                        General Category
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="body2" gutterBottom>
                        {date.toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm>
                  <Typography variant="body2" gutterBottom>
                    Progress Bar
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={2} container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography variant="body2" gutterBottom>
                    Team capacity
                  </Typography>
                </Grid>
                <Grid item xs>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs container>
              <Grid item xs={12} sm>
                <Typography variant="body2" gutterBottom>
                  {description}
                </Typography>
              </Grid>
              <Grid item xs={12} sm>
                <Typography variant="body2" gutterBottom>
                  Technology: These are required technologies!
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs container spacing={2}>
              <Grid item xs={10}>
                <IconButton aria-label="delete" onClick={this.showDeleteModal}>
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <IconButton aria-label="email">
                  <EmailIcon />
                </IconButton>
                <IconButton aria-label="github">
                  <GitHubIcon />
                </IconButton>
              </Grid>
              <Grid item xs={2}>
                <Button className={classes.moreButton} size="small">
                  More
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <DeleteProjectModal
          projectId={this.state.id}
          show={this.state.showDeleteModal}
          onClose={this.hideDeleteModal}
          deleteProject={deleteProject}
        />
      </div>
    );
  }
}

ProjectCard.defaultProps = {
  views: 0,
  date: '01/01/1970',
  name: 'default_project_name',
  description: 'Tell people something about your project',
};

ProjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  date: PropTypes.string,
  views: PropTypes.number,
  description: PropTypes.string,
};

export default withStyles(styles)(ProjectCard);
