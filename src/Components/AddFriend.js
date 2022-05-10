import React, {Component, useRef} from 'react';

class AddFriend extends Component{

    constructor(props){
        super(props);
        this.state = { friends: [], user_nickname: ''};
        console.log(this.state.friends);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({user_nickname: event.target.value})
    }

    async handleSubmit(event) {
        event.preventDefault();
        var name=this.state.user_nickname;
        console.log(name);
        console.log("EMAIL", this.props.Email);
        var friendsTemp = this.state.friends;

        await fetch('/friends?email='+ this.props.Email, {
            method: 'GET',
          }).then(resp => {
            resp.json().then((resp)=>{
                this.exists = resp.Friends.includes(name);
                console.log(this.exists);
                if (!this.exists){
                    fetch('/addfriend',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nickname: name,
                        your_nickname: this.props.Nickname,
                    })
                    }).then(resp => {
                    resp.json().then((resp)=>{
                        friendsTemp.push(resp.data)
                        console.log(resp)
                        this.setState({ friend: friendsTemp})
                        this.new_friend = null
                        this.exists = false;
                        
                    })
                })
            }
            })
        })
}


    render(){
        return(
            <div className='main'>
                <div className='mainDiv'>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <h3>
                            Add Friend!
                        </h3>
                            <fieldset className='from-group'>
                                <label>
                                    Friend's nickname:
                                </label>
                                <input
                                    type='text'
                                    value={this.state.user_nickname}
                                    onChange={this.handleChange}
                                />
                            </fieldset>
                            <button className='Home-button' type='submit'>
                                Save Friend
                            </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddFriend;