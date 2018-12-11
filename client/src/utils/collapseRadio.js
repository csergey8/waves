import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/fontawesome-free-solid';
import { List, ListItem, ListItemSecondaryAction, ListItemText, Checkbox, Collapse, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

class CollapseRadio extends Component {
  state = {
    open: false,
    value: '0'
  }

  componentDidMount() {
    if(this.props.initState) {
      this.setState({
        open: this.props.initState
      })
    }
  }

  handleAngle = () => (
    this.state.open ? 
      <FontAwesomeIcon
        icon={faAngleUp}
        className="icon"
      />
      : 
      <FontAwesomeIcon
        icon={faAngleDown}
        className="icon"
      />
  )

  handleClick = (event) => {
    this.setState({
      open: !this.state.open
    })
  }

  handleChange = (event) => {
    this.props.handleFilters(event.target.value)
    this.setState({
      value: event.target.value
    })
  }

  renderList = () => (
    this.props.list ?

    this.props.list.map(value => (
      <FormControlLabel
        key={value._id}
        value={`${value._id}`}
        control={<Radio/>}
        label={value.name}
      />
    ))


    : null
  )

  

  render() {
    return (
      <div>
        <List
        style={{
          borderBottom: '1px solid #dbdbdbdb'
        }}
        >
          <ListItem onClick={this.handleClick} styles={{ padding: '10px 23px 10px 0' }}>
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            {this.handleAngle()}
          </ListItem>
          <Collapse
            in={this.state.open}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <RadioGroup
                aria-label="prices"
                name="prices"
                value={this.state.value}
                onChange={this.handleChange}
              >
                {this.renderList()}
              </RadioGroup>
            </List>
          </Collapse>
        </List>
      </div>
    )
  }
}

export default CollapseRadio;
