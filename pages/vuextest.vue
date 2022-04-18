<template>
  <div>
    <v-btn @click="$store.commit('increment')">+</v-btn>
    {{ $store.state.counter }}<br />
    <input @keyup.enter="addTodo" placeholder="todoを入力" />
   
   
    <ul>
      <li v-for="todo in todos" :key="todo.text">
        {{ todo.text }}
      </li>
      <li></li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    todos() {
      return this.$store.state.todos.list
    },
  },
  methods: {
    addTodo(e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
  },
}
</script>

<style>

</style>