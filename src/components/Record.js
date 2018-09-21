import React from 'react';
import PropTypes from "prop-types";
import * as RecordsAPI from "../util/RecordsAPI";

export default class Record extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
        }
    }

    handleToggle() {
        this.setState({
            edit: !this.state.edit
        })
    }

    handleEdit(event) {
        event.preventDefault()
        const record = {
            date: this.refs.date.value,
            title: this.refs.title.value,
            amount: Number.parseInt(this.refs.amount.value)
        }
        RecordsAPI.update(this.props.record.id, record)
            .then((res) => {
                this.setState({
                    edit: false
                })
                this.props.handleEditRecord(this.props.record, res.data)
            })
            .catch((err) => console.log(err))
    }
    
    handleDelete(event) {
        event.preventDefault()
        RecordsAPI.remove(this.props.record.id)
            .then((res) => {
                this.props.handleDeleteRecord(this.props.record)
            })
            .catch((err) => console.log(err))
    }

    recordForm() {
        return (
            <tr key={this.props.record.id}>
                <td><input type="text" className="form-control" defaultValue={this.props.record.date} ref="date" /></td>
                <td><input type="text" className="form-control" defaultValue={this.props.record.title} ref="title" /></td>
                <td><input type="text" className="form-control" defaultValue={this.props.record.amount} ref="amount" /></td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.handleEdit.bind(this)}>Update</button>
                    <button className="btn btn-danger mr-1" onClick={this.handleToggle.bind(this)}>Cancel</button>
                </td>
            </tr>
        )
    }

    recordRow() {
        return (
            <tr key={this.props.record.id}>
                <td>{this.props.record.date}</td>
                <td>{this.props.record.title}</td>
                <td>{this.props.record.amount}</td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.handleToggle.bind(this)}>Edit</button>
                    <button className="btn btn-danger mr-1"onClick={this.handleDelete.bind(this)}>Delete</button>
                </td>
            </tr>
        )
    }

    render() {
        if (this.state.edit) {
            return this.recordForm();
        } else {
            return this.recordRow();
        }
    }
};

Record.propTypes = {
    id: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.number
}
