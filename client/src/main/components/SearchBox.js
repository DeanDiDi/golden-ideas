import React, { Component, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '100%',
  },
});

const tableIcons = {
  ResetSearch: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <SearchIcon {...props} ref={ref} />),
};

class SearchBox extends Component {
  state = {
    tableData: [],
  };

  componentDidMount() {
    const { options } = this.props;
    const tableData = options.map(option => ({ name: option }));
    this.setState({ tableData });
  }

  render() {
    const { classes } = this.props;
    const { tableData } = this.state;

    return (
      <div className={classes.root}>
        <MaterialTable
          columns={[{ field: 'name' }]}
          data={tableData}
          icons={tableIcons}
          options={{
            showTitle: false,
            searchFieldAlignment: "left",
            selection: true,
            showTextRowsSelected: false,
            paging: false,
            maxBodyHeight: "300px",
            header: false
          }}
        />
      </div>
    );
  }
}

SearchBox.defaultProps = {
  options: ['default option'],
};

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
};

export default withStyles(styles)(SearchBox);
