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
      projectName: this.props.projectName,
      teamSize: this.props.teamSize,
      startDate: new Date(this.props.startDate),
      endDate: new Date(this.props.endDate),
      projectCategory: this.props.projectCategory,
      projectTechnology: this.props.projectTechnology,
      projectEmail: this.props.projectEmail,
      projectGithub: this.props.projectGithub,
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
    const { classes, deleteProject, privileged } = this.props;
    const { projectName, teamSize, startDate, endDate, projectCategory,
      projectTechnology, projectEmail, projectGithub, description } = this.state;

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
                        {projectName}
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="body2" gutterBottom>
                        {projectCategory}
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="body2" gutterBottom>
                        {`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}
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
                    {teamSize}
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
                  {projectTechnology}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs container spacing={2}>
              <Grid item xs={10}>
                {
                  privileged ? (
                    <IconButton aria-label="delete" onClick={this.showDeleteModal}>
                      <DeleteIcon />
                    </IconButton>
                  ) : null
                }
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                {
                  projectEmail ? (
                    <IconButton aria-label="email" onClick={() => alert(`${projectEmail}`)}>
                      <EmailIcon />
                    </IconButton>
                  ) : null
                }
                {
                  projectGithub ? (
                    <IconButton aria-label="github" onClick={() => alert(`${projectGithub}`)}>
                      <GitHubIcon />
                    </IconButton>
                  ) : null
                }
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
  privileged: false,
  views: 0,
  projectName: 'default_project_name',
  teamSize: 1,
  startDate: '01/01/1970',
  endDate: '01/01/1970',
  projectCategory: [],
  projectTechnology: [],
  projectEmail: null,
  projectGithub: null,
  description: 'Tell people something about your project',
};

ProjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  privileged: PropTypes.bool.isRequired,
  projectName: PropTypes.string,
  teamSize: PropTypes.number,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  projectCategory: PropTypes.arrayOf(PropTypes.string),
  projectTechnology: PropTypes.arrayOf(PropTypes.string),
  projectEmail: PropTypes.string,
  projectGithub: PropTypes.string,
  views: PropTypes.number,
  description: PropTypes.string,
};

export default withStyles(styles)(ProjectCard);
