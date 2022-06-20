<template>
	<div>
		<div
			:style="`
				height: 100vh;
				justify-content: center;
				align-items: center;
				display: ${show ? 'flex': 'none'}
			`"
		>
			<lottie-animation
				ref="animation"
				style="height: 100px"
				loop
				:animationData="animationData"
			/>
		</div>
		<v-container :style="`display: ${!show ? 'block': 'none'}`">
			<h1 class='center'>Todos</h1>
			<v-form
				ref="form"
				v-model="valid"
				lazy-validation
			>
				<v-text-field
					color="grey"
					v-model="title"
					:counter="25"
					label="Title"
					variant="outlined"
					:rules="titleRules ?? []"
					required
				></v-text-field>

				<v-textarea
					variant="outlined"
					background-color="grey lighten-2"
					color="cyan"
					:rules="[
						(v: string) => !!v || 'Message/Description is required',
					]"
					v-model="message"
					required
					label="Message"
				></v-textarea>

				<v-btn
					:disabled="!valid"
					color="success"
					class="mr-4"
					@click="addTodo"
				>
					Save Todo
				</v-btn>
			</v-form>
			<br />
			<v-divider></v-divider>
			<v-table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Message</th>
						<th>Time of creation</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(todo, id) in todos"
						:key="id"
					>
						<td>{{ todo.title }}</td>
						<td class="msg">{{ todo.message }}</td>
						<td>{{ new Date(todo.createdAt) }}</td>
						<td>
							<v-btn
								color="primary"
								@click="editTodo(todo)"
								rounded
								style="margin: 5px"
							>
								Edit
							</v-btn>
							&nbsp;
							<v-btn
								color="error"
								style="margin: 5px"
								rounded
								@click="deleteTodo(todo)"
							>
								Delete
							</v-btn>
						</td>
					</tr>
				</tbody>
			</v-table>
		</v-container>
	</div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import type { VForm } from './../custom';
import animationData from '../loadingAnimation.json';
import { db } from './../../firebase';
import { collection, addDoc, doc, getDocs, deleteDoc, setDoc } from 'firebase/firestore';

export default defineComponent({
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Todos',

	data: () => ({
		valid: true,
		title: '',
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		todos: [] as any[],
		message: '',
		show: true,
		animationData,
		docId: '',
		createdAt: '',
		titleRules: [
			(v: string) => !!v || 'Title is required',
			(v: string) => v.length <= 25 || 'Title must be less than 25 characters',
		],
	}),

	async created() {
		await this.getTodos();
		this.animation().end();
	},

	methods: {
		/** Gets todos */
		async getTodos(): Promise<void> {
			this.animation().start();
			const data = await getDocs(collection(db, 'todos'));
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const todos: any[] = [];

			// eslint-disable-next-line no-shadow
			data.forEach((doc) => {
				todos.push({
					id: doc.id,
					...doc.data(),
				});
			});

			this.todos = todos.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
			this.animation().end();
		},

		/** Adds todo */
		async addTodo(): Promise<void> {
			this.form.validate();

			this.animation().start();
			if (!this.docId) {
				try {
					await addDoc(collection(db, 'todos'), {
						title: this.title,
						message: this.message,
						createdAt: `${new Date().toISOString()}`,
					});
					await this.getTodos();
					this.resetForm();
				}
				catch (e) {
					console.error(e);
				}
			}
			else {
				// update
				await setDoc(doc(db, 'todos', this.docId), {
					title: this.title,
					message: this.message,
					createdAt: this.createdAt,
				});
				this.docId = '';
				this.createdAt = '';
				await this.getTodos();
				this.resetForm();
			}
			this.animation().end();
		},

		/** Edit the todo (duh) */
		async editTodo(todo: { id: string; title: string; message: string; createdAt: string }): Promise<void> {
			this.title = todo.title;
			this.message = todo.message;
			this.valid = true;
			this.docId = todo.id;
			this.createdAt = todo.createdAt;
		},

		/** Delete the todo */
		async deleteTodo(todo: { id: string; title: string; message: string }): Promise<void> {
			this.animation().start();
			await deleteDoc(doc(db, 'todos', todo.id));
			await this.getTodos();
			this.animation().end();
		},

		/** Resets the inputs */
		resetForm() {
			this.form.reset();
		},

		/** Returns an object with 2 methods
		 * 	1. start() - shows the animation
		 * 	2. end() - hides the animation
		*/
		animation() {
			return {
				/** Hides the animation */
				end: () => {
					this.show = false;
				},
				/** Shows the animation */
				start: () => {
					this.show = true;
				},
			};
		},
	},

	computed: {
		form(): VForm {
			return this.$refs.form as VForm;
		},
	},
});
</script>
