<template>
  <div class="hello">

  </div>
</template>

<script>
import { getRepository } from "typeorm";
import { User } from "../entity/User.ts";

export default {
  name: "MyComponent",
  methods: {
    async fetchData() {
      const userRepository = getRepository(User);
      const users = await userRepository.find();
      console.log(users);
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
