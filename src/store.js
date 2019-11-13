import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged: false,
    loggedUser: {},
    selectedItem: {},
    storedTrails: [],
    storedSpot: {},
    storedMaxDist: 0
  },

  mutations: {
    login: (state, payload) => {
      state.logged = true;
      state.loggedUser.displayName = payload.displayName;
      state.loggedUser.photoURL = payload.photoURL;
      state.loggedUser.uid = payload.uid;
    },
    logout: state => {
      state.logged = false;
      state.loggedUser = {};
    },
    selectItem: (state, payload) => {
      state.selectedItem = payload;
    },
    storeTrails: (state, payload) => {
      state.storedTrails = payload;
    },
    storeSpot: (state, payload) => {
      state.storedSpot = payload;
    },
    storeMaxDist: (state, payload) => {
      state.storedMaxDist = payload;
    },
    addTrailInfo: (state, payload) => {
      for (let key in payload) {
        state.selectedItem[key] = payload[key];
      }
    }
  },

  actions: {
    changeSelectedItem: (context, payload) => {
      context.commit("selectItem", payload);
    },

    storeTrailSearch: (context, payload) => {
      context.commit("storeTrails", payload);
    },

    storeMapSpot: (context, payload) => {
      context.commit("storeSpot", payload);
    },

    storeMaxDist: (context, payload) => {
      context.commit("storeMaxDist", payload);
    },

    addTrailInfo: context => {
      axios
        .get("https://www.hikingproject.com/data/get-trails-by-id", {
          params: {
            key: "200595378-7fe084d4861bcc0f6116d5babbf74a73",
            ids: context.state.selectedItem.id
          }
        })
        .then(response => {
          context.commit("addTrailInfo", response.data.trails[0]);
        })
        .catch(error => {
          alert("Error in retrieving data:" + error);
        });

    }
  }
})
