import Vue from 'vue';
import {uid} from 'quasar';
import { firebaseDb, firebaseAuth } from 'boot/firebase';

const state = {
  foods: {
    // 'id1': {
    // 	name: 'Burger',
    // 	description: 'A burger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.',
    // 	imageUrl: 'https://www.burgerking.com.tr/cmsfiles/products/whopper.png',
    // 	rating: 4
    // },
    // 'id2': {
    // 	name: 'Pizza',
    // 	description: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough.',
    // 	imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71Wl7x1MrsL.jpg',
    // 	rating: 5
    // },
    // 'id3': {
    // 	name: 'Sprouts',
    // 	description: 'The Brussels sprout is a member of the Gemmifera Group of cabbages, grown for its edible buds.',
    // 	imageUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/keto-brussel-sprouts-1573760364.jpg',
    // 	rating: 1
    // }
  },
  foodsDownloaded: false,
};

const mutations = {
  deleteFood(state, id) {
    Vue.delete(state.foods, id);
  },
  addFood(state, payload) {
    Vue.set(state.foods, payload.id, payload.food);
  },
  updateFood(state, payload) {
    Object.assign(state.foods[payload.id], payload.updates);
  },
  clearFoods(state) {
    state.foods = {};
  },
  setFoodsDownloaded(state, value) {
    state.foodsDownloaded = value;
  },
};

const actions = {
  deleteFood({commit}, id) {
    commit('deleteFood', id);
  },
  addFood({commit}, food) {
    let newId = uid();
    let payload = {
      id: newId,
      food: food
    };
    commit('addFood', payload);
  },
  updateFood({commit}, payload) {
    commit('updateFood', payload);
  },

  fbReadData({ commit }) {
    const userFoods = firebaseDb.ref(`foods/${firebaseAuth.currentUser.uid}`);

    // initial check for data
    userFoods.once('value', () => {
      commit('setFoodsDownloaded', true);
    }, (error) => {
      //showErrorMessage(error && error.message ? error.message : 'Error: foods cannot be shown');
      this.$router.replace('/auth');
    });

    // child added
    userFoods.on('child_added', (snapshot) => {
      const food = snapshot.val();
      const payload = {
        id: snapshot.key,
        food,
      };
      commit('addFood', payload);
    });

    // child changed
    userFoods.on('child_changed', (snapshot) => {
      const food = snapshot.val();
      const payload = {
        id: snapshot.key,
        updates: food,
      };
      commit('updateFood', payload);
    });

    // child deleted
    userFoods.on('child_removed', (snapshot) => {
      const foodId = snapshot.key;
      commit('deleteFood', foodId);
    });
  },
};

const getters = {
  foods: (state) => {
    return state.foods;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
