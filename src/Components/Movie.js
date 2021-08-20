import React from 'react'
import OnwMovie from './OneMovie'
export class Movie extends React.Component {
    render() {
        return (
            
<OnwMovie title={this.props.title} avgVote={this.props.avgVote} overview={this.props.overview}  date={this.props.date}   src={this.props.src}  vote={this.props.vote} />
         
        )
    }
}
export default Movie