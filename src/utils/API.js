const axios = require('axios');

// const URL_PREFIX = 'http://localhost:3002';
const URL_PREFIX = 'https://api-kinetik.herokuapp.com';

const API = {

  login: function (userData) {
    return axios.post(`${URL_PREFIX}/login`, userData)
  },

  signup: async function (userData) {
    const newUser = await axios.post(`${URL_PREFIX}/signup`, userData);
    console.log(newUser);
    window.location.href = '/dashboard';
    return newUser;
  },

  getDashboard: function (token) {
    return axios.get(`${URL_PREFIX}/dashboard`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },

  getIncompleteGoals: function (token) {
    return axios.get(`${URL_PREFIX}/incomplete-goals`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },

  getCompleteGoals: function (token) {
    return axios.get(`${URL_PREFIX}/complete-goals`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },

  // working on this
  getUser: function (id) {
    return axios.get(`${URL_PREFIX}/api/users/${id}`)
  },

  getAllGoals: function () {
    return axios.get(`${URL_PREFIX}/api/goals`);
  },
  getAllGroups: function () {
    return axios.get(`${URL_PREFIX}/api/groups`)
  },
  getOneGoal: function (id) {
    return axios.get(`${URL_PREFIX}/api/goals/${id}`);
  },
  getOneGroup: function (id) {
    return axios.get(`${URL_PREFIX}/api/groups/${id}`);
  },
  deleteGoal: function (id, token) {
    return axios.delete(`${URL_PREFIX}/api/goals/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  },
  createGroup: function (newGroupData,token){
    return axios.post(`${URL_PREFIX}/api/groups`, newGroupData, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },

  createGoal: function (newGoalData, mytoken) {
    return axios.post(`${URL_PREFIX}/api/goals/`, newGoalData, {
      headers: {
        authorization: `Bearer ${mytoken}`
      }
    });
  },
  editGoal: function (id, editGoalData, mytoken) {
    return axios.put(`${URL_PREFIX}/api/goals/${id}`, editGoalData, {
      headers: {
        authorization: `Bearer ${mytoken}`
      }
    })
  }

}

export default API;
