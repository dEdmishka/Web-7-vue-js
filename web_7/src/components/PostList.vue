<template>
  <div class="table_div">
    <table id="table">
      <thead v-if="posts.length > 0">
      <tr>
        <th>ID</th>
        <th>Email</th>
        <th>Password</th>
        <th>Name</th>
        <th>Surname</th>
        <th>Middle-name</th>
        <th>Birthday</th>
        <th>Gender</th>
        <th>Group</th>
        <th>Phone</th>
        <th>Select</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="post in posts">
        <td>{{ post.id }}</td>
        <td>{{ post.email }}</td>
        <td>{{ post.password }}</td>
        <td>{{ post.name }}</td>
        <td>{{ post.surname }}</td>
        <td>{{ post.middlename }}</td>
        <td>{{ post.date }}</td>
        <td>{{ post.gender}}</td>
        <td>{{ post.group }}</td>
        <td>{{ post.phone }}</td>
        <td><input type="checkbox" v-model="post.checked" :id="post.id"/></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true,
    }
  }
}
</script>