import data from '../data.json';
import React from 'react';
import Movie from './Movies'
class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            active:""
        }
    }

    render(){
        let fullData = data.map((info,i) => ({Title:info.Title, Images:info.Images, Released:info.Released}))
        console.log(fullData)
        return(
            <>
            < Movie fullData = {fullData}/>
            </>
        )
    }
}


export default App;