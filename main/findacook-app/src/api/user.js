import axios from 'axios';

// export const createCook = async (formData) => {
//     return axios.post('http://localhost:3001/api/cook', formData)
//         .then(response => {
//             console.log('Server Response: ', response)
//         })
//         .catch(error => {
//             console.error('Error: ', error);
//         });
// }


// export const getCategories = async (formData) => {
//     return axios.get('http://localhost:3001/api/category', formData)
//         .then(response => {
//             console.log('Server Response: ', response)
//         })
//         .catch(error => {
//             console.error('Error: ', error);
//         });
// }


export const getCurrentUser = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/user');
      console.log('Server Response: ', response.data);
      return response.data;
    } catch (error) {
      console.error('Error: ', error);
    }
  };
