import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteProjectModal from './DeleteProjectModal';

const styles = {
  card: {
    padding: '0 1em',
    margin: '1em 0',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  moreButton: {
    marginLeft: 'auto',
    paddingRight: '8px',
  }
};

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
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            title={this.state.name}
            subheader={this.state.date.toLocaleDateString()}
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                SZ
              </Avatar>
            }
            action={
              <Rating
                name="simple-controlled"
                value={2.5}
                precision={0.5}
                // onChange={(event, newValue) => {
                //   setValue(newValue);
                // }}
              />
            }
          />

          <CardContent>
            <Typography variant="body2" component="p">
              {this.state.description}
            </Typography>
          </CardContent>

          <CardActions disableSpacing>
            {/* <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton> */}
            {/* <IconButton aria-label="share">
              <ShareIcon />
            </IconButton> */}
            <IconButton aria-label="share" onClick={this.showDeleteModal}>
              <DeleteIcon />
            </IconButton>
            <Button className={classes.moreButton} size="small">
              Learn More
            </Button>
          </CardActions>
        </Card>
        <DeleteProjectModal
          projectId={this.state.id}
          show={this.state.showDeleteModal}
          onClose={this.hideDeleteModal}
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
