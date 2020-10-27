<template lang="html">
	<form v-on:submit="addSighting" id="sightings-form">
		<h2>Add a Sighting</h2>
		<div class="formWrap">
			<label for="species">Species:</label>
			<input type="text" id="species" v-model="species" />
		</div>
		<div class="formWrap">
			<label for="location">Location:</label>
			<input type="text" id="location" v-model="location" />
		</div>
		<div class="formWrap">
			<label for="date">Date:</label>
			<input type="date" id="date" v-model="date"/>
		</div>

		<input type="submit" value="Save" id="save"/>
	</form>
	
</template>

<script>
import { eventBus } from '@/main.js'
import SightingService from '@/services/SightingService.js'
export default {
	name: 'sightings-form',
	data() {
		return {
			species: "",
			location: "",
			date:""//considered null but dates stored as string.
		}
	},
	methods: {
		//add form method and onSubmit. Give sightingservice and post game eventBus.
		addSighting(event){
			event.preventDefault()//prevents refresh
			const sighting = {
				species: this.species,
				location: this.location,
				date: this.date
			}//import eventbus and sighting service above.
			SightingService.postSighting(sighting)
			.then(res => eventBus.$emit('sighting-added', res))//sighting-added is the on name for receiving eventbus.
		}
	}
}
</script>

<style lang="css" scoped>
h2 {
	margin: 10px 0;
	padding: 0;
}

form {
	width: 75%;
	margin: 0 auto;
	background: rgba(255, 255, 255, 0.7);
	padding: 20px;
	margin-bottom: 40px;
}

label {
	min-width: 100px;
	display: inline-block;
}

.formWrap {
	margin-bottom: 10px;
}
</style>