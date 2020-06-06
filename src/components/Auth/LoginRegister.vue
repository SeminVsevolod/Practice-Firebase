<template>
	<form @submit.prevent="submitForm">
		<div class="row q-mb-md">
			<q-banner class="bg-grey-3 col">
			  <template v-slot:avatar>
			    <q-icon name="account_circle" color="primary" />
			  </template>
			  {{ tab | capitalize }} to access your Foods anywhere!
			</q-banner>
		</div>
		<div class="row q-mb-md">
			<q-input
				v-model="formData.email"
				label="Email address"
				ref="email"
				:rules="[ val => isValidEmailAddress(val) || 'Please enter a valid email address']"
				lazy-rules
				outlined
				stack-label
				class="col"
			/>
		</div>
		<div class="row q-mb-md">
			<q-input
				v-model="formData.password"
				label="Password"
				ref="password"
				:rules="[ val => val.length >= 6 || 'Please enter at least 6 characters']"
				lazy-rules
				outlined
				type="password"
				stack-label
				class="col"
			/>
		</div>
		<div class="row">
			<q-space />
			<q-btn
				color="primary"
				type="submit">
				{{ tab | capitalize }}
			</q-btn>
		</div>
	</form>
</template>

<script>
  import { mapActions } from 'vuex';
	export default {
    props: {
      tab: {
        type: String,
        default: 'login',
        validator(value) {
          return ['login', 'register'].includes(value);
        },
      },
    },
		data() {
			return {
				formData: {
					email: '',
					password: ''
				}
			}
		},
		methods: {
      ...mapActions('auth', [
        'registerUser',
        'loginUser',
      ]),

      /**
       * Is valid email
       * (source -> see link below, +include upper case until @)
       * @link https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression#answer-201378
       * @param field
       * @returns {boolean}
       */
      isValidEmailAddress(field) {
        if (field) {
          // eslint-disable-next-line no-control-regex
          return /^(?:[a-zA-Z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z](?:[a-z]*[a-z])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(`${field}`);
        }
        return true;
      },

			submitForm() {
				this.$refs.email.validate();
				this.$refs.password.validate();
				if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
					if (this.tab === 'login') {
						// login the user here
            this.loginUser(this.formData);
					}
					else {
						// register the user here
            this.registerUser(this.formData);
					}
				}
			}
		},
		filters: {
			capitalize(value) {
				return value.charAt(0).toUpperCase() + value.slice(1)
			}
		}
	}
</script>
