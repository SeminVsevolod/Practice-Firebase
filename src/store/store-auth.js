import { LocalStorage, Loading } from 'quasar';
import { firebaseAuth } from 'boot/firebase';
import { showErrorMessage } from 'src/functions/function-show-error-message';

const $state = {
  loggedIn: false,
  userEmail: ''
};

const $mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value;
  },
  setUserEmail(state, value) {
    state.userEmail = value;
  },
};

const $actions = {
  registerUser({ commit }, payload) {
    Loading.show();
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        Loading.hide();
      })
      .catch((error) => {
        showErrorMessage(error.message);
      });
  },
  loginUser({ commit }, payload) {
    Loading.show();
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        Loading.hide();
      })
      .catch((error) => {
        showErrorMessage(error.message);
      });
  },
  logoutUser() {
    firebaseAuth.signOut();
  },
  handleAuthStateChange({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged((user) => {
      Loading.hide();
      if (user) {
        commit('setLoggedIn', true);
        if (user.email) {
          commit('setUserEmail', user.email);
        }
        LocalStorage.set('loggedIn', true);
        this.$router.push('/').catch(() => {});
        dispatch('foods/fbReadData', null, { root: true });
      } else {
        commit('foods/clearFoods', null, { root: true });
        commit('foods/setFoodsDownloaded', false, { root: true });
        commit('setLoggedIn', false);
        LocalStorage.set('loggedIn', false);
        this.$router.replace('/auth').catch(() => {});
      }
    });
  },
};

export default {
  namespaced: true,
  state: $state,
  mutations: $mutations,
  actions: $actions,
};
