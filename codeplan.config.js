// @flow

// type CodeplanConfig = {
//     types: Array<Type>,
//     boards: Array<Board>,
//     reducer: (state: any, action: Object):any => { }
// }

// // TYPES
// type TypeId = string

// type DataFieldType = 'string' | 'boolean' | 'text' | 'number'
// type DataField = {
//     type: DataFieldType,
//     name: string,
//     default: string,
//     validate: Function
// }
// type AttributeField = {
//     default: string,
//     name: string,
//     validate: ValidateFunction,
//     filter: FilterFunction,
//     transition
// }

// type Item = {
//     id: string,
//     type: TypeId,
//     [data: string]: string,
//     [attribute: string]: string,
// }

// type Type = {
//     id: TypeId,
//     name: string,
//     dataFields: { [id: string]: DataField },
//     attributeFields: { [id: string]: AttributeField },
//     items: Array<Item>
// }

// // BOARDS
// type Board = {
//     name: string,
//     url: string,
//     type: TypeId,
//     filter: FilterFunction,
//     column: {
//         type: TypeId,
//         filter: FilterFunction
//     },
//     swimlane: {
//         type: TypeId,
//         filter: FilterFunction
//     },
// }

// type FilterFunction = (item: Item, type: TypeId):boolean => { }
// type ValidateFunction = (item: Item, type: TypeId):boolean => { }
// type TransitionFunction = (item: Item, newValue:string):boolean => {}



var codeplanConfig = {
	board: [
		{
			name: "Tasks Kanban",
			url: "tasks",
			type: "task",
			filter: (i) => {return !i.release},
			column: {
				type: 'state',
			}

		},
		{
			name: "Release Planning",
			url: "releases",
			type: "task",
			filter: (i) => {return i.state == 'DONE'},
			column: {
				type: 'release',
			}

		}
	],
	type: [
		{
			"id": "state",
			"name": "State",
			"dataFields": {
				"name": {
					"type": "string"
				}
			},
			"attributeFields": {},
			items: [
				{"id": 'TODO', "name": "To do"},
				{"id": 'PRIORITY', "name": "prioritised"},
				{"id": "DEV","name": "in dev"},
				{"id": "DONE","name": "done"}
			]
		},
		{
			id: "release",
			name: "Release",
			"dataFields": {
				"name": {
					"type": "string"
				}
			},
			
		},
		{
			"id": "task",
			"name": "Task",
			"dataFields": {
				"name": {
					"type": "string"
				},
				"description": {
					"type": "text"
				},
				"storyPoints": {
					"type": "number"
				}
			},
			"attributeFields": {
				"state": {
					"multiple": false,
					"required": false,
					transition: (item, newValue) => {
						console.log('transition', item.getId(), 'from', item.state, 'to', newValue);
						
						// let from = item.state;
						// if(from)
						// console.log('from', item.state, newValue);
						// console.log('transition', item, newValue);
					}
				},
				"release": {
					"multiple": false,
					"required": false
				}
			},
		}
	]
}

module.exports = codeplanConfig