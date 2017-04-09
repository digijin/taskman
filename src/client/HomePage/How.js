import React from 'react'
export default class How extends React.Component{
    render() {
        return <div>
        <p>
            create a codeplan.config.js file
            it should export default object of the following signature:
        </p>
            <pre> 
                {`
                {
                    types:[
                        {
                            id: "UNIQUE_ID",
                            name: "human readable name"
                        }
                    ]
                }
                `}
            </pre>

        </div>
    }
}