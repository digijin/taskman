import React from 'react'
export default class What extends React.Component{
    render() {
        return <div>
            <p>
            CodePlan is extremely flexible task management software. 
            it is a react redux application 
            Everything is an Item. 
            Item types are configured through a javascript object like webpack, grunt, karma etc
            </p>
            <p>
            The ui allows you to enter plain javascript that is eval'ed to filter results
            </p>
            <p>
            isnt that all a security risk?
            </p>
            <p>
            it is if you run it on a public server. 
            CodePlan is meant to be run on the user's computer for the user. 
            The only public interface to it is the state file checked into source control.
            </p>
        </div>
    }
}