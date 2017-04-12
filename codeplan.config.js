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



var codeplanConfig = {
    type: [
        {
            "id": "state",
            "name": "state",
            "dataFields": {
                "name": {
                    "type": "string"
                }
            },
            "attributeFields": {}
        },
        {
            "id": "task",
            "name": "task",
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
                    "required": false
                }
            },
        }
    ]
}

module.exports = codeplanConfig