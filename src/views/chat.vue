<template>
  <div>
    <div>
      <v-btn @click="login">Login</v-btn>
      <v-btn @click="logout">Logout</v-btn>
      <v-btn @click="getMessages">Get Messages</v-btn>
    </div>
    <div>
      <v-text-field type="text" v-model="message" placeholder="write here" />
      <v-btn @click="sendMessage">Send</v-btn>
    </div>
    <div>
      <div v-for="(singleMessage, index) in allMessages" :key="index">
        <img :src="singleMessage.foto" style="width: 40px;" />
        {{singleMessage.name}}: {{singleMessage.text}}
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "chatlogin",

  data() {
    return {
      message: "",
      allMessages: []
    };
  },

  methods: {
    login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(user => {
          console.log(user);
          this.logged = true;
          this.getMessages();
        })
        .catch(err => alert(err));
    },

    logout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          console.log("you logged out");
        })
        .catch(function(error) {
          console.log("There was an error: " + error);
        });
    },

    getMessages() {
      firebase
        .database()
        .ref("chat")
        .on("value", data => {
          console.log(data);
          this.allMessages = data.val();
          console.log(data.val());
        });
    },

    sendMessage() {
      console.log(firebase.auth().currentUser.displayName);

      let obj = {
        text: this.message,
        name: firebase.auth().currentUser.displayName,
        foto: firebase.auth().currentUser.photoURL
      };
      firebase
        .database()
        .ref("chat")
        .push(obj);
    }
  }
};
</script>

<style>
</style>