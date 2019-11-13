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
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      selected: [],
    };
    this.onSelectionChange = this.onSelectionChange.bind(this);
  }

  componentDidMount() {
    const { options } = this.props;
    const tableData = options.map(option => ({ name: option }));
    this.setState({ tableData });
  }

  /**
   * This function is necessary because calling setState inside
   * onSelectionChange will cause material table to be re-rendered,
   * thus causing all previously check checkbox unchecked.
   *
   * We force the component only to refresh when tableData changes.
   */
  shouldComponentUpdate(_, nextState) {
    if (this.state.tableData === nextState.tableData) {
      return false;
    }
    return true;
  }

  onSelectionChange(rows) {
    const { filterType, updateFilter } = this.props;
    const selected = rows.map((row) => row.name);
    updateFilter(filterType, selected);
    this.setState({ selected });
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
          onSelectionChange={this.onSelectionChange}
        />
      </div>
    );
  }
}

SearchBox.defaultProps = {
  options: ['default option'],
  filterType: 'default filter type',
};

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  filterType: PropTypes.string.isRequired,
  updateFilter: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchBox);
