import FriendsManager from './FriendsManager';
const remoteURL = 'http://localhost:8088';

export default {
	getMessages(currentUserId) {
		// let currentUserId = parseInt(sessionStorage.getItem('activeUser'));
		let currentUserFriends = [];
		return FriendsManager.getFriends(currentUserId)
			.then(data => {
				data.forEach(obj => {
					currentUserFriends.push(obj.userId);
				});
			})
			.then(() => {
				console.log(currentUserFriends);
				let searchString = '';
				currentUserFriends.forEach(id => {
					searchString += `&userId=${id}`;
				});

				return fetch(
					`http://localhost:8088/messages/?&_sort=date&_order=desc&_expand=user`
				).then(response => response.json());
			});
	},
	delete(id) {
		return fetch(`${remoteURL}/messages/${id}`, {
			method: 'DELETE'
		}).then(result => result.json());
	},
	post(newMessage) {
		return fetch(`${remoteURL}/messages`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newMessage)
		}).then(data => data.json());
	},
	update(editedMessage) {
		return fetch(`${remoteURL}/messages/${editedMessage.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(editedMessage)
		}).then(data => data.json());
	},
	get(id) {
        return fetch(`${remoteURL}/messages/${id}`)
            .then(result => result.json())
    },
};