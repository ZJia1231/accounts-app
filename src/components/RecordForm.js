import React from 'react';
import * as RecordsAPI from "../util/RecordsAPI";

export default class RecordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            title: '',
            amount: ''
        }
    }

    valid() {
        return this.state.date && this.state.title && this.state.amount
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = {
            date:this.state.date,
            title:this.state.title,
            amount:Number.parseInt(this.state.amount)
        }
        RecordsAPI.create(data)
            .then((res)=> {
                this.props.handleNewRecord(res.data)
                this.setState({
                    date:"",
                    title:"",
                    amount:""
                })
            })
            .catch((err)=> console.log(err))
    }
    
    render() {
        return (
            <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group mr-2">
                    <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Date" name="date" value={this.state.date} />
                </div>
                <div className="form-group mr-2">
                    <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Title" name="title" value={this.state.title} />
                </div>
                <div className="form-group mr-2">
                    <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Amount" name="amount" value={this.state.amount} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
            </form>
        );
    }
};
