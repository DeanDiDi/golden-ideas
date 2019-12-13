import axios from 'axios';
import React, { Component, forwardRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const styles = {
  root: {
    // padding: '10px',
    maxWidth: '100%',
  },
};

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      tableColumns: [
        { title: 'project name', field: 'name' },
        { title: 'team size', field: 'size' },
        { title: 'email', field: 'email' },
        { title: 'start date', field: 'startDate', type: 'date' },
        { title: 'end date', field: 'endDate', type: 'date' },
        { title: 'category', field: 'category' },
        { title: 'technology', field: 'technology' }
      ],
    };
    this.onDeleteProject = this.onDeleteProject.bind(this);
  }

  componentDidMount() {
    axios.get('/api/projects')
    .then((response) => {
      this.setState({ tableData: response.data });
    });
  }

  onDeleteProject(event, rowData) {
    const { authToken } = this.props;
    // Headers with authorization token
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    // If token, add to headers
    if (authToken) {
      config.headers['x-auth-token'] = authToken;
    }
    axios.delete(`/api/admin/projects/${rowData._id}`, config)
    .then((response) => {
      const success = response.data.success;
      if (success) {
        console.log(`successfully deleted project '${rowData.name}'`);
        axios.get('/api/projects')
        .then((response) => {
          this.setState({ tableData: response.data });
        });
      } else {
        console.log(`failed to delete project '${rowData.name}'`);
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { tableData, tableColumns } = this.state;

    return (
      <div className={classes.root}>
        <MaterialTable
          title="Projects"
          columns={tableColumns}
          data={tableData}
          icons={tableIcons}
          actions={[
            {
              icon: DeleteOutline,
              tooltip: 'Delete Project',
              onClick: this.onDeleteProject,
            }
          ]}
          options={{
            pageSize: 20,
          }}
        />
      </div>
    );
  }
}

Project.propTypes = { };

export default withStyles(styles)(Project);
