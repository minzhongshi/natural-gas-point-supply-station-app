import {defineStore} from 'pinia'

export const userAccountStore = defineStore('user', {
	state: ()=>({
		information: {},
	}),
	unistorage: {
		paths: 'information'
	},
	
})

export const userToken = defineStore('token', {
	state: ()=>({
		token: '',
	}),
	unistorage: {
		paths: 'token'
	},
	
})