import axios from 'axios';

// Make a request for a user with a given ID
const getUsers = () => {
	return axios.get('api/users')
		.then(function (response) {
			console.log("response", response);
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
		});
}

const newUser = () => {
	return axios.post('api/users/new', {
			firstName: 'Jane',
			lastName: 'Smith',
			email: 'jane@example.com',
			createdAt : new Date(),
			updatedAt : new Date(),
		})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
}

export {getUsers, newUser};
