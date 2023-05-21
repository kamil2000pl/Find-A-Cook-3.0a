import axios from 'axios';

export const createCategory = async (formData) => {
    return axios.post('http://localhost:3001/api/category', formData)
        .then(response => {
            console.log('Server Response: ', response)
        })
        .catch(error => {
            console.error('Error: ', error);
        });
}


// export const getCategories = async (formData) => {
//     return axios.get('http://localhost:3001/api/category', formData)
//         .then(response => {
//             console.log('Server Response: ', response)
//         })
//         .catch(error => {
//             console.error('Error: ', error);
//         });
// }


export const getCategories = async () => {
    try {
      const response = await axios.get('https://findacook-web.onrender.com/api/category');
      console.log('Server Response: ', response.data);
      return response.data;
    } catch (error) {
      console.error('Error: ', error);
    }
  };
