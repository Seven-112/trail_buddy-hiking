import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged: false,
    selectedItem: {},
  },
  mutations: {
    login: state => {
      state.logged = true;
    },
    logout: state => {
      state.logged = false;
    },
    selectItem: (state, payload) => {
      state.selectedItem = payload;
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
          //console.log("It did not work!");
          alert("Error in retrieving data:" + error);
        });

    }
  }
})
