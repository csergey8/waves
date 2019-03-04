import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import UserLayout from '../../../hoc/UserLayout';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/fontawesome-free-solid';
import { CircularProgress } from '@material-ui/core'; 

class AddFile extends Component {
  constructor() {
    super();
    this.state = {
      uploading: false,
      formSuccess: false,
      formError: false,
      files: []
    }
  }

  getFilesLists = () => {
    axios.get('/api/users/admin_files')
    .then(res => {
      this.setState({
        files: res.data
      })
      console.log(this.state.files)
    })
  }

  componentDidMount() {
    this.getFilesLists();
  }

  onDrop(files) {
    this.setState({
      uploading: true,
    })
    let formData = new FormData();
    const config = {
      header: {'content-type': 'multipart/form-data'}
    }
    formData.append("file", files[0]);

    axios.post('/api/users/uploadfile', formData, config)
      .then(res => {
        this.forceUpdate();
        if(res.data.success){
          this.getFilesLists();
          this.setState({
            uploading: false,
            formSuccess: true,
            formError: false
          }, () => {
            setTimeout(() => {
              this.setState({
                formSuccess:false
              })
            }, 2000)
          })
        }
      })
  }

  renderFilesList() {
    let template = null;
    template = this.state.files.map((file, i) => {
      return (<li key={i} className=""><Link to={`/api/users/download/${file}`} target="blank">{file}</Link></li>)
    })

    return template;
  }
  
  render() {
    return (
      <UserLayout>
        <h1>Upload File</h1>
        <div>
          <Dropzone
                onDrop={(e) => this.onDrop(e)}
                multiple={false}
                className="dropzone_box"
              >
                <div className="wrap">
                  <FontAwesomeIcon icon={faPlusCircle} />
                </div>
          </Dropzone>
          {
            this.state.uploading ?
            <div className="dropzone_box" style={{ textAlign: "center", paddingTop: "60px"}}>
              <CircularProgress
                style={{color: "#00bcd4"}}
                thickness={7}
              />              
            </div>

            : null
          }
          <div style={{clear: 'both'}}>
            {this.state.formSuccess ?  
              <div className="form_success">Success</div>
              : null}
            { this.state.formError ? 
            <div className="error_label">Please check you data</div>
              : '' 
          }
          </div>
          <hr />
          <div>
            <ul>
              {this.state.files ? this.renderFilesList() : null}
            </ul>
          </div>
        </div>
      </UserLayout>
    )
  }
}

export default AddFile;