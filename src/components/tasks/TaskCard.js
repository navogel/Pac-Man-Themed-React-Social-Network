import React, { Component } from 'react';
import { Button, Checkbox } from 'antd';
import TaskManager from '../../modules/TasksManager';
import EditTaskForm from "./EditTaskForm"
class TaskCard extends Component {
    state = {
        myCard: ""
    }


    handleDelete = id => {
        TaskManager.delete(id).then(() => {
            this.props.getData();
        });
    };



    componentDidMount() {

        if (parseInt(sessionStorage.getItem("activeUser")) === this.props.task.userId) {
            this.setState({
                myCard: true
            })

        } else {
            this.setState({
                myCard: false
            }, () => console.log("my card state", this.state))
        }
    }


    render() {


        return (

            <>
                {this.state.myCard ? (
                    <div className="myCard">

                        <h3>
                            <span>{this.props.task.title}</span>
                        </h3>
                        <p>Due date: {this.props.task.dueDate}</p>
                        <p>completed: {this.props.task.completed}</p>
                        Have you completed it? <Checkbox />
                        <div className='cardButtonRow'>
                            <EditTaskForm {...this.props.task} getData={this.props.getData} />
                            <Button
                                className='addItemBtn'
                                type='primary'
                                shape='round'
                                icon='delete'
                                size='small'
                                onClick={() => this.handleDelete(this.props.task.id)}
                            >
                                Delete
				            </Button>
                        </div>
                    </div>
                ) : (

                        <div className="friendCard">

                            <h3>
                                <span>{this.props.task.title}</span>
                            </h3>
                            <p>date: {this.props.task.dueDate}</p>
                            <p>completed: {this.props.task.completed}</p>
                        </div>

                    )}
            </>
        );


    }
}

export default TaskCard;