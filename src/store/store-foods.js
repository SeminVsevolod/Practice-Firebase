import Vue from 'vue';
import { uid, Notify } from 'quasar';
import { firebaseDb, firebaseAuth } from 'boot/firebase';
import { showErrorMessage } from 'src/functions/function-show-error-message';

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
  deleteFood({dispatch}, id) {
    dispatch('fbDeleteFood', id);
  },
  addFood({dispatch}, food) {
    let newId = uid();
    let payload = {
      id: newId,
      food: food
    };
    dispatch('fbAddFood', payload);
  },
  updateFood({dispatch}, payload) {
    dispatch('fbUpdateFood', payload);
  },

  fbReadData({ commit }) {
    const userFoods = firebaseDb.ref(`foods/${firebaseAuth.currentUser.uid}`);

    // initial check for data
    userFoods.once('value', () => {
      commit('setFoodsDownloaded', true);
    }, (error) => {
      showErrorMessage(error && error.message ? error.message : 'Foods cannot be shown');
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

  fbAddFood({}, payload) {
    const foodRef = firebaseDb.ref(`foods/${firebaseAuth.currentUser.uid}/${payload.id}`);
    foodRef.set(payload.food)
    .then(() => {
      Notify.create({ message: 'Food added' });
    })
    .catch((error) => {
      showErrorMessage(error && error.message ? error.message : 'Food cannot be added');
    });
  },

  // eslint-disable-next-line no-empty-pattern
  fbUpdateFood({}, payload) {
    const foodRef = firebaseDb.ref(`foods/${firebaseAuth.currentUser.uid}/${payload.id}`);
    foodRef.update(payload.updates)
    .then(() => {
      Notify.create({ message: 'Food updated' });
    })
    .catch((error) => {
      showErrorMessage(error && error.message ? error.message : 'Food cannot be updated');
    });
  },

  // eslint-disable-next-line no-empty-pattern
  fbDeleteFood({}, foodId) {
    const foodRef = firebaseDb.ref(`foods/${firebaseAuth.currentUser.uid}/${foodId}`);
    foodRef.remove()
    .then(() => {
      Notify.create({ message: 'Food deleted' });
    })
    .catch((error) => {
      showErrorMessage(error && error.message ? error.message : 'Food cannot be deleted');
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
