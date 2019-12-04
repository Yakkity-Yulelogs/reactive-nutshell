import React from 'react';

export default function FriendsCard(props) {
	const { user, isFriend } = props;
	const { removeFriend, addFriend } = props;

	return (
		<div className="card">
			<div className="card-body">
				<h5 className="card-title">{user.fullName}</h5>
				{isFriend ? (
					<button className="btn btn-danger" onClick={() => removeFriend(user.deleteId)}>
						Remove
					</button>
				) : (
					<button className="btn btn-success" onClick={() => addFriend(user.id)}>
						Add Friend
					</button>
				)}
			</div>
		</div>
	);
}