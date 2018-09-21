import React from 'react';
import Record from './Record';
import RecordForm from './RecordForm';
import * as RecordsAPI from "../util/RecordsAPI";
import AmountBox from './AmountBox';

export default class Records extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            records: []
        }
    }

    componentDidMount() {
        RecordsAPI.getAll()
            .then((res) => {
                this.setState({
                    records: res.data,
                    isLoaded: true
                })
            })
            .catch((err) => {
                this.setState({
                    isLoaded: true,
                    error: err
                })
            })
    }

    addRecord(record) {
        this.setState({
            error: null,
            isLoaded: true,
            records: [
                ...this.state.records,
                record
            ]
        })
    }

    updateRecord(record, data) {
        const recordIndex = this.state.records.indexOf(record);
        const newRecords = this.state.records.map((item, index) => {
            if (index !== recordIndex) {
                // This isn't the item we care about - keep it as-is
                return item;
            }

            // Otherwise, this is the one we want - return an updated value
            return {
                ...item,
                ...data
            };
        });
        this.setState({
            records: newRecords
        });
    }

    deleteRecord(record) {
        const recordIndex = this.state.records.indexOf(record);
        const newRecords = this.state.records.filter((item, index) => index !== recordIndex);
        this.setState({
            records: newRecords
        });
    }

    credits() {
        let credits = this.state.records.filter((item) => {
            return item.amount > 0;
        })

        if (credits.length) {
            // let sum = 0;
            // credits.forEach((item)=> {
            //     sum += item.amount;
            // })
            // return sum;
            return credits.reduce((prev, curr) => { return prev + curr.amount }, 0)
        }
        else {
            return 0
        }
    }

    dbits() {
        let dbits = this.state.records.filter((item) => {
            return item.amount < 0;
        })

        if (dbits.length) {
            let sum = 0;
            dbits.forEach((item) => {
                sum += item.amount;
            })
            return sum;
        }
        else {
            return 0
        }
    }

    blance() {
        return this.credits() + this.dbits()
    }

    render() {
        const { error, isLoaded, records } = this.state;
        let recordsComponent;
        if (error) {
            recordsComponent = <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            recordsComponent = <div>Loading...</div>;
        } else {
            recordsComponent = (

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record) => <Record key={record.id} record={record} handleEditRecord={this.updateRecord.bind(this)} handleDeleteRecord={this.deleteRecord.bind(this)} />)}
                    </tbody>
                </table>
            );
        }

        return (
            <div>
                <h2>Records</h2>
                <div className="row mb-3">
                    <AmountBox text="Credits" type="success" amount={this.credits()} />
                    <AmountBox text="Debits" type="danger" amount={this.dbits()} />
                    <AmountBox text="Blance" type="info" amount={this.blance()} />
                </div>
                <RecordForm handleNewRecord={this.addRecord.bind(this)} />
                {recordsComponent}
            </div>
        )
    }
};
