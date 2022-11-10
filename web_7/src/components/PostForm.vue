<template>
  <div class="post">
    <form @submit.prevent>
      <input
          v-model="state.post.email"
          @:input="v$.post.email.$touch"
          type="email"
          class="input"
          placeholder="Enter email"
      />
      <span v-if="v$.post.email.$error" class="error">
        {{ v$.post.email.$errors[0].$message }}
      </span>
      <input
          v-model="state.post.password"
          @:input="v$.post.password.$touch"
          type="password"
          class="input"
          placeholder="Enter password"
      />
      <span v-if="v$.post.password.$error" class="error">
        {{ v$.post.password.$errors[0].$message }}
      </span>
      <input
          v-model="state.post.name"
          @:input="v$.post.name.$touch"
          type="text"
          class="input"
          placeholder="Enter name"
      />
      <span v-if="v$.post.name.$error" class="error">
        {{ v$.post.name.$errors[0].$message }}
      </span>
      <input
          v-model="state.post.surname"
          @:input="v$.post.surname.$touch"
          type="text"
          class="input"
          placeholder="Enter surname"
      />
      <span v-if="v$.post.surname.$error" class="error">
        {{ v$.post.surname.$errors[0].$message }}
      </span>
      <input
          v-model="state.post.middlename"
          @:input="v$.post.middlename.$touch"
          type="text"
          class="input"
          placeholder="Enter middlename"
      />
      <span v-if="v$.post.middlename.$error" class="error">
        {{ v$.post.middlename.$errors[0].$message }}
      </span>
      <input
          v-model="state.post.date"
          @:input="v$.post.date.$touch"
          class="input"
          type="date"
      />
      <span v-if="v$.post.date.$error" class="error">
        {{ v$.post.date.$errors[0].$message }}
      </span>
      <div class="form-gender">
        <label for="male">
          <input
              id="male"
              v-model="state.post.gender"
              type="radio"
              value="male"
          /><span>Male</span></label>
        <label for="female">
          <input
              id="female"
              v-model="state.post.gender"
              type="radio"
              value="female"
          /><span>Female</span></label>
      </div>
      <span v-if="v$.post.gender.$error" class="error">
        {{ v$.post.gender.$errors[0].$message }}
      </span>
      <v-select
          @:input="v$.post.group.$touch"
          :options="state.groups"
          v-model="state.post.group"
          class="v-select"
      >
      </v-select>
      <span v-if="v$.post.group.$error" class="error">
        {{ v$.post.group.$errors[0].$message }}
      </span>
      <input
          v-model="state.post.phone"
          @:input="v$.post.phone.$touch"
          type="text"
          class="input"
          v-mask="'38(0##)###-##-##'"
          placeholder="38(0__)___-__-__"
      />
      <span v-if="v$.post.phone.$error" class="error">
        {{ v$.post.phone.$errors[0].$message }}
      </span>
      <input
          type="button"
          value="create"
          class="btn"
          @click="createPost()"
      />
    </form>

  </div>
</template>

<script>

import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";
import vSelect from "vue-select";
import 'vue-select/dist/vue-select.css';
import {mask} from 'vue-the-mask';
import {reactive, computed} from "vue";
import {namePattern, passwordPattern, formatDate} from "../functions"

export default {
  components: {
    vSelect,
    useVuelidate,
  },
  directives: {
    mask,
  },
  setup() {
    const state = reactive({
      post: {
        email: '',
        password: '',
        name: '',
        surname: '',
        middlename: '',
        date: '',
        group: '',
        gender: null,
        phone: '',
        checked: false,
      },
      groups: [
        'IA-11',
        'IA-12',
        'IA-13',
        'IA-14',
      ],
    })
    const rules = computed(() => ({
      post: {
        email: {
          required: helpers.withMessage('Email is required', required),
          email: helpers.withMessage('Email is invalid', email),
        },
        password: {
          required: helpers.withMessage('Password is required', required),
          minLength: minLength(8),
          maxLength: maxLength(16),
          passwordPattern: helpers.withMessage('Password is invalid', passwordPattern)
        },
        name: {
          required: helpers.withMessage('Name is required', required),
          minLength: minLength(2),
          maxLength: maxLength(22),
          namePattern: helpers.withMessage('Name is invalid', namePattern)
        },
        surname: {
          required: helpers.withMessage('Surname is required', required),
          minLength: minLength(2),
          maxLength: maxLength(22),
          namePattern: helpers.withMessage('Surname is invalid', namePattern)
        },
        middlename: {
          required: helpers.withMessage('Middlename is required', required),
          minLength: minLength(2),
          maxLength: maxLength(22),
          namePattern: helpers.withMessage('Name is invalid', namePattern)
        },
        date: {
          required: helpers.withMessage('Date is required', required),
          maxValue: helpers.withMessage('Date cannot be in the future', val => val < formatDate(new Date())),
        },
        group: {
          required: helpers.withMessage('Group is required', required)
        },
        gender: {
          required: helpers.withMessage('Gender is required', required)
        },
        phone: {
          required: helpers.withMessage('Phone is required', required), minLength: minLength(16)
        },
      },
    }))

    const v$ = useVuelidate(rules, state)
    return {
      state,
      v$,
    }
  },
  methods: {
    createPost() {
      this.v$.$validate();
      if (!this.v$.$error) {
        alert('Form successfully submitted!')
        //here need to clear or destroy errors from form!!!
        //this.v$.$errors.$
        this.state.post.id = Date.now();
        this.$emit('create', this.state.post);
        this.state.post = {
          email: '',
          password: '',
          name: '',
          surname: '',
          middlename: '',
          date: '',
          gender: null,
          group: '',
          phone: '',
          checked: false,
        };
        this.v$.$reset();
      } else {
        alert("Form failed validation!")
      }
    },
  }
}
</script>