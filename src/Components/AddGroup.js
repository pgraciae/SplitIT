import React, {Component} from 'react';
import MultiSelectListBox from "react-multiselect-listbox";


class AddGroup extends Component{

    constructor(props){
        super(props);
        this.state = { friends: [], list: [], selectedTwo:[], saved: true, title: []};
        this.getOptions = this.getOptions.bind(this);
        this.saveGroup = this.saveGroup.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    

    async handleSubmit(event) {
        event.preventDefault();
        console.log("EMAIL", this.props.Email);
        this.setState({friends: 'true'})

        await fetch('/friends?email='+ this.props.Email, {
            method: 'GET',
          }).then(resp => {
            resp.json().then((resp)=>{
                console.log('friends lits:', resp);
                this.setState({list: resp.Friends})
                console.log('assignació a llista:', this.state.list);
                console.log('state friends: ', this.state.friends);

            })  
        })
    }

    handleChange(event){
        this.setState({title: event.target.value})
    }

    async saveGroup(event){
        event.preventDefault();
        if (this.state.saved){
            fetch('/addgroup',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: this.state.title,
                    listfriends: this.state.selectedTwo,
                    spend: 0,
                    email: this.props.Email,
                })
                }).then(resp => {
                    resp.json().then((resp)=>{
                        console.log(resp)
                    this.props.addedGroup();
                    })
                })
        }
    }
    getOptions(length){
        let options = [];
        for (let i = 0; i < length; i++){
            options.push({
                desc: this.state.list[i], value:this.state.list[i]
            })
        }
        return options
    }

    render(){
        if (this.state.friends === 'true'){
            console.log(this.state.list, 'ultim')
            return(
                <div className="container">
                    <fieldset className='from-group'>
                        <label>
                            Group's title:
                        </label>
                        <input
                            type='text'
                            value={this.title}
                            onChange={this.handleChange}
                        />
                    </fieldset>
                    <MultiSelectListBox
                        className={"multi-select"}
                        overrideStrings={{
                            search: "Search...",
                            selectAll: "Add All",
                            removeAll: "Remove All",
                            selectedInfo: "Items selected"
                        }}
                        sortable={true}
                        options={this.getOptions(this.state.list.length)}
                        textField="desc"
                        valueField="value"
                        value={this.state.selectedTwo}
                        rowHeight={25}
                        onSelect={({ item, sortedList }) => {
                            this.setState({selectedTwo: sortedList.map(i => i.value)});
                        }}
                        onRemove={({ item }) => {
                            this.setState({selectedTwo: [...this.state.selectedTwo.filter(i => i !== item.value)]})
                        }}
                        onSelectAll={selectedItems => {
                        const selected = [
                            ...this.state.selectedTwo,
                            ...selectedItems.map(item => item.value)
                        ];
                        this.setState({selectedTwo: selected});
                        }}
                        onRemoveAll={() => this.setState({selectedTwo: []})} 
                        onSort={({ sortedList }) =>
                        this.setState({selectedTwo: [...sortedList.map(i => i.value)]})
                        }
                    />
                    <button className='Home-button' onClick={this.saveGroup}>
                        Save Group
                    </button>
                </div>
            )}
        else{
            console.log(this.state.friends, 'comprovació')
            return(
                <div className='main'>
                    <div className='mainDiv'>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <h3>
                                Add Group!
                            </h3>
                            <button className='Home-button' type='submit'>
                                Show my friends
                            </button>
                        </form>
                    </div>

                </div>
            )
        }
    }
}

export default AddGroup;