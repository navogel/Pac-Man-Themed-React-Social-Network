import React from 'react';
import { Button, Form, Icon, Input, Drawer } from 'antd';
import MessagesManager from '../../modules/MessagesManager';
import moment from 'moment';
class EditMessageForm extends React.Component {
	state = {
		visible: false,
		userId: '',
		date: '',
		message: '',
		editTimeStamp: '',
		loadingStatus: true
	};

	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	showDrawer = () => {
		this.setState({
			visible: true
		});
	};

	onClose = () => {
		this.setState({
			visible: false
		});
	};

	updateExistingMessage = evt => {
		//evt.preventDefault()
		this.setState({ loadingStatus: true });
		const editedMessage = {
			userId: this.state.userId,
			//put edited date
			date: this.state.date,
			message: this.state.message,
			editTimeStamp: moment(new Date()),
			id: this.props.id
		};

		MessagesManager.update(editedMessage).then(this.props.getData);
	};

	componentDidMount() {
		MessagesManager.get(this.props.id).then(message => {
			this.setState({
				userId: message.userId,
				date: message.date,
				message: message.message,
				loadingStatus: false
			});
		});
	}

	handleClick = evt => {
		evt.preventDefault();
		this.updateExistingMessage();
		this.onClose();
		this.setState({ loadingStatus: false });
	};

	render() {
		return (
			<div className='addBtnContainer'>
				<Button
					className='addItemBtn'
					type='primary'
					shape='round'
					icon='edit'
					size='small'
					onClick={this.showDrawer}
				>
					Edit
				</Button>

				<Drawer
					width='350'
					title='Edit Message'
					placement='right'
					closable={false}
					onClose={this.onClose}
					visible={this.state.visible}
				>
					<Form className='login-form'>
						<div className='formField'>
							{/* <Input type="date"
                        required onChange={this.handleFieldChange}
                        id="date" placeholder="Date"
                        value={this.state.date}
                        prefix={
                            <Icon type='calendar' style={{ color: 'rgba(0,0,0,.25)' }} />
                    }/> */}
						</div>
						<div className='formField'>
							<Input
								type='text'
								required
								onChange={this.handleFieldChange}
								id='message'
								placeholder='Message'
								value={this.state.message}
								prefix={
									<Icon type='pic-left' style={{ color: 'rgba(0,0,0,.25)' }} />
								}
							/>
						</div>

						<div className='formField'>
							<Button
								className='login-form-button'
								type='primary'
								disabled={this.state.loadingStatus}
								onClick={this.handleClick}
								icon='edit'
							>
								Edit
							</Button>
						</div>
					</Form>
					<img
						src='/images/chase.gif'
						alt='Smiley face'
						height='auto'
						width='350px'
						z-index='-2'
					/>
				</Drawer>
			</div>
		);
	}
}

export default EditMessageForm;
