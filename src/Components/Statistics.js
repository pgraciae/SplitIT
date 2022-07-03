import React from "react";
import { AgChartsReact } from "ag-charts-react";

class StatisticsView extends React.Component{
    constructor(props){
        super(props);
        this.state = {visited : [], spent : [], recommendations_restaurant : [], recommendations_type : []};
    }


    async StatisticsData(){
    await fetch('/statistics?email='+ this.props.Email, {
      method: 'GET',
    }).then(resp => {
      resp.json().then((resp)=>{
        this.setState({visited : resp.Visit})
        this.setState({spent : resp.Spent})
        this.setState({recommendations_restaurant: resp.Recommendations_restaurant})
        this.setState({recommendations_type: resp.Recommendations_type})
      })
    })
  }  
    
    
    
    componentDidMount(){
      this.StatisticsData();
    }

    render() {
      console.log(this.state)
      const options_visited = {
        data :  this.state.visited,
        title: {
          text: 'Restaurants Visited',
        },
        series: [
          {
            type: "pie",
            angleKey: "value",
            labelKey: "type"
          }
        ],
        legend: {
          enabled: false,
        }
      }

      const options_spent = {
        data :  this.state.spent,
        title: {
          text: 'Total Spent by type of restaurant',
        },
        series: [
          {
            type: "pie",
            angleKey: "value",
            labelKey: "type"
          }
        ],
        legend: {
          enabled: false,
        }
      }
      const recommendations_restaurant = this.state.recommendations_restaurant
      return (
        <div>
          <div  style={{position: "fixed", left: "15rem", top:"10rem"}}>
            <AgChartsReact options={options_visited} />
          </div>
          <div  style={{position: "fixed", left: "60rem", top:"10rem"}}>
            <AgChartsReact options={options_spent}  />
          </div>
          {/* <h1 style={{ textAlign: "center" }}>Restaurant Money Spent</h1>
          <br />
          <div>
            
          </div> */}
          <div  style={{position: "fixed", top:"30rem", left:"40rem"}}>
            <React.Fragment>
              <ul>
                <b>Restaurant Recommendations</b>
                {recommendations_restaurant.map(listitem => (
                  <li>
                    {listitem}
                  </li>
                ))}
              </ul>
            </React.Fragment>
          </div>
        </div>
      );
    }
    
}
export default StatisticsView;

